"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = args => {
  return /*#__PURE__*/_react.default.createElement("img", {
    id: args.id != null ? args.id : undefined,
    key: args.key,
    className: typeof args.className != "undefined" || args.className != null ? args.className : undefined,
    src: args.src,
    style: args.style
  }, args.els);
};

var _default = Image;
exports.default = _default;