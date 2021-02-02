//Author - Eric Salle
const path = require("path");
const root_path = path.dirname(require.main.filename);
const db_transaction = require(path.resolve(root_path + "/db_transaction"))();
const User = require("./user").User;
var sha512 = require('js-sha512').sha512;

export class UserFactory {

	constructor(args = null) {

		if (args != null) {

			if (typeof args.password != "undefined") {
				args.email = typeof args.email != "undefined" ? args.email : null;
				this.userFactory = Object.assign({}, { username: args.username, password: this.encryptPassword(args.password), email: args.email });
			} else {
				this.userFactory = Object.assign({}, { id: args.id, username: args.username });
			}

		}

		this.getQueryPrefix = this.getQueryPrefix.bind(this);

	}

	getQueryPrefix(q_name, options = null) {

		let queries = {

			createUser: "JSON_OBJECT('id' , users.id, 'username', users.username) as user",
			roles: `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='${db_transaction.db_get_infos().DB_NAME}' AND TABLE_NAME='users_privileges' AND COLUMN_NAME NOT LIKE "%id"`,
			login: `JSON_OBJECT('id' , users.id, 'username', users.username) as user, ${options}`,

		}

		return queries[q_name];

	}

	encryptPassword(password) {

		return sha512(password);

	}

	fetchRolesColumns(ext = null) {

		return new Promise((resolve) => {

			db_transaction.db_quick_query(this.getQueryPrefix("roles"), null, null, false).then((res) => {

				if (ext == null) {

					let role_q_part = "JSON_OBJECT(";

					res.map((role) => {

						role_q_part += "'" + role.COLUMN_NAME[0].toUpperCase() + role.COLUMN_NAME.substring(1) + "', privileges." + role.COLUMN_NAME + ",";

					})


					role_q_part = role_q_part.slice(0, -1);
					role_q_part += ") as privileges";

					return resolve(role_q_part);

				}else if(ext == "all"){

					let roles = [];
					res.map((role)=>{
						role = Object.values(role);
						roles.push(role);
					})
					roles = roles.flat();
					return resolve(roles);

				}

			});

		}).catch((err) => {

			console.error("Error while fetching ROLE COLUMNS (UserFactory@fetchRolesColumns : " + err);

		})

	}

	fetchUser(datas = "*", isAuthenticated = true, withPrivileges = true) {

		let username_email = this.userFactory.username.includes("@") ? "email" : "username";
		let q;

		if (!withPrivileges) {

			q = `SELECT ${datas} from users as users WHERE users.${username_email} = ? AND users.pwd = ?`;

		} else {

			q = `SELECT ${datas} from users as users INNER JOIN users_privileges as privileges on privileges.user_id = users.id WHERE users.${username_email} = ? AND users.pwd = ?`;
		}

		return new Promise((res) => {

			db_transaction.db_quick_query(q, [this.userFactory.username, this.userFactory.password]).then((resolve) => {

				if (Object.keys(resolve).length !== 0) {

					let newResolve = Object.assign({}, resolve.user, { isAuthenticated: isAuthenticated });
					let user = new User();
					user.setId(newResolve.id);
					user.setUsername(newResolve.username);
					user.setIsAuthenticated(newResolve.isAuthenticated);
					if (typeof resolve.privileges != "undefined") {
						user.setUserPrivileges(resolve.privileges);
					}
					res(user);

				} else {

					res({ user: { id: undefined } })

				}


			}).catch((err) => {

				console.error("Error fetching user : " + this.userFactory.username + " : " + err);

			})

		});
	}

	fetchUserDatas(datas = "*", user_id) {

		let q = `SELECT ${datas} from users_data WHERE user_id = '${user_id}'`;

		return db_transaction.db_quick_query(q);

	}

	checkUserInfo(infoToCheck) {

		let infoValue = this.userFactory[infoToCheck];

		let q = `SELECT * from users WHERE ${infoToCheck} = '${infoValue}'`;

		return db_transaction.db_quick_query(q);


	}

	createUser() {

		let q = `INSERT INTO users (username, pwd, email) VALUES (?, ?, ?)`;

		return db_transaction.db_quick_query(q, [this.userFactory.username, this.userFactory.password, this.userFactory.email]);

	}

	createUserPrivileges(user_id) {

		let q = `INSERT INTO users_privileges (user_id) VALUES (?)`;

		return db_transaction.db_quick_query(q, [user_id]);


	}

	createUserDatas(civility, lastname, firstname, phonenumber, user_id) {

		let q = `INSERT INTO users_data (civility, lastname, firstname, phonenumber, user_id) VALUES(?, ?, ?, ?, ?)`;

		return db_transaction.db_quick_query(q, [civility, lastname, firstname, phonenumber, user_id]);

	}

	createUserLocation(code, country, postalcode, city, address, user_id) {

		let q = `INSERT INTO users_location (code, country, postalcode, city, address, user_id) VALUES(?, ?, ?, ?, ?, ?)`;

		return db_transaction.db_quick_query(q, [code, country, postalcode, city, address, user_id]);

	}


}