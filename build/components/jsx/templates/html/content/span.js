"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Span = args => {
  return /*#__PURE__*/_react.default.createElement("span", {
    key: args.key,
    className: args.className != null ? args.className : undefined,
    id: args.id != null ? args.id : undefined,
    style: args.style != null ? args.style : undefined
  }, args.els);
};

var _default = Span;
exports.default = _default;