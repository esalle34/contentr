"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _form = require("./form.registry");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = args => {
  if (typeof args.append == "object" && ! /*#__PURE__*/_react.default.isValidElement(args.append)) {
    if (typeof args.append.subelement == "undefined") {
      args.append.subelement = "icon";
    }

    args.append = (0, _form.getAppendFromRegistry)({
      libelle: args.append.element,
      className: args.append.buttonClassName,
      els: (0, _form.getAppendFromRegistry)({
        libelle: args.append.subelement,
        className: args.append.icon
      })
    });
  }

  if (typeof args.prepend == "object" && ! /*#__PURE__*/_react.default.isValidElement(args.append)) {
    if (typeof args.prepend.subelement == "undefined") {
      args.prepend.subelement = "icon";
    }

    args.prepend = (0, _form.getPrependFromRegistry)({
      libelle: args.prepend.element,
      className: args.prepend.buttonClassName,
      els: (0, _form.getPrependFromRegistry)({
        libelle: args.prepend.subelement,
        className: args.prepend.icon
      })
    });
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    key: "".concat(args.groupClassName) + "-" + "".concat(args.key),
    className: typeof args.groupClassName != "undefined" || args.groupClassName != null ? "".concat(args.groupClassName) : "form-group"
  }, typeof args.prelabel != "undefined" && args.prelabel != null && /*#__PURE__*/_react.default.createElement("label", {
    key: "prelabel-".concat(args.id),
    htmlFor: args.id,
    className: typeof args.type != "undefined" ? args.type == "checkbox" ? "form-check-label" : args.type == "text" || args.type == "password" || args.type == "email" ? "sr-only" : args.type == "file" ? "file-label col" : undefined : undefined
  }, args.prelabel), /*#__PURE__*/_react.default.createElement("div", {
    className: typeof args.type != "undefined" ? args.type == "checkbox" ? undefined : "input-group" : undefined
  }, typeof args.prepend != "undefined" && args.prepend != null && /*#__PURE__*/_react.default.createElement("div", {
    className: "input-group-prepend"
  }, args.prepend), /*#__PURE__*/_react.default.createElement("input", {
    id: args.id,
    key: args.key,
    name: args.name,
    type: args.type,
    className: args.className,
    placeholder: args.placeholder,
    value: args.value,
    dataset: typeof args.dataSet != "undefined" && args.dataSet != null ? JSON.stringify(args.dataSet) : undefined
  }), typeof args.append != "undefined" && args.append != null && /*#__PURE__*/_react.default.createElement("div", {
    className: "input-group-append"
  }, args.append)), typeof args.aplabel != "undefined" && args.aplabel != null && /*#__PURE__*/_react.default.createElement("label", {
    key: "prelabel-".concat(args.id),
    htmlFor: args.id,
    className: typeof args.type != "undefined" ? args.type == "checkbox" ? "form-check-label" : args.type == "text" ? "sr-only" : undefined : undefined
  }, args.aplabel));
};

var _default = Input;
exports.default = _default;