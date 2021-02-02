"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _theme = require("../../../../theme.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Meta extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      custom: (0, _theme.theme_config)(),
      default: (0, _theme.theme_config_default)()
    };
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("title", null, this.state.data.title || this.state.default.title), this.state.custom.charset != undefined && /*#__PURE__*/_react.default.createElement("meta", {
      charSet: this.state.custom.charset
    }), /*#__PURE__*/_react.default.createElement("meta", {
      httpEquiv: "X-UA-Compatible",
      content: "IE=edge"
    }), /*#__PURE__*/_react.default.createElement("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }), " ");
  }

}

exports.default = Meta;