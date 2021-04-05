"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadInputs = loadInputs;
exports.validateForm = validateForm;
exports.validateUsername = validateUsername;
exports.validateEmail = validateEmail;
exports.validatePasswordSignUp = validatePasswordSignUp;
exports.validateUsernameEmail = validateUsernameEmail;
exports.validatePassword = validatePassword;
exports.validateString = validateString;
exports.validateNumber = validateNumber;
exports.validateUri = validateUri;
exports.validateFile = validateFile;
exports.VALIDATE_NUMBER = exports.VALIDATE_FILE = exports.VALIDATE_URI = exports.VALIDATE_STRING = exports.VALIDATE_PASSWORD_SIGNUP = exports.VALIDATE_PASSWORD = exports.VALIDATE_USERNAME_EMAIL = exports.VALIDATE_EMAIL = exports.VALIDATE_USERNAME = exports.VALIDATE_FORM = exports.LOAD_INPUTS = void 0;

var _index = require("../../../../../operations/modules/mandatory/i18n/services/index.js");

//Actions
var LOAD_INPUTS = "LOAD_INPUTS";
exports.LOAD_INPUTS = LOAD_INPUTS;
var VALIDATE_FORM = "VALIDATE_FORM";
exports.VALIDATE_FORM = VALIDATE_FORM;
var VALIDATE_USERNAME = "VALIDATE_USERNAME";
exports.VALIDATE_USERNAME = VALIDATE_USERNAME;
var VALIDATE_EMAIL = "VALIDATE_EMAIL";
exports.VALIDATE_EMAIL = VALIDATE_EMAIL;
var VALIDATE_USERNAME_EMAIL = "VALIDATE_USERNAME_EMAIL";
exports.VALIDATE_USERNAME_EMAIL = VALIDATE_USERNAME_EMAIL;
var VALIDATE_PASSWORD = "VALIDATE_PASSWORD";
exports.VALIDATE_PASSWORD = VALIDATE_PASSWORD;
var VALIDATE_PASSWORD_SIGNUP = "VALIDATE_PASSWORD_SIGNUP";
exports.VALIDATE_PASSWORD_SIGNUP = VALIDATE_PASSWORD_SIGNUP;
var VALIDATE_STRING = "VALIDATE_STRING";
exports.VALIDATE_STRING = VALIDATE_STRING;
var VALIDATE_URI = "VALIDATE_URI";
exports.VALIDATE_URI = VALIDATE_URI;
var VALIDATE_FILE = "VALIDATE_FILE";
exports.VALIDATE_FILE = VALIDATE_FILE;
var VALIDATE_NUMBER = "VALIDATE_NUMBER";
exports.VALIDATE_NUMBER = VALIDATE_NUMBER;

//Actions Creators
function loadInputs(form) {
  var newForm = Object.assign(form, {
    isValid: false
  });
  var inputs = [];
  var formId = form.id;
  form = Array.from(form);
  form.map(function (input) {
    var classN = Array.from(input.classList).filter(cl => cl.indexOf("validate") >= 0);

    if (classN.length > 0) {
      classN = classN[0].substring(9);
    }

    var upcase_name = typeof classN != "undefined" && !Array.isArray(classN) ? classN.toUpperCase() : input.name.toUpperCase();

    if (input.tagName == "INPUT" || input.tagName == "SELECT") {
      inputs.push({
        formId: formId,
        el: input,
        elgroup: input.parentNode,
        type: "VALIDATE_".concat(upcase_name)
      });
    }
  });
  return {
    type: VALIDATE_FORM,
    inputs: inputs,
    form: newForm
  };
}

function validateForm(form, inputs) {
  var isValid = true;
  inputs.map(function (input) {
    if (input.el.classList.contains("input-hasError")) {
      isValid = false;
    }
  });
  var newForm = Object.assign(form, {
    isValid: isValid
  });
  return {
    type: VALIDATE_FORM,
    form: newForm
  };
}

function validateUsername(formId, input) {
  var isValid = false;
  var errorLabel;

  if (input.value.length === 0) {
    errorLabel = _index.i18n.translate("Username is required");
  } else {
    isValid = true;
    errorLabel = null;
  }

  return {
    type: VALIDATE_USERNAME,
    form: {
      id: formId,
      input: errorToggle(input, isValid, errorLabel)
    }
  };
}

function validateEmail(formId, input) {
  var isValid = false;
  var errorLabel;

  if (input.value.length === 0) {
    errorLabel = _index.i18n.translate("Email is required");
  } else if (!input.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    errorLabel = _index.i18n.translate("This field requires a valid email");
  } else {
    isValid = true;
    errorLabel = null;
  }

  return {
    type: VALIDATE_USERNAME,
    form: {
      id: formId,
      input: errorToggle(input, isValid, errorLabel)
    }
  };
}

