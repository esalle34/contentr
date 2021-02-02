"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.officeRegistry = void 0;

var _form = require("./forms/form.registry");

var _dropdown = require("./dropdown/dropdown.registry");

var _popin = require("./popin/popin.registry");

var _progress = require("./progress/progress.registry");

var officeRegistry = Object.assign({}, _dropdown.dropdown, _form.forms, _popin.popin, _progress.progress);
exports.officeRegistry = officeRegistry;