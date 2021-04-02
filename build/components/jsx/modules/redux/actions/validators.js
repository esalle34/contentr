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
exports.validateName = validateName;
exports.validateUri = validateUri;
exports.validateFile = validateFile;
exports.VALIDATE_FILE = exports.VALIDATE_URI = exports.VALIDATE_NAME = exports.VALIDATE_PASSWORD_SIGNUP = exports.VALIDATE_PASSWORD = exports.VALIDATE_USERNAME_EMAIL = exports.VALIDATE_EMAIL = exports.VALIDATE_USERNAME = exports.VALIDATE_FORM = exports.LOAD_INPUTS = void 0;

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
var VALIDATE_NAME = "VALIDATE_NAME";
exports.VALIDATE_NAME = VALIDATE_NAME;
var VALIDATE_URI = "VALIDATE_URI";
exports.VALIDATE_URI = VALIDATE_URI;
var VALIDATE_FILE = "VALIDATE_FILE";
exports.VALIDATE_FILE = VALIDATE_FILE;

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

function validateName(formId, input) {
  var isValid = false;
  var errorLabel;
  var reqlength = undefined;

  if (input.classList.value.includes("length")) {
    reqlength = input.classList.value.substring(input.classList.value.indexOf("length"));
    reqlength = reqlength.match(/[0-9]+/g)[0];
  }

  if (input.value.length === 0) {
    errorLabel = _index.i18n.translate("This field is required");
  } else if (typeof reqlength != "undefined" && input.value.length < reqlength) {
    errorLabel = _index.i18n.translateN("This field needs at least %s character", reqlength);
  } else if (typeof reqlength == "undefined" && input.value.length < 2) {
    errorLabel = _index.i18n.translateN("This field needs at least %s character", 2);
  } else {
    isValid = true;
    errorLabel = null;
  }

  return {
    type: VALIDATE_NAME,
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