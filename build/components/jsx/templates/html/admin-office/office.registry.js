"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.office = void 0;

var _form = require("./forms/form.registry");

var _templates = require("./templates/templates.registry");

var _content = require("../content/content.registry");

var office = Object.assign({}, _form.forms, _content.content, _templates.templates);
exports.office = office;