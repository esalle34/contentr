"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProgressBar = args => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "progress"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: typeof args.className != "undefined" && args.className != null ? args.className : undefined,
    role: "progressbar",
    "aria-valuenow": args.value,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    style: {
      width: args.value + "%"
    }
  }));
};

var _default = ProgressBar;
exports.default = _default;