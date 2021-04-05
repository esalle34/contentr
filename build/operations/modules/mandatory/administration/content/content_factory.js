"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentFactory = void 0;

//Content Factory 
//Author - Eric Salle
var path = require("path");

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var db_transaction = require(path.resolve(root_path + "/db_transaction"))();

var Content = require(path.resolve(global.MODULE_CONTENT + "/content")).Content;

var ContentTypesService = require(path.resolve(global.MODULE_CONTENT_TYPES + "/content_types_service"));

class ContentFactory extends Object {
  constructor(args) {
    super();
  }

  createOrUpdateContent(content_type_id, values) {
    var content_id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    return new Promise((resolve, reject) => {
      ContentTypesService.getContentTypeName(content_type_id).then(machine_name => {
        var q = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=? AND TABLE_NAME=? AND COLUMN_NAME NOT LIKE \"%id\" AND COLUMN_NAME NOT LIKE \"%createdAt\" AND COLUMN_NAME NOT LIKE \"%lastModifiedAt\"";
        db_transaction.db_quick_query(q, [db_transaction.db_get_infos().DB_NAME, "revision_".concat(machine_name)], null, false).then(columns => {
          var insert_array = [];

          if (content_id == null) {
            q = "INSERT INTO revision_".concat(machine_name, " (");
            columns.map((col, index) => {
              q = q + col.COLUMN_NAME;

              if (columns.length == index + 1) {
                q = q + ") VALUES (";
              } else {
                q = q + ", ";
              }
            });
            var j = 0;

            for (var key in values) {
              insert_array.push(values[key]);
              j++;

              if (j < Object.keys(values).length) {
                q = q + "?, ";
              } else {
                q = q + "?);";
              }
            }
          }

          db_transaction.db_quick_query(q, insert_array).then(() => {
            q = "INSERT INTO data_".concat(machine_name, " (revision_id) VALUES ((SELECT Max(id) from revision_").concat(machine_name, "));");
            db_transaction.db_quick_query(q).then(() => {
              q = "INSERT INTO content (data_id, content_type_id) VALUES ((SELECT Max(id) from data_".concat(machine_name, "), ?);");
              db_transaction.db_quick_query(q, [content_type_id]).then(() => {
                return resolve();
              });
            });
          });
        });
      });
    });
  }

  getContent(content_id) {
    var q = "SELECT * FROM content AS content INNER JOIN content_types AS content_types ON content_types.id = content.content_type_id WHERE content.id = ?";
    return new Promise((resolve, reject) => {
      db_transaction.db_quick_query(q, [content_id]).then(content_data => {
        if (Object.keys(content_data).length === 0) {
          return resolve("Nothing found");
        }

        q = "SELECT * FROM content AS content INNER JOIN content_types AS content_types ON content_types.id = content.content_type_id INNER JOIN data_".concat(content_data.machine_name, " AS data ON data.id = content.data_id INNER JOIN revision_").concat(content_data.machine_name, " AS revision ON revision.id = data.revision_id WHERE content.id = ?");
        db_transaction.db_quick_query(q, [content_id]).then(content_data => {
          var content = new Content();
          var args = {};

          for (var key in content_data) {
            if (key != "machine_name" && key != "template_name" && key != "id" && key != "content_type_id" && key != "createdAt") {
              args = Object.assign({}, args, {
                [key]: content_data[key]
              });
            }
          }

          content.setId(content_data.id);
          content.setMachineName(content_data.machine_name);
          content.setLastModifiedAt(content_data.lastModifiedAt);
          content.setCreatedAt(content_data.createdAt);
          content.setElement(content_data.template_name);
          content.setArgs(args);
          content.setReactNested([]);
          return resolve(content);
        });
      });
    });
  }

  getContents(sentence, pageNumber, itemsNumber) {
    return new Promise((resolve, reject) => {
      var q = "SELECT * FROM content AS content INNER JOIN content_types AS content_types ON content_types.id = content.content_type_id WHERE content.id LIKE ?";
      db_transaction.db_quick_query(q, ["%".concat(sentence, "%")]).then(contents => {
        console.log(contents);
        resolve();
      });
    });
  }

}

exports.ContentFactory = ContentFactory;