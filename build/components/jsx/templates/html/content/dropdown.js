"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dropdown = args => {
  var InnerTag = typeof args.innerTagName != "undefined" && args.innerTagName != null ? args.innerTagName : "button";
  var innerTagClassName = typeof args.className != "undefined" && args.className != null ? "btn ".concat(args.className, " dropdown-toggle") : "btn btn-secondary dropdown-toggle";
  var menuClassName = typeof args.menuClassName != "undefined" && args.menuClassName != null ? "dropdown-menu ".concat(args.menuClassName) : "dropdown-menu";
  return /*#__PURE__*/_react.default.createElement("div", {
    key: args.key,
    className: "".concat(typeof args.dropDownClassName != "undefined" && args.dropDownClassName != null ? args.dropDownClassName : "dropdown")
  }, /*#__PURE__*/_react.default.createElement(InnerTag, {
    className: innerTagClassName,
    id: "".concat(args.id).concat(InnerTag.charAt(0).toUpperCase() + InnerTag.slice(1)),
    type: args.type,
    href: args.href,
    "data-toggle": "dropdown",
    "aria-haspopup": args.ariaHasPopUp,
    "aria-expanded": args.ariaExpanded
  }, args.value), /*#__PURE__*/_react.default.createElement("div", {
    className: menuClassName,
    "aria-labelledby": "".concat(args.id).concat(InnerTag.charAt(0).toUpperCase() + InnerTag.slice(1))
  }, args.els));
};

var _default = Dropdown;
exports.default = _default;