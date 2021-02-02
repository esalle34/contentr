"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var A = args => {
  return /*#__PURE__*/_react.default.createElement("a", {
    key: args.key,
    id: args.id != null ? args.id : undefined,
    href: args.href,
    target: typeof args.target != "undefined" || args.target != null ? args.target : undefined,
    className: typeof args.className != "undefined" || args.className != null ? args.className : undefined,
    style: typeof args.style != "undefined" || args.style != null ? args.style : undefined
  }, args.els);
};

var _default = A;
exports.default = _default;