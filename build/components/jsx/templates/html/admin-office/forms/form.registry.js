"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrependFromRegistry = exports.getAppendFromRegistry = exports.forms = void 0;

var _react = _interopRequireDefault(require("react"));

var _input = _interopRequireDefault(require("./input"));

var _form = _interopRequireDefault(require("./form"));

var _select = _interopRequireDefault(require("./select"));

var _option = _interopRequireDefault(require("./option"));

var _inputGroupAddOns = _interopRequireDefault(require("./inputGroupAddOns"));

var _ckEditor = _interopRequireDefault(require("./ckEditor"));

var _textarea = _interopRequireDefault(require("./textarea"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var forms = {
  form: _form.default,
  input: _input.default,
  select: _select.default,
  option: _option.default,
  ckEditor: _ckEditor.default,
  textarea: _textarea.default
};
exports.forms = forms;

var getAppendFromRegistry = args => {
  if (typeof args != "undefined") {
    var newArgs;

    if (typeof args != "object") {
      newArgs = Object.assign({}, {
        key: args + "-" + (typeof args.key != "undefined" ? args.key : 0)
      });
      return _inputGroupAddOns.default.append[args](newArgs);
    } else {
      newArgs = Object.assign({}, args, {
        key: "_" + args.libelle + "_" + (typeof args.key != "undefined" ? args.key : 0)
      });
      return _inputGroupAddOns.default.append[args.libelle](newArgs);
    }
  }
};

exports.getAppendFromRegistry = getAppendFromRegistry;

var getPrependFromRegistry = args => {
  if (typeof args != "undefined") {
    var newArgs;

    if (typeof args != "object") {
      newArgs = Object.assign({}, {
        key: args + "-" + (typeof args.key != "undefined" ? args.key : 0)
      });
      return _inputGroupAddOns.default.prepend[args](newArgs);
    } else {
      newArgs = Object.assign({}, args, {
        key: "_" + args.libelle + "_" + (typeof args.key != "undefined" ? args.key : 0)
      });
      return _inputGroupAddOns.default.prepend[args.libelle](newArgs);
    }
  }
};

exports.getPrependFromRegistry = getPrependFromRegistry;