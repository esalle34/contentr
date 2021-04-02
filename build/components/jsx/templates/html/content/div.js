"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Div = args => {
  return /*#__PURE__*/_react.default.createElement("div", {
    key: args.key,
    dataset: typeof args.dataSet != "undefined" ? JSON.stringify(args.dataSet) : undefined,
    className: args.className != null ? args.className : undefined,
    id: args.id != null ? args.id : undefined,
    style: args.style != null ? args.style : undefined
  }, args.els);
};

var _default = Div;
exports.default = _default;