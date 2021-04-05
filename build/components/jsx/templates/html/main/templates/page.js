"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = args => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "container first-content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("h1", null, args.title), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/_react.default.createElement("image", {
    "data-src": args.image,
    className: "lazy",
    width: "350px"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 description",
    dangerouslySetInnerHTML: {
      __html: args.description
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 body",
    dangerouslySetInnerHTML: {
      __html: args.body
    }
  })));
};

var _default = Page;
exports.default = _default;