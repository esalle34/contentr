"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = args => {
  return /*#__PURE__*/_react.default.createElement("div", {
    key: args.key,
    id: args.id != null ? args.id : undefined,
    className: args.className != null ? "container ".concat(args.className) : 'container'
  }, args.els);
};

var _default = Container;
exports.default = _default;