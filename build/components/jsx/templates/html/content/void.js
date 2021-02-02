"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Void = args => {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
    key: args.key
  }, args.els);
};

var _default = Void;
exports.default = _default;