/* Couche Transactionnel */
/* Author : Eric Salle */

var mysql = require('mysql2');
const path = require('path');
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();

//Récupération des variables de la couche transactionnelle :

const global_transaction = require(global.TRANSACTION_DIR + '/global_transactions.js')();

//Rajouter des requêtes dans les fichiers dédiés :
//Objet ou simple query. Cependant, le nom et le message sont recommandés.

const db_to_install = require(path.resolve(global.TRANSACTION_DIR + '/install/install_db.js'));
const adm = require(path.resolve(global.TRANSACTION_DIR + '/install/install_adm.js'));
const tables_to_install = require(path.resolve(global.TRANSACTION_DIR + '/install/install_table.js'));
const basic_pages = require(path.resolve(global.TRANSACTION_DIR + '/install/install_routes.js'));
const basic_headers = require(path.resolve(global.TRANSACTION_DIR + '/install/install_headers.js'));
const basic_forms = require(path.resolve(global.TRANSACTION_DIR + '/install/install_forms.js'));

module.exports = function () {

	const _transactions = {

		init: (install = false, aws = false) => {

			let _sql_connect;
			if (install && aws) {

				

				_sql_connect = {

					host: global_transaction.AWS_DB_HOST,
					user: global_transaction.AWS_SA_DB_ROOT,
					password: global_transaction.AWS_SA_DB_PWD,
					port: global_transaction.DB_PORT,

				}

			} else if (install) {

				_sql_connect = {

					host: global_transaction.LOCAL_DB_HOST,
					user: global_transaction.LOCAL_SA_DB_ROOT,
					password: global_transaction.LOCAL_SA_DB_PWD,
					port: global_transaction.DB_PORT,
					

				}


			} else {

				_sql_connect = {


					host: (process.env.NODE_ENV != "development" && process.env.NODE_ENV != "production") ?  global_transaction.AWS_DB_HOST : global_transaction.LOCAL_DB_HOST,
					user: global_transaction.DB_USER,
					password: global_transaction.DB_PWD,
					port: global_transaction.DB_PORT,

				}


			}

			var connection = mysql.createConnection(_sql_connect);

			connection.connect();

			return connection;

		},

		db_get_infos: () => {

			return Object.assign({}, { DB_NAME: global_transaction.DB_NAME });

		},

		db_query: (connection, sql, args = null) => {
			let name;
			return new Promise((resolve, reject) => {
				if (typeof sql == "object") {

					sql.message = typeof sql.message != "undefined" ? sql.message : "";
					name = typeof sql.name != "undefined" ? "" + sql.name + " : " : "";
					console.log(sql.name + " : " + sql.message);
					sql = sql.query;

				}
				connection.query(sql, args, (err, rows) => {
					if (err)
						return reject(err);
					resolve(rows);
				});
				
			}).catch((error) => {

				console.error("db_query Error : " + name + " ! => " + error);

			});
		},

		db_execute: (connection, sql, args = null) => {
			let name;
			return new Promise((resolve, reject) => {
				if (sql != null) {

					name = typeof sql.name != "undefined" ? "" + sql.name + " : " : "";
					//console.log(sql.name + " : " + sql.message, " query : " + sql);

				}
				connection.execute(sql, args, (err, rows) => {
					if (err)
						return reject(err);
					resolve(rows);
				});
			}).catch((error) => {

				console.error("db_execute Error : " + name + " ! => " + error);

			});
		},

		db_ordered_queries: (connection, list, args = null) => {

			if (typeof list != "undefined") {

				return new Promise(async function (resolve, reject) {

					await list.map(async function (el) {

						var q = new Promise((resolve, reject) => {

							_transactions.db_query(connection, el).then(() => {

								resolve();

							})

						}).catch((error) => {

							console.error("db_ordered_queries Error ! => " + error);

						});

						await q;

					})

					resolve();

				}).catch(

					(error) => {

						console.error("db_ordered_queries Error ! => " + error);

					});


			} else {

				console.log("db_ordered_queries : list " + typeof list);

			}

		},

		db_switchUser: (connection, username = global_transaction.DB_USER, password = global_transaction.DB_PWD) => {

			return new Promise(function (resolve, reject) {

				connection.changeUser({ user: username, password: password }, function (err) {
					if (err) throw err;
				});

				console.log("Switched to user : " + username)

				resolve(connection);

			}).catch((error) => {

				console.error("db_switchUser Error ! => " + error);

			});



		},

		db_flush_privileges: (connection) => {

			return new Promise(function (resolve, reject) {

				_transactions.db_query(connection, "FLUSH PRIVILEGES").then(() => {

					return resolve();

				});

			}).catch((error) => {

				console.error("db_flush_privileges Error ! => " + error);

			});

		},

		db_use: (connection) => {

			return new Promise(function (resolve, reject) {

				_transactions.db_query(connection, "USE " + global_transaction.DB_NAME).then(() => {

					return resolve();

				});

			}).catch((error) => {

				console.error("db_use Error ! => " + error);

			});

		},

		db_install: (connection) => {


			return new Promise(function (resolve, reject) {

				var d = db_to_install;
				_transactions.db_ordered_queries(connection, [d.db, d.create_admin, d.grant_admin_privileges]).then(() => {

					return resolve();

				})


			}).catch((error) => {

				console.error("db_install Error ! => " + error);

			});


		},

		tables_install: (connection) => {

			return new Promise(function (resolve, reject) {

				var t = tables_to_install;

				var q_components = _transactions.db_ordered_queries(connection, [t.uri, t.callback, t.pages, t.pages_permissions, t.headers, t.headers_elements, t.forms, t.forms_elements]);
				var q_users = _transactions.db_ordered_queries(connection, [t.users, t.users_data, t.users_location, t.users_privileges]);

				Promise.all([q_components, q_users]).then(() => { return resolve() });

			}).catch((error) => {

				console.error("tables_install Error ! => " + error);

			});

		},

		queries_install: (connection) => {

			return new Promise(function (resolve, reject) {

				let q_a = adm;
				let p = basic_pages;
				let q_p = [];
				let q_h = [];
				let q_f = [];

				for (const functionalities in basic_pages) {

					for (const subfunctionalities in basic_pages[functionalities]) {

						q_p.push(basic_pages[functionalities][subfunctionalities]);
					}
				}

				for (const headers in basic_headers) {
					for (const header_parts in basic_headers[headers]) {
						q_h.push(basic_headers[headers][header_parts]);
					}
				}

				for (const forms in basic_forms) {
					for (const forms_parts in basic_forms[forms]) {
						q_f.push(basic_forms[forms][forms_parts]);
					}
				}

				var q_adm = _transactions.db_ordered_queries(connection,
					[q_a.create,
					q_a.give_privileges]);

				var q_pages = _transactions.db_ordered_queries(connection,
					q_p);

				var q_headers = _transactions.db_ordered_queries(connection,
					q_h);

				var q_forms = _transactions.db_ordered_queries(connection,
					q_f);

				Promise.all([q_adm, q_pages, q_headers, q_forms])
					.then(() => {

						return resolve();

					})

			}).catch((error) => {

				console.error("queries_install Error ! => " + error);

			});


		},

		db_quick_query: (q, args = null, object = null, oneResultOnly = true) => {

			let connection = _transactions.init();
			_transactions.db_use(connection);
			return new Promise((resolve, reject) => {
				_transactions.db_execute(connection, q, args).then((res) => {
					_transactions.end(connection);
					try {
						if (res.length == 0) {
							return resolve(res);
						}

						if (oneResultOnly) {
							return resolve(Object.assign({}, object, res[0]));
						}
						
						return resolve(res);
					} catch (error) {
						return reject(new Error("Error : " + error))
					}

				})

			}).catch((error) => {

				console.error("Error in db_quick_query (db_transaction@db_quick_query) => " + error);

			})


		},

		end: (connection) => {

			connection.end();

		}

	};

	return _transactions;

}
