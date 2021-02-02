"use strict";

//Pages Module
//Author - Eric Salle
var path = require('path');

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "\\global"))();

var view_service = require(path.resolve(global.MODULE_VIEW + "\\view_service"));

module.exports = {
  createPage(route, req, res) {
    var body = {
      react_element: "p",
      args: {
        els: "hello world"
      }
    };
    return view_service.buildView(route, req, res, body);
  },

  createPageForm(route, req, res) {
    return null;
  }

};