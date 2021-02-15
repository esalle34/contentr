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

			header: `JSON_OBJECT('name', headers.name, 'element', headers.element) as header, JSON_ARRAYAGG(JSON_OBJECT("name", helems.name, "id", helems.id, "header_element_id", helems.header_element_id, "elem", helems.element, "args", helems.args, "value", helems.value, 'uri', (SELECT uri FROM uri WHERE id = helems.uri_id))) as helems`,

		}

		return _query[q_name];

	}

	fetchHeader(datas = "*") {

		return new Promise((resolve) => {

			let q = `SELECT ${datas} FROM headers AS headers INNER JOIN headers_elements AS helems ON helems.header_id = headers.id WHERE headers.name = ? ORDER BY helems.weight`;
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

			let q = `SELECT ${datas} FROM headers AS headers INNER JOIN headers_elements AS helems ON helems.header_id = headers.id WHERE headers.id = ? ORDER BY helems.weight`;
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

	fetchAllHeadersContainer(value) {

		return new Promise((resolve, reject) => {

			let q;
			if(value.length == 0){
				q = "SELECT id, name, lastModifiedAt FROM headers";
				db_transaction.db_quick_query(q, null, null, false).then(res=>{
					resolve(res);
				})
			}else{
				q = "SELECT id, name, lastModifiedAt FROM headers WHERE name LIKE ?";
				db_transaction.db_quick_query(q, [`%header_${value}%`], null, false).then(res=>{
					resolve(res);
				})
			}


		}).catch((error) => {

			console.error(`Error while fetching Headers Container : (HeaderFactory@fetchAllHeaderContainer) : ` + error)

		})

	}

}