import { resolve } from "path";

//Author - Eric Salle
const path = require("path");
const root_path = path.dirname(require.main.filename);
const db_transaction = require(path.resolve(root_path + "/db_transaction"))();
const Header = require("./header").Header;
const header_keyword = "header_";

export class HeaderFactory extends Object {

	constructor(args = null) {

		super();
		if (args != null) {

			if (args.loggedIn) {

				let topLevelRole;
				for (const prop in args.userRoles) {
					if (Boolean(args.userRoles[prop])) {
						topLevelRole = [prop.toLowerCase()];
					};
				}
				if (typeof topLevelRole == "undefined") {
					topLevelRole = "loggedout";
				}
				this.headerFactory = Object.assign({}, { header_name: [header_keyword + topLevelRole], topLevelRole: topLevelRole })
			} else {
				this.headerFactory = Object.assign({}, { header_name: [header_keyword + 'loggedout'], topLevelRole: "loggedout" })
			}

		}

	}

	getQueryPrefix(q_name, options = null) {

		let _query = {

			header: `JSON_OBJECT('name', headers.name, 'element', headers.element) as header, JSON_ARRAYAGG(JSON_OBJECT("name", helems.name, "id", helems.id, "header_element_id", helems.header_element_id, "header_element_name", helems.header_element_name, "elem", helems.element, "args", helems.args, "weight", helems.weight, "value", helems.value, 'uri', (SELECT uri FROM uri WHERE id = helems.uri_id))) as helems`,

		}

		return _query[q_name];

	}

	fetchHeader(datas = "*") {

		return new Promise((resolve) => {

			let q = `SELECT ${datas} FROM headers AS headers INNER JOIN headers_elements AS helems ON helems.header_id = headers.id WHERE headers.name = ?`;
			db_transaction.db_quick_query(q, this.headerFactory.header_name).then((res) => {

				let header = new Header();
				header.setHeaderData(res.header);
				header.setHeader();
				header.setHelemsData(res.helems);
				return resolve(header);

			})

		}).catch((error) => {

			console.error(`Error while fetching Header for role => ${this.headerFactory.topLevelRole} (HeaderFactory@fetchHeader) : ` + error)

		})

	}

	fetchHeaderById(datas = "*", id) {

		return new Promise((resolve) => {

			let q = `SELECT ${datas} FROM headers AS headers INNER JOIN headers_elements AS helems ON helems.header_id = headers.id WHERE headers.id = ?`;
			db_transaction.db_quick_query(q, [id]).then((res) => {

				let header = new Header();
				header.setHeaderData(res.header);
				header.setHeader();
				header.setHelemsData(res.helems);
				return resolve(header);

			})

		}).catch((error) => {

			console.error(`Error while fetching Header for role => ${this.headerFactory.topLevelRole} (HeaderFactory@fetchHeader) : ` + error)

		})

	}

	removeHeaderElements(list, header_id, id = null) {


		return new Promise((resolve, reject) => {

			if(list.length == 0){
				return resolve();
			}

			let newList = list.filter(subel => (subel.header_element_id == id));

			let q_list = [];

			if (newList.length > 0) {

				newList.map((el, index) => {

					q_list.push(this.removeHeaderElements(list, header_id, el.id));

				})

				Promise.all(q_list).then(
					() => {

						newList.map((el, index) => {

							db_transaction.db_quick_query(`DELETE from headers_elements where name = ?`, [el.header_element_name]).then(
								() => { return resolve() }
							);

						})

					}
				)


			} else {

				let name = list.find(el => (el.id == id)).name;
				db_transaction.db_quick_query(`DELETE from headers_elements where name = ?`, [name]).then(
					() => { return resolve() }
				);
			}

		})


	}

	createOrUpdateHeader(list, header_id, id = null, originalHeaderElsList = null) {

		let createHeaderTree = (list, header_id) => {

			return new Promise((resolve, reject) => {

				let newList = list.filter(el => (el.header_element_id == id));
				let q_insert = [];

				newList.map((el, index) => {

					let header_element_id;
					let header_element_name;
					let uri_id;
					let q_list = [];

					if (el.uri != null) {

						q_list.push(db_transaction.db_quick_query(`SELECT id from uri where uri.uri= ?`, [el.uri]));

						q_list.push(db_transaction.db_quick_query(`SELECT id, name FROM headers_elements where name = ?`, [el.header_element_name]));

						if(el.args ==""){
							el.args = null;
						}


					} else {

						q_list.push(db_transaction.db_quick_query(`SELECT id, name FROM headers_elements where name = ?`, [el.header_element_name]));

						if(el.args ==""){
							el.args = null;
						}

					}

					Promise.all(q_list).then((res) => {

						header_element_id = (typeof res[q_list.length-1] != "undefined" && res[q_list.length-1].length != 0 && typeof res[q_list.length-1].id != "undefined")  ? res[q_list.length-1].id : null;
						header_element_name = (typeof res[q_list.length-1] != "undefined" && res[q_list.length-1].length != 0 && typeof res[q_list.length-1].name != "undefined")  ? res[q_list.length-1].name : null;
						uri_id = (typeof res[0] != "undefined" && res[0].length != 0 && typeof res[0].id !="undefined" && typeof res[1] != "undefined") ? res[0].id : null;

						q_insert.push(db_transaction.db_quick_query(`INSERT INTO headers_elements (name, element, args, value, weight, header_id, header_element_id, header_element_name, uri_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
							[el.name, el.elem, el.args, el.value, newList.findIndex(subel=>(subel.name == el.name)), header_id, header_element_id, header_element_name, uri_id])
							.then(() => {

								this.createOrUpdateHeader(list, header_id, el.id);})

								);

						})

					})

					Promise.all(q_insert).then(()=>{
						return resolve();
					})


				})

		}

		return new Promise((resolve, reject) => {

			if (originalHeaderElsList != null) {

				this.removeHeaderElements(originalHeaderElsList, header_id).then(() => {

					createHeaderTree(list, header_id).then(
						() => {
							return resolve();
						}
					);


				})

			} else {

				createHeaderTree(list, header_id).then(
					() => {
						return resolve();
					}
				);

			}

		})

	}

	fetchAllHeadersContainer(value) {

		return new Promise((resolve, reject) => {

			let q;
			if (value.length == 0) {
				q = "SELECT id, name, lastModifiedAt FROM headers";
				db_transaction.db_quick_query(q, null, null, false).then(res => {
					resolve(res);
				})
			} else {
				q = "SELECT id, name, lastModifiedAt FROM headers WHERE name LIKE ?";
				db_transaction.db_quick_query(q, [`%header_${value}%`], null, false).then(res => {
					resolve(res);
				})
			}


		}).catch((error) => {

			console.error(`Error while fetching Headers Container : (HeaderFactory@fetchAllHeaderContainer) : ` + error)

		})

	}

}