"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var H2 = args => {
  if (typeof args.value != "undefined" && args.els.length == 0) {
    args.els = args.value;
  }

  return /*#__PURE__*/_react.default.createElement("h2", {
    key: args.key,
    className: typeof args.className != "undefined" || args.className != null ? args.className : undefined
  }, args.els);
};

var _default = H2;
exports.default = _default;