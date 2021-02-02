"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Li = args => {
  return /*#__PURE__*/_react.default.createElement("li", {
    key: typeof args.key == "undefined" || args.key == null ? args.id : args.key,
    id: args.id != null ? args.id : undefined,
    className: typeof args.className != "undefined" || args.className != null ? args.className : undefined,
    style: typeof args.style != "undefined" || args.style != null ? args.style : undefined
  }, args.els);
};

var _default = Li;
exports.default = _default;