"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _redux = require("redux");

var _validators = require("../reducers/validators");

var _formControls = require("../reducers/formControls");

var validatorsReducer = (0, _redux.combineReducers)({
  validators: _validators.validators,
  formControls: _formControls.formControls
});
var store = (0, _redux.createStore)(validatorsReducer);
exports.store = store;