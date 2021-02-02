"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderFactory = void 0;

//Author - Eric Salle
var path = require("path");

var root_path = path.dirname(require.main.filename);

var db_transaction = require(path.resolve(root_path + "/db_transaction"))();

var Header = require("./header").Header;

var header_keyword = "header_";

class HeaderFactory extends Object {
  constructor(args) {
    super();

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

  getQueryPrefix(q_name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var _query = {
      header: "JSON_OBJECT('name', headers.name, 'element', headers.element) as header, JSON_ARRAYAGG(JSON_OBJECT(\"id\", helems.id, \"header_element_id\", helems.header_element_id, \"elem\", helems.element, \"args\", helems.args, \"value\", helems.value, 'uri', (SELECT uri FROM uri WHERE id = helems.uri_id))) as helems"
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

}

exports.HeaderFactory = HeaderFactory;