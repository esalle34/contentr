"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formControls = formControls;

var _formControls = require("../actions/formControls");

var initialState = {};

function formControls() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _formControls.TOGGLE_INPUT_VISIBILITY:
      return Object.assign({}, state, (0, _formControls.toggleInputVisibility)(action.input));

    case _formControls.GET_DEFAULT_COUNTRY:
      return Object.assign({}, state, (0, _formControls.getDefaultCountry)(action.input));

    case _formControls.IS_MUTATOR_CHECKBOX:
      return Object.assign({}, state, (0, _formControls.isMutatorCheckbox)(action.input));

    default:
      return state;
  }
}