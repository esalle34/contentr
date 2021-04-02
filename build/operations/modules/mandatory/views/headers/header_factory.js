"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderFactory = void 0;

var _path = require("path");

//Author - Eric Salle
var path = require("path");

var root_path = path.dirname(require.main.filename);

var db_transaction = require(path.resolve(root_path + "/db_transaction"))();

var Header = require("./header").Header;

var header_keyword = "header_";

class HeaderFactory extends Object {
  constructor() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    super();

    if (args != null) {
      if (args.loggedIn) {
        var topLevelRole;

        for (var prop in args.userRoles) {
          if (Boolean(args.userRoles[prop])) {
            topLevelRole = [prop.toLowerCase()];
          }

          ;
        }

        if (typeof topLevelRole == "undefined") {
          topLevelRole = "loggedout";
        }

        this.headerFactory = Object.assign({}, {
          header_name: [header_keyword + topLevelRole],
          topLevelRole: topLevelRole
        });
      } else {
        this.headerFactory = Object.assign({}, {
          header_name: [header_keyword + 'loggedout'],
          topLevelRole: "loggedout"
        });
      }
    }
  }

  getQueryPrefix(q_name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var _query = {
      header: "JSON_OBJECT('name', headers.name, 'element', headers.element) as header, JSON_ARRAYAGG(JSON_OBJECT(\"name\", helems.name, \"id\", helems.id, \"header_element_id\", helems.header_element_id, \"header_element_name\", helems.header_element_name, \"elem\", helems.element, \"args\", helems.args, \"weight\", helems.weight, \"value\", helems.value, 'uri', (SELECT uri FROM uri WHERE id = helems.uri_id))) as helems"
    };
    return _query[q_name];
  }

  fetchHeader() {
    var datas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
    return new Promise(resolve => {
      var q = "SELECT ".concat(datas, " FROM headers AS headers INNER JOIN headers_elements AS helems ON helems.header_id = headers.id WHERE headers.name = ?");
      db_transaction.db_quick_query(q, this.headerFactory.header_name).then(res => {
        var header = new Header();
        header.setHeaderData(res.header);
        header.setHeader();
        header.setHelemsData(res.helems);
        return resolve(header);
      });
    }).catch(error => {
      console.error("Error while fetching Header for role => ".concat(this.headerFactory.topLevelRole, " (HeaderFactory@fetchHeader) : ") + error);
    });
  }

  fetchHeaderById() {
    var datas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
    var id = arguments.length > 1 ? arguments[1] : undefined;
    return new Promise(resolve => {
      var q = "SELECT ".concat(datas, " FROM headers AS headers INNER JOIN headers_elements AS helems ON helems.header_id = headers.id WHERE headers.id = ?");
      db_transaction.db_quick_query(q, [id]).then(res => {
        var header = new Header();
        header.setHeaderData(res.header);
        header.setHeader();
        header.setHelemsData(res.helems);
        return resolve(header);
      });
    }).catch(error => {
      console.error("Error while fetching Header for role => ".concat(this.headerFactory.topLevelRole, " (HeaderFactory@fetchHeader) : ") + error);
    });
  }

  removeHeaderElements(list, header_id) {
    var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    return new Promise((resolve, reject) => {
      if (list.length == 0) {
        return resolve();
      }

      var newList = list.filter(subel => subel.header_element_id == id);
      var q_list = [];

      if (newList.length > 0) {
        newList.map((el, index) => {
          q_list.push(this.removeHeaderElements(list, header_id, el.id));
        });
        Promise.all(q_list).then(() => {
          newList.map((el, index) => {
            db_transaction.db_quick_query("DELETE from headers_elements where name = ?", [el.header_element_name]).then(() => {
              return resolve();
            });
          });
        });
      } else {
        var name = list.find(el => el.id == id).name;
        db_transaction.db_quick_query("DELETE from headers_elements where name = ?", [name]).then(() => {
          return resolve();
        });
      }
    });
  }

  createOrUpdateHeader(list, header_id) {
    var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var originalHeaderElsList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var createHeaderTree = (list, header_id) => {
      return new Promise((resolve, reject) => {
        var newList = list.filter(el => el.header_element_id == id);
        var q_insert = [];
        newList.map((el, index) => {
          var header_element_id;
          var header_element_name;
          var uri_id;
          var q_list = [];

          if (el.uri != null) {
            q_list.push(db_transaction.db_quick_query("SELECT id from uri where uri.uri= ?", [el.uri]));
            q_list.push(db_transaction.db_quick_query("SELECT id, name FROM headers_elements where name = ?", [el.header_element_name]));

            if (el.args == "") {
              el.args = null;
            }
          } else {
            q_list.push(db_transaction.db_quick_query("SELECT id, name FROM headers_elements where name = ?", [el.header_element_name]));

            if (el.args == "") {
              el.args = null;
            }
          }

          Promise.all(q_list).then(res => {
            header_element_id = typeof res[q_list.length - 1] != "undefined" && res[q_list.length - 1].length != 0 && typeof res[q_list.length - 1].id != "undefined" ? res[q_list.length - 1].id : null;
            header_element_name = typeof res[q_list.length - 1] != "undefined" && res[q_list.length - 1].length != 0 && typeof res[q_list.length - 1].name != "undefined" ? res[q_list.length - 1].name : null;
            uri_id = typeof res[0] != "undefined" && res[0].length != 0 && typeof res[0].id != "undefined" && typeof res[1] != "undefined" ? res[0].id : null;
            q_insert.push(db_transaction.db_quick_query("INSERT INTO headers_elements (name, element, args, value, weight, header_id, header_element_id, header_element_name, uri_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [el.name, el.elem, el.args, el.value, newList.findIndex(subel => subel.name == el.name), header_id, header_element_id, header_element_name, uri_id]).then(() => {
              this.createOrUpdateHeader(list, header_id, el.id);
            }));
          });
        });
        Promise.all(q_insert).then(() => {
          return resolve();
        });
      });
    };

    return new Promise((resolve, reject) => {
      if (originalHeaderElsList != null) {
        this.removeHeaderElements(originalHeaderElsList, header_id).then(() => {
          createHeaderTree(list, header_id).then(() => {
            return resolve();
          });
        });
      } else {
        createHeaderTree(list, header_id).then(() => {
          return resolve();
        });
      }
    });
  }

  fetchAllHeadersContainer(value) {
    return new Promise((resolve, reject) => {
      var q;

      if (value.length == 0) {
        q = "SELECT id, name, lastModifiedAt FROM headers";
        db_transaction.db_quick_query(q, null, null, false).then(res => {
          resolve(res);
        });
      } else {
        q = "SELECT id, name, lastModifiedAt FROM headers WHERE name LIKE ?";
        db_transaction.db_quick_query(q, ["%header_".concat(value, "%")], null, false).then(res => {
          resolve(res);
        });
      }
    }).catch(error => {
      console.error("Error while fetching Headers Container : (HeaderFactory@fetchAllHeaderContainer) : " + error);
    });
  }

}

exports.HeaderFactory = HeaderFactory;