function validatePasswordSignUp(formId, input) {
  var isValid = false;
  var errorLabel;

  if (input.value.length === 0) {
    errorLabel = _index.i18n.translate("Password is required");
  } else if (!input.value.match(/(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/)) {
    errorLabel = _index.i18n.translate("Password must be 8 characters long, and at least have one uppercase letter, one lowercase letter, one number and one special character");
  } else {
    isValid = true;
    errorLabel = null;
  }

  return {
    type: VALIDATE_PASSWORD_SIGNUP,
    form: {
      id: formId,
      input: errorToggle(input, isValid, errorLabel)
    }
  };
}

function validateUsernameEmail(formId, input) {
  var isValid = false;
  var errorLabel;

  if (input.value.length === 0) {
    errorLabel = _index.i18n.translate("Username or email required");
  } else {
    isValid = true;
    errorLabel = null;
  }

  return {
    type: VALIDATE_USERNAME_EMAIL,
    form: {
      id: formId,
      input: errorToggle(input, isValid, errorLabel)
    }
  };
}

function validatePassword(formId, input) {
  var isValid = false;
  var errorLabel;

  if (input.value.length == 0) {
    errorLabel = _index.i18n.translate("Password is required");
  } else {
    isValid = true;
    errorLabel = null;
  }

  return {
    type: VALIDATE_PASSWORD,
    form: {
      id: formId,
      input: errorToggle(input, isValid, errorLabel)
    }
  };
}

function validateString(formId, input) {
  var isValid = false;
  var errorLabel;
  var reqminlength;
  var reqmaxlength;

  if (input.classList.value.includes("minlength")) {
    reqminlength = input.classList.value.substring(input.classList.value.indexOf("minlength"));
    reqminlength = reqminlength.match(/[0-9]+/g)[0];
  }

  if (input.classList.value.includes("maxlength")) {
    reqmaxlength = input.classList.value.substring(input.classList.value.indexOf("maxlength"));
    reqmaxlength = reqmaxlength.match(/[0-9]+/g)[0];
  }

  if (input.value.length === 0) {
    errorLabel = _index.i18n.translate("This field is required");
  } else if (typeof reqminlength != "undefined" && parseInt(input.value.length) < parseInt(reqminlength)) {
    errorLabel = _index.i18n.translateN("This field needs at least %s character", reqminlength);
  } else if (typeof reqmaxlength != "undefined" && parseInt(input.value.length) > parseInt(reqmaxlength)) {
    errorLabel = _index.i18n.translateN("This field needs a maximum of %s character", reqmaxlength);
  } else {
    isValid = true;
    errorLabel = null;
  }

  return {
    type: VALIDATE_STRING,
    form: {
      id: formId,
      input: errorToggle(input, isValid, errorLabel)
    }
  };
}

function validateNumber(formId, input) {
  var isValid = false;
  var errorLabel;
  var reqmin;
  var reqmax;

  if (input.classList.value.includes("min")) {
    reqmin = input.classList.value.substring(input.classList.value.indexOf("min"));
    reqmin = reqmin.match(/[0-9]+/g)[0];
  }

  if (input.classList.value.includes("max")) {
    reqmax = input.classList.value.substring(input.classList.value.indexOf("max"));
    reqmax = reqmax.match(/[0-9]+/g)[0];
  }

  if (input.value.length === 0) {
    errorLabel = _index.i18n.translate("This field is required");
  } else if (isNaN(input.value)) {
    errorLabel = _index.i18n.translate("This field must contain only numerical values");
  } else if (typeof reqmin != "undefined" && parseInt(input.value) < parseInt(reqmin)) {
    errorLabel = _index.i18n.translateN("This field needs at least a value of %s", reqmin);
  } else if (typeof reqmax != "undefined" && parseInt(input.value) > parseInt(reqmax)) {
    errorLabel = _index.i18n.translateN("This field needs a maximum value of %s", reqmax);
  } else {
    isValid = true;
    errorLabel = null;
  }

  return {
    type: VALIDATE_NUMBER,
    form: {
      id: formId,
      input: errorToggle(input, isValid, errorLabel)
    }
  };
}

function validateUri(formId, input) {
  var isValid = false;
  var errorLabel;

  if (input.classList.value.includes("uri_internal")) {
    if (input.value.match(/^\/(?=[a-zA-Z0-9~@#$^*()/_+=[\]{}|\\,.?:-]*$)(?!.*[<>'";`%])?/i)) {
      isValid = true;
    } else {
      errorLabel = _index.i18n.translate("Value must be compatible with internal link standards");
    }
  } else if (input.classList.value.includes("uri_external")) {
    if (input.value.match('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')) {
      isValid = true;
    } else {
      errorLabel = _index.i18n.translate("Value must be compatible with external link standards");
    }
  }

  return {
    type: VALIDATE_URI,
    form: {
      id: formId,
      input: errorToggle(input, isValid, errorLabel)
    }
  };
}

function validateFile(formId, input) {
  var isValid = false;
  var errorLabel;

  if (input.value.length == 0) {
    errorLabel = _index.i18n.translate("Nothing was selected");
  } else {
    isValid = true;
  }

  return {
    type: VALIDATE_FILE,
    form: {
      id: formId,
      input: errorToggle(input, isValid, errorLabel)
    }
  };
}

function errorToggle(input, isValid, errorLabel) {
  var newInput = input;

  if (!newInput.classList.contains("input-hasError") && !isValid) {
    newInput.classList.add("input-hasError");
  } else if (newInput.classList.contains("input-hasError") && isValid) {
    newInput.classList.remove("input-hasError");
  }

  if (!isValid) {
    newInput.errorLabel = errorLabel;
  } else {
    newInput.errorLabel = undefined;
  }

  return Object.assign({}, newInput);
}