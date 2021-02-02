"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = args => {
  return /*#__PURE__*/_react.default.createElement("option", {
    id: typeof args.id != "undefined" && args.id != null ? args.id : undefined,
    className: typeof args.className != "undefined" && args.className != null ? args.className : undefined,
    value: typeof args.value != "undefined" && args.value != null ? args.value : undefined
  }, args.els);
};

var _default = Option;
exports.default = _default;