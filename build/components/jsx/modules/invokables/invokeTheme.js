"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _theme = require("../../../../theme.js");

var _services = require("../../../../operations/modules/mandatory/i18n/services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InvokeTheme = args => {
  var list = (0, _theme.theme_list)();
  var themes = [];
  themes.push( /*#__PURE__*/_react.default.createElement("option", {
    key: "key-default-value",
    id: "key-default-value",
    value: ""
  }, _services.i18n.translate('Theme')));
  Object.keys(list).map(th => {
    themes.push( /*#__PURE__*/_react.default.createElement("option", {
      key: "key-".concat(th),
      id: "key-".concat(th),
      value: th
    }, th.charAt(0).toUpperCase() + th.slice(1)));
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "theme"
  }, _services.i18n.translate('Theme')), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("select", {
    id: "theme",
    name: "theme",
    className: "form-control col-12"
  }, themes)));
};

var _default = InvokeTheme;
exports.default = _default;