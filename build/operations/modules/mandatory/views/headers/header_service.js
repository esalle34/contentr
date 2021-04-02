"use strict";

var path = require('path');

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));

var HeaderFactory = require("./header_factory").HeaderFactory;

var Header = require("./header").Header;

module.exports = {
  manage_header: (route, req, res, prefix, next) => {
    var body = view_service.checkAccessRights(route, req, res, null, false);

    if (body != null && body.hasError) {
      if (typeof body.redirectUri != "undefined") {
        return res.status(403).send(Object.assign({}, {
          redirect: body.redirectUri
        }));
      }
    }

    var headerFactory = new HeaderFactory();
    var params = req.body;
    var data;

    switch (prefix) {
      case "search":
        data = headerFactory.fetchAllHeadersContainer(params.value);
        data.then(resolve => {
          return res.status(200).send([resolve]);
        });
        break;

      case "headerdata":
        data = headerFactory.fetchHeaderById(headerFactory.getQueryPrefix("header"), params.id).then(header => {
          return res.status(200).send(header.getHelemsData());
        });
        break;

      case "submit":
        headerFactory.createOrUpdateHeader(params.headerElsList, params.header_id, null, params.originalHeaderElsList).then(() => {
          return res.status(200).send("Ok !");
        });
        break;

      default:
        return res.status(404).send("Not found");
    }
  }
};