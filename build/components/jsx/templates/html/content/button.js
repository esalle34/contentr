"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = args => {
  return /*#__PURE__*/_react.default.createElement("button", {
    key: args.key,
    className: args.className != null ? args.className : undefined,
    id: args.id != null ? args.id : undefined,
    "data-toggle": args.dataToggle != null ? args.dataToggle : undefined,
    "data-target": args.dataTarget != null ? args.dataTarget : undefined,
    "aria-controls": args.ariaControls != null ? args.ariaControls : undefined,
    style: args.style != null ? args.style : undefined
  }, args.els);
};

var _default = Button;
exports.default = _default;