"use strict";

//Administrate - Content - Module
//Author - Eric Salle
var path = require('path');

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));

var Content = require(path.resolve(global.MODULE_CONTENT + "/content")).Content;

var ContentFactory = require(path.resolve(global.MODULE_CONTENT + "/content_factory")).ContentFactory;

module.exports = {
  create_content: (route, req, res, prefix, next) => {
    var body = view_service.checkAccessRights(route, req, res, null, false);

    if (body != null && body.hasError) {
      if (typeof body.redirectUri != "undefined") {
        return res.status(403).send(Object.assign({}, {
          redirect: body.redirectUri
        }));
      }
    }

    var params = req.body;
    var newParams = {};

    for (var key in params) {
      if (key != "ms" && key != "form_id") {
        if (key.includes("boolean_")) {
          if (params[key] == "on") {
            params[key] = true;
          } else {
            params[key] = false;
          }
        }

        newParams = Object.assign({}, newParams, {
          [key]: params[key]
        });
      }
    }

    var contentFactory = new ContentFactory();
    contentFactory.createOrUpdateContent(parseInt(params.form_id), newParams).then(() => {
      return res.status(200).send({
        validPopin: route.i18n.translate("New content added", route.lang),
        validPopinLink: "reload"
      });
    });
  },

  getContent(content_id) {
    return new Promise((resolve, reject) => {
      var contentFactory = new ContentFactory();
      contentFactory.getContent(content_id).then(res => {
        return resolve(res);
      });
    });
  },

  search_content: (route, req, res, prefix, next) => {
    var params = req.body;
    var contentFactory = new ContentFactory();
    var page = (params.page - 1) * global.DEFAULT_SEARCH_ITEMS;

    try {
      contentFactory.getContents(params.value, page, global.DEFAULT_SEARCH_ITEMS).then(result => {
        return res.status(200).send(result);
      });
    } catch (error) {
      console.log("Error while fetching Contents in search_content : " + error);
    }

    return res.status(200).send("Ok !");
  }
};