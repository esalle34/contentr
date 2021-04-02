"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validators = validators;

var _validators = require("../actions/validators");

var initialState = {};

function validators() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _validators.LOAD_INPUTS:
      return Object.assign({}, state, (0, _validators.loadInputs)(action.form));

    case _validators.VALIDATE_FORM:
      return Object.assign({}, state, (0, _validators.validateForm)(action.form, action.inputs));

    case _validators.VALIDATE_EMAIL:
      return Object.assign({}, state, (0, _validators.validateEmail)(action.formId, action.el));

    case _validators.VALIDATE_USERNAME_EMAIL:
      return Object.assign({}, state, (0, _validators.validateUsernameEmail)(action.formId, action.el));

    case _validators.VALIDATE_USERNAME:
      return Object.assign({}, state, (0, _validators.validateUsername)(action.formId, action.el));

    case _validators.VALIDATE_PASSWORD:
      return Object.assign({}, state, (0, _validators.validatePassword)(action.formId, action.el));

    case _validators.VALIDATE_PASSWORD_SIGNUP:
      return Object.assign({}, state, (0, _validators.validatePasswordSignUp)(action.formId, action.el));

    case _validators.VALIDATE_NAME:
      return Object.assign({}, state, (0, _validators.validateName)(action.formId, action.el));

    case _validators.VALIDATE_URI:
      return Object.assign({}, state, (0, _validators.validateUri)(action.formId, action.el));

    case _validators.VALIDATE_FILE:
      return Object.assign({}, state, (0, _validators.validateFile)(action.formId, action.el));

    default:
      return Object.assign({}, state, {
        form: {
          input: undefined
        }
      });
  }
}