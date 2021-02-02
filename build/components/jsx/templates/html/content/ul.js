"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ul = args => {
  return /*#__PURE__*/_react.default.createElement("ul", {
    key: args.key,
    id: args.id != null ? args.id : undefined,
    className: typeof args.className != "undefined" || args.className != null ? args.className : undefined,
    style: typeof args.style != "undefined" || args.style != null ? args.style : undefined
  }, args.els);
};

var _default = Ul;
exports.default = _default;