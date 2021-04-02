"use strict";

//Administrate - Content types- Module
//Author - Eric Salle
var path = require('path');

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));

var ContentTypeFactory = require(path.resolve(global.MODULE_CONTENT_TYPES + "/content_types_factory")).ContentTypeFactory;

var ContentType = require(path.resolve(global.MODULE_CONTENT_TYPES + "/content_types")).ContentType;

module.exports = {
  administration_content_types: (route, req, res) => {
    var body = view_service.checkAccessRights(route, req, res, null, false);

    if (body != null && body.hasError) {
      if (typeof body.redirectUri != "undefined") {
        return res.status(403).send(Object.assign({}, {
          redirect: body.redirectUri
        }));
      }
    }

    return view_service.getBuildView(route, req, res, body);
  },
  create_content_types: (route, req, res, prefix, next) => {
    var body = view_service.checkAccessRights(route, req, res, null, false);

    if (body != null && body.hasError) {
      if (typeof body.redirectUri != "undefined") {
        return res.status(403).send(Object.assign({}, {
          redirect: body.redirectUri
        }));
      }
    }

    var params = req.body;

    switch (prefix) {
      case "machine_name":
        ContentTypeFactory.createContentType(params).then(res => {
          if (res == "Already exists") {
            return res.status(409).send(Object.assign({}, {
              errorLabel: route.i18n.translate("Content type already exists", route.lang)
            }));
          } else {
            return res.status(200).send(Object.assign({}, {
              current: next
            }));
          }
        });

      case "inputs":
        return res.status(200).send("Ok !");

      default:
        res.status(200).send("Ok !");
        break;
    }

    return view_service.getBuildView(route, req, res, body);
  }
};