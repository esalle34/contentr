"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Popin = props => {
  var def = true;

  if ((typeof props.img != "undefined" || props.img != null) && (typeof props.content != "undefined" || props.content != null)) {
    def = false;
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    id: props.args.id,
    key: props.args.key,
    className: "popin ".concat(props.args.className)
  }, /*#__PURE__*/_react.default.createElement("div", null, (typeof props.img != "undefined" || props.img != null) && /*#__PURE__*/_react.default.createElement("img", {
    className: "popin-img",
    src: props.img
  }), (typeof props.content != "undefined" || props.content != null) && props.content, def == true && /*#__PURE__*/_react.default.createElement("img", {
    className: "popin-img",
    src: "/assets/images/default/loader.svg"
  })));
};

var _default = Popin;
exports.default = _default;