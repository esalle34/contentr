"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html = void 0;

var _react = _interopRequireDefault(require("react"));

var _main = require("./main/main.registry");

var _office = require("./admin-office/office.registry");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = {
  office: _office.office,
  main: _main.main
};
exports.html = html;