"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Row = args => {
  return /*#__PURE__*/_react.default.createElement("div", {
    key: args.key,
    id: args.id != null ? args.id : undefined,
    className: typeof args.className != "undefined" ? "".concat(args.className) : 'row'
  }, args.els);
};

var _default = Row;
exports.default = _default;