"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = args => {
  return /*#__PURE__*/_react.default.createElement("header", {
    key: args.key != null ? args.key : undefined,
    className: typeof args.className != "undefined" ? args.className : undefined
  }, args.els);
};

var _default = Header;
exports.default = _default;