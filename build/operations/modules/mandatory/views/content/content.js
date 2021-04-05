"use strict";

//View - Content - Module
//Author - Eric Salle
var path = require('path');

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));

var ContentService = require(path.resolve(global.MODULE_CONTENT + "/content_service"));

module.exports = {
  getContent(route, req, res) {
    if (typeof route.content_id != "undefined" && route.content_id != null) {
      try {
        ContentService.getContent(route.content_id).then(body => {
          if (body == "Nothing found") {
            return view_service.build404View(route, req, res, null, body);
          }

          return view_service.buildView(route, req, res, body);
        });
      } catch (error) {
        console.log("Error while building content in content@getContent : " + error);
      }
    } else {
      return res.status(500).send(route.i18n.translate("Internal Server Error", route.lang));
    }
  }

};