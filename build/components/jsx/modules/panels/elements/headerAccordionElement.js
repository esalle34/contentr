"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderAccordionElement = args => {
  var header_el = args.header_el;
  var index = args.index;
  var children = args.children;
  var dragStart = args.dragStart;
  var dragOver = args.dragOver;
  return /*#__PURE__*/_react.default.createElement("li", {
    id: "item-".concat(header_el.id),
    onDragOver: e => dragOver(e),
    key: "row-".concat(header_el.id),
    order: index,
    className: "draggable grabbable accordion-item ".concat(typeof header_el.isOpened != "undefined" ? header_el.isOpened == true ? "opened" : "" : ""),
    draggable: "true"
  }, typeof header_el.elem != "undefined" && header_el.elem != null ? /*#__PURE__*/_react.default.createElement("div", {
    key: "element-".concat(index),
    className: "col"
  }, "Element : ", header_el.elem) : undefined, typeof header_el.classes != "undefined" && header_el.classes != null ? /*#__PURE__*/_react.default.createElement("div", {
    key: "classes-".concat(index),
    className: "col"
  }, "Classes : ", header_el.classes) : undefined, typeof header_el.uri != "undefined" && header_el.uri != null ? /*#__PURE__*/_react.default.createElement("div", {
    key: "uri-".concat(index),
    className: "col"
  }, "Link : ", header_el.uri) : undefined, header_el.children.length > 0 ? /*#__PURE__*/_react.default.createElement("ul", {
    key: "list-".concat(header_el.id),
    className: "col"
  }, children) : undefined);
};

var _default = HeaderAccordionElement;
exports.default = _default;