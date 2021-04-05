"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentTypeFactory = void 0;

var _path = require("path");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require("path");

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var db_transaction = require(path.resolve(root_path + "/db_transaction"))();

var ContentType = require(path.resolve(global.MODULE_CONTENT_TYPES + "/content_types")).ContentType;

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
        if (typeof res == "object" && typeof res.id != "undefined") {
          return resolve("Already exists");
        } else {
          var q = "INSERT INTO content_types (machine_name, template_name) VALUES(?, ?)";
          db_transaction.db_quick_query(q, [args.machine_name, args.template_name]).then(() => {
            this.fetchContentType(args.machine_name).then(res => {
              return resolve(res);
            });
          });
        }
      });
    });
  }

  createOrUpdateForm(form_name, inputsArray) {
    var form = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    return new Promise((resolve, reject) => {
      db_transaction.db_quick_query("SELECT id from forms where name=?", [form_name]).then(res => {
        if (Object.keys(res).length != 0) {
          //Update
          return resolve();
        } else {
          //Insert
          var default_form = JSON.stringify({
            method: "post",
            async: true,
            id: "".concat(form_name),
            key: "".concat(form_name),
            className: "".concat(form_name, " backoffice-panel has-popin col-12 row justify-content-center"),
            enctype: "multipart/form-data",
            els: []
          });
          var form_q = "INSERT INTO forms (name, element, uri_id, number, isSystem) VALUES(?, ?, (SELECT id FROM uri WHERE root_id = \"create-content\"), ?, ?)";
          db_transaction.db_quick_query(form_q, [form_name, form == null ? default_form : form, 0, false]).then(res => {
            db_transaction.db_quick_query("SELECT id from forms where name=?", [form_name]).then(res => {
              if (Object.keys(res).length != 0) {
                var values = Object.values(inputsArray);
                var keys = Object.keys(inputsArray);
                var input_queries = [];

                var inputTransactions = /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(function* (next) {
                    yield db_transaction.db_quick_query("INSERT INTO forms_elements (name, element, args, form_number, weight, form_id) VALUES (?, ?, ?, ?, ?, ?)", [next.mname, next.element, next.args, next.form_number, next.weight, next.form_id]);
                  });

                  return function inputTransactions(_x) {
                    return _ref.apply(this, arguments);
                  };
                }();

                values.map( /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator(function* (input, index) {
                    var q = {
                      mname: input.mname,
                      element: input.element,
                      args: input.args,
                      form_number: 0,
                      weight: index,
                      form_id: res.id
                    };
                    yield inputTransactions(q);
                  });

                  return function (_x2, _x3) {
                    return _ref2.apply(this, arguments);
                  };
                }());
                var revision_table_query = "CREATE table IF NOT EXISTS revision_".concat(form_name, " (");
                var data_table_query = "CREATE table IF NOT EXISTS data_".concat(form_name, " (revision_id INT NOT NULL, FOREIGN KEY(revision_id) REFERENCES revision_").concat(form_name, "(id), id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id))");
                values.map((input, index) => {
                  var default_q_next = keys.length == index + 1 ? ", revisionCreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, revisionLastModifiedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id))" : ", ";
                  var default_q_submit = keys.length == index + 1 ? "revisionCreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, revisionLastModifiedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id))" : "";

                  if (input.element == "input") {
                    if (input.args.type == "text") {
                      revision_table_query = revision_table_query + "".concat(input.args.name, " VARCHAR(").concat(input.args.maxlength, ") ").concat(default_q_next);
                    } else if (input.args.type == "email" || input.args.type == "password") {
                      revision_table_query = revision_table_query + "".concat(input.args.name, " VARCHAR(255) ").concat(default_q_next);
                    } else if (input.args.type == "number") {
                      revision_table_query = revision_table_query + "".concat(input.args.name, " INT ").concat(default_q_next);
                    } else if (input.args.type == "checkbox") {
                      revision_table_query = revision_table_query + "".concat(input.args.name, " BOOL DEFAULT false ").concat(default_q_next);
                    } else {
                      revision_table_query = revision_table_query + default_q_submit;
                    }
                  } else if (input.element == "select") {
                    revision_table_query = revision_table_query + "".concat(input.args.name, " VARCHAR(255) ").concat(default_q_next);
                  } else if (input.element == "fileSelect") {
                    revision_table_query = revision_table_query + "".concat(input.args.name, " TEXT ").concat(default_q_next);
                  } else if (input.element == "textarea" || input.element == "ckEditor") {
                    revision_table_query = revision_table_query + "".concat(input.args.name, " LONGTEXT ").concat(default_q_next);
                  }
                });
                db_transaction.db_quick_query(revision_table_query).then(() => {
                  db_transaction.db_quick_query(data_table_query).then(() => {
                    return resolve();
                  });
                });
              } else {
                return resolve();
              }
            });
            return resolve();
          });
        }
      });
      return resolve();
    });
  }

  getContentTypes() {
    var sentence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var resolveContentType = (res, resolve) => {
      if (typeof res == "object" && Object.keys(res).length === 0) {
        return resolve("Nothing found");
      } else {
        var contentTypeArray = [];
        res.map(content_type => {
          var contentType = new ContentType();
          contentType.setMachineName(content_type.machine_name);
          contentType.setTemplateName(content_type.template_name);
          contentType.setId(content_type.id);
          contentTypeArray.push(contentType);
        });
        return resolve(contentTypeArray);
      }
    };

    return new Promise((resolve, reject) => {
      if (sentence == null) {
        db_transaction.db_quick_query("SELECT * from content_types", null, null, false).then(res => {
          resolveContentType(res, resolve);
        });
      } else {
        db_transaction.db_quick_query("SELECT * FROM content_types WHERE machine_name LIKE ? OR id LIKE ? OR template_name LIKE ?", ["%".concat(sentence, "%"), "%".concat(sentence, "%"), "%".concat(sentence, "%")], null, false).then(res => {
          resolveContentType(res, resolve);
        });
      }
    });
  }

  getContentTypeName(content_type_id) {
    return new Promise((resolve, reject) => {
      db_transaction.db_quick_query("SELECT machine_name from content_types where id = ?", [content_type_id]).then(res => {
        return resolve(res.machine_name);
      });
    });
  }

}

exports.ContentTypeFactory = ContentTypeFactory;