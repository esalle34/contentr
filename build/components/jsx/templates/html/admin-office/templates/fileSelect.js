"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = require("../../../../../../operations/modules/mandatory/i18n/services/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileSelect = args => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: args.groupClassName
  }, typeof args.prelabel != "undefined" ? /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: args.id
  }, _index.i18n.translate(args.prelabel)) : "", /*#__PURE__*/_react.default.createElement("input", {
    type: "button",
    className: "fileSelect ".concat(args.className)
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    name: args.name,
    id: args.id
  }), typeof args.aplabel != "undefined" ? /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: args.id
  }, _index.i18n.translate(args.aplabel)) : "");
};

var _default = FileSelect;
exports.default = _default;