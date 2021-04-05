"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _input = _interopRequireDefault(require("./form/input"));

var _select = _interopRequireDefault(require("./form/select"));

var _default2 = _interopRequireDefault(require("./form/default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputContainerElement = args => {
  var template;

  switch (args.el) {
    case "input":
      template = /*#__PURE__*/_react.default.createElement(_input.default, {
        el: args.el,
        properties: args.properties,
        inputStateChanged: args.inputStateChanged
      });
      break;

    case "select":
      template = /*#__PURE__*/_react.default.createElement(_select.default, {
        el: args.el,
        properties: args.properties,
        inputStateChanged: args.inputStateChanged
      });
      break;

    default:
      template = /*#__PURE__*/_react.default.createElement(_default2.default, {
        el: args.el,
        properties: args.properties,
        inputStateChanged: args.inputStateChanged
      });
      break;
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
    key: "input-container-frag-".concat(args.properties.id)
  }, /*#__PURE__*/_react.default.createElement("li", {
    key: "item-".concat(args.properties.id),
    className: "draggable grabbable accordion-item ".concat(args.properties.isOpened ? "opened" : ""),
    draggable: "true"
  }, template));
};

var _default = InputContainerElement;
exports.default = _default;