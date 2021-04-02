"use strict";

//Administrate Module
//Author - Eric Salle
var path = require('path');

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));

module.exports = {
  administrate: function administrate(route, req, res) {
    var body = view_service.addLogoAsH1(global.CMS_TITLE);
    return view_service.getBuildView(route, req, res, body);
  }
};