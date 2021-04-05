"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = require("../../../../../../operations/modules/mandatory/i18n/services/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Textarea = args => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: args.groupClassName
  }, typeof args.prelabel != "undefined" ? /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: args.id
  }, _index.i18n.translate(args.prelabel)) : "", /*#__PURE__*/_react.default.createElement("textarea", {
    type: "hidden",
    id: args.id,
    name: args.name,
    placeholder: typeof args.prelabel != "undefined" ? args.prelabel : typeof args.aplabel != "undefined" ? args.aplabel : undefined
  }), typeof args.aplabel != "undefined" ? /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: args.id
  }, _index.i18n.translate(args.aplabel)) : "");
};

var _default = Textarea;
exports.default = _default;