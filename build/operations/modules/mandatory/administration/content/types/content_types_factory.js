"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

//ContentType Factory
//Author - Eric Salle
var path = require("path");

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var db_transaction = require(path.resolve(root_path + "/db_transaction"))();

class ContentTypeFactory extends Object {
  constructor(args) {
    super();
  }

  fetchContentType(machine_name) {
    return new Promise((resolve, reject) => {
      var q = "SELECT id from content_types where machine_name= ?";
      db_transaction.db_quick_query(q, [machine_name]).then(res => {
        resolve(res);
      });
    });
  }

  createContentType(args) {
    return new Promise((resolve, reject) => {
      this.fetchContentType(args.machine_name).then(res => {
        console.log(res);

        if (res.length > 0) {
          return resolve("Already exists");
        }
      });
    });
  }

}

var _default = ContentTypeFactory;
exports.default = _default;