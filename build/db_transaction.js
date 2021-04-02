"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* Couche Transactionnel */

/* Author : Eric Salle */
var mysql = require('mysql2');

var path = require('path');

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))(); //Récupération des variables de la couche transactionnelle :


var global_transaction = require(global.TRANSACTION_DIR + '/global_transactions.js')(); //Rajouter des requêtes dans les fichiers dédiés :
//Objet ou simple query. Cependant, le nom et le message sont recommandés.


var db_to_install = require(path.resolve(global.TRANSACTION_DIR + '/install/install_db.js'));

var adm = require(path.resolve(global.TRANSACTION_DIR + '/install/install_adm.js'));

var tables_to_install = require(path.resolve(global.TRANSACTION_DIR + '/install/install_table.js'));

var basic_pages = require(path.resolve(global.TRANSACTION_DIR + '/install/install_routes.js'));

var basic_headers = require(path.resolve(global.TRANSACTION_DIR + '/install/install_headers.js'));

var basic_forms = require(path.resolve(global.TRANSACTION_DIR + '/install/install_forms.js'));

module.exports = function () {
  var _transactions = {
    init: function init() {
      var install = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var aws = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var _sql_connect;

      if (install && aws) {
        _sql_connect = {
          host: global_transaction.AWS_DB_HOST,
          user: global_transaction.AWS_SA_DB_ROOT,
          password: global_transaction.AWS_SA_DB_PWD,
          port: global_transaction.DB_PORT
        };
      } else if (install) {
        _sql_connect = {
          host: global_transaction.LOCAL_DB_HOST,
          user: global_transaction.LOCAL_SA_DB_ROOT,
          password: global_transaction.LOCAL_SA_DB_PWD,
          port: global_transaction.DB_PORT
        };
      } else {
        _sql_connect = {
          host: process.env.NODE_ENV != "development" && process.env.NODE_ENV != "production" ? global_transaction.AWS_DB_HOST : global_transaction.LOCAL_DB_HOST,
          user: global_transaction.DB_USER,
          password: global_transaction.DB_PWD,
          port: global_transaction.DB_PORT
        };
      }

      var connection = mysql.createConnection(_sql_connect);
      connection.connect();
      return connection;
    },
    db_get_infos: () => {
      return Object.assign({}, {
        DB_NAME: global_transaction.DB_NAME
      });
    },
    db_query: function db_query(connection, sql) {
      var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var name;
      return new Promise((resolve, reject) => {
        if (typeof sql == "object") {
          sql.message = typeof sql.message != "undefined" ? sql.message : "";
          name = typeof sql.name != "undefined" ? "" + sql.name + " : " : "";
          console.log(sql.name + " : " + sql.message);
          sql = sql.query;
        }

        connection.query(sql, args, (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      }).catch(error => {
        console.error("db_query Error : " + name + " ! => " + error);
      });
    },
    db_execute: function db_execute(connection, sql) {
      var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var name;
      return new Promise((resolve, reject) => {
        if (sql != null) {
          name = typeof sql.name != "undefined" ? "" + sql.name + " : " : ""; //console.log(sql.name + " : " + sql.message, " query : " + sql);
        }

        connection.execute(sql, args, (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      }).catch(error => {
        console.error("db_execute Error : " + name + " ! => " + error);
      });
    },
    db_ordered_queries: function db_ordered_queries(connection, list) {
      var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (typeof list != "undefined") {
        return new Promise( /*#__PURE__*/function () {
          var _ref = _asyncToGenerator(function* (resolve, reject) {
            yield list.map( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator(function* (el) {
                var q = new Promise((resolve, reject) => {
                  _transactions.db_query(connection, el).then(() => {
                    resolve();
                  });
                }).catch(error => {
                  console.error("db_ordered_queries Error ! => " + error);
                });
                yield q;
              });

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());
            resolve();
          });

          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }()).catch(error => {
          console.error("db_ordered_queries Error ! => " + error);
        });
      } else {
        console.log("db_ordered_queries : list " + typeof list);
      }
    },
    db_switchUser: function db_switchUser(connection) {
      var username = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : global_transaction.DB_USER;
      var password = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : global_transaction.DB_PWD;
      return new Promise(function (resolve, reject) {
        connection.changeUser({
          user: username,
          password: password
        }, function (err) {
          if (err) throw err;
        });
        console.log("Switched to user : " + username);
        resolve(connection);
      }).catch(error => {
        console.error("db_switchUser Error ! => " + error);
      });
    },
    db_flush_privileges: connection => {
      return new Promise(function (resolve, reject) {
        _transactions.db_query(connection, "FLUSH PRIVILEGES").then(() => {
          return resolve();
        });
      }).catch(error => {
        console.error("db_flush_privileges Error ! => " + error);
      });
    },
    db_use: connection => {
      return new Promise(function (resolve, reject) {
        _transactions.db_query(connection, "USE " + global_transaction.DB_NAME).then(() => {
          return resolve();
        });
      }).catch(error => {
        console.error("db_use Error ! => " + error);
      });
    },
    db_install: connection => {
      return new Promise(function (resolve, reject) {
        var d = db_to_install;

        _transactions.db_ordered_queries(connection, [d.db, d.create_admin, d.grant_admin_privileges]).then(() => {
          return resolve();
        });
      }).catch(error => {
        console.error("db_install Error ! => " + error);
      });
    },
    tables_install: connection => {
      return new Promise(function (resolve, reject) {
        var t = tables_to_install;

        var q_components = _transactions.db_ordered_queries(connection, [t.uri, t.callback, t.pages, t.pages_permissions, t.headers, t.headers_elements, t.forms, t.forms_elements]);

        var q_users = _transactions.db_ordered_queries(connection, [t.users, t.users_data, t.users_location, t.users_privileges]);

        Promise.all([q_components, q_users]).then(() => {
          return resolve();
        });
      }).catch(error => {
        console.error("tables_install Error ! => " + error);
      });
    },
    queries_install: connection => {
      return new Promise(function (resolve, reject) {
        var q_a = adm;
        var p = basic_pages;
        var q_p = [];
        var q_h = [];
        var q_f = [];

        for (var functionalities in basic_pages) {
          for (var subfunctionalities in basic_pages[functionalities]) {
            q_p.push(basic_pages[functionalities][subfunctionalities]);
          }
        }

        for (var headers in basic_headers) {
          for (var header_parts in basic_headers[headers]) {
            q_h.push(basic_headers[headers][header_parts]);
          }
        }

        for (var forms in basic_forms) {
          for (var forms_parts in basic_forms[forms]) {
            q_f.push(basic_forms[forms][forms_parts]);
          }
        }

        var q_adm = _transactions.db_ordered_queries(connection, [q_a.create, q_a.give_privileges]);

        var q_pages = _transactions.db_ordered_queries(connection, q_p);

        var q_headers = _transactions.db_ordered_queries(connection, q_h);

        var q_forms = _transactions.db_ordered_queries(connection, q_f);

        Promise.all([q_adm, q_pages, q_headers, q_forms]).then(() => {
          return resolve();
        });
      }).catch(error => {
        console.error("queries_install Error ! => " + error);
      });
    },
    db_quick_query: function db_quick_query(q) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var object = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var oneResultOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      var connection = _transactions.init();

      _transactions.db_use(connection);

      return new Promise((resolve, reject) => {
        _transactions.db_execute(connection, q, args).then(res => {
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
            return reject(new Error("Error : " + error));
          }
        });
      }).catch(error => {
        console.error("Error in db_quick_query (db_transaction@db_quick_query) => " + error);
      });
    },
    end: connection => {
      connection.end();
    }
  };
  return _transactions;
};