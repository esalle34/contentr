"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Form = args => {
  return /*#__PURE__*/_react.default.createElement("form", {
    id: args.id,
    key: args.key,
    method: args.method,
    className: args.async == true ? typeof args.className != "undefined" ? "async ".concat(args.className) : "async" : typeof args.className != "undefined" ? "".concat(args.className) : undefined,
    action: args.action,
    encType: args.enctype
  }, args.els);
};

var _default = Form;
exports.default = _default;