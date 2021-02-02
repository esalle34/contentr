"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var H1 = args => {
  return /*#__PURE__*/_react.default.createElement("h1", {
    key: args.key,
    className: typeof args.className != "undefined" || args.className != null ? args.className : undefined
  }, args.els);
};

var _default = H1;
exports.default = _default;