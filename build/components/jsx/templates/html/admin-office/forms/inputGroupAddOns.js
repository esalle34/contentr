"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputGroupAddOns = {
  append: {
    button: args => {
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: args.className != null ? "btn btn-append " + args.className : "btn btn-append"
      }, args.els);
    },
    span: args => {
      return /*#__PURE__*/_react.default.createElement("span", {
        className: args.className != null ? args.className : "input-group-text"
      }, args.els);
    },
    icon: args => {
      return /*#__PURE__*/_react.default.createElement("i", {
        className: args.className
      }, args.els);
    }
  },
  prepend: {
    button: args => {
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: args.className != null ? "btn btn-prepend " + args.className : "btn btn-prepend"
      }, args.els);
    },
    span: args => {
      return /*#__PURE__*/_react.default.createElement("span", {
        className: args.className != null ? args.className : "input-group-text"
      }, args.els);
    },
    icon: args => {
      return /*#__PURE__*/_react.default.createElement("i", {
        className: args.className
      }, args.els);
    }
  }
};
var _default = InputGroupAddOns;
exports.default = _default;