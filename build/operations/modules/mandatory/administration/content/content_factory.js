"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentFactory = void 0;

//Author - Eric Salle
var path = require("path");

var root_path = path.dirname(require.main.filename);

var db_transaction = require(path.resolve(root_path + "/db_transaction"))();

var Content = require('./content').Content;

class ContentFactory extends Object {
  constructor(args) {
    super();
  }

  getQueryPrefix(q_name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var _query = {
      feature: "uri, feature"
    };
    return _query[q_name];
  }

  fetchAllUriByFeature() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
    var feature = arguments.length > 1 ? arguments[1] : undefined;
    return new Promise(resolve => {
      var q = "SELECT ".concat(data, " FROM uri where feature LIKE ?");
      db_transaction.db_quick_query(q, ["".concat(feature + '%')], null, false).then(res => {
        var results = [];
        res.map(contentData => {
          var content = new Content();
          content.setUri(contentData.uri);
          content.setFeature(contentData.feature);
          content.setValue(contentData.feature);
          results.push(content);
        });
        resolve(results);
      });
    }).catch(error => {
      throw new Error("Error while fetching uri by feature (contentFactory@fetchAllUriByFeature) : " + error);
    });
  }

}

exports.ContentFactory = ContentFactory;