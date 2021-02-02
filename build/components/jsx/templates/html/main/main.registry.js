"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = void 0;

var _react = _interopRequireDefault(require("react"));

var _form = require("../admin-office/forms/form.registry");

var _content = require("../content/content.registry");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var main = Object.assign({}, _form.forms, _content.content);
exports.main = main;