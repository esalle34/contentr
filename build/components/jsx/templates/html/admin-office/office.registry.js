"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.office = void 0;

var _react = _interopRequireDefault(require("react"));

var _form = require("./forms/form.registry");

var _content = require("../content/content.registry");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var value = "content";
var path = "../content/content.registry";
var office = Object.assign({}, _form.forms, _content.content);
exports.office = office;