"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _theme = require("../../../../theme.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Css extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      css: (0, _theme.theme_css)(props.data.theme)
    };
  }

  render() {
    var view = [];

    if (typeof this.state.css != "undefined") {
      this.state.css.map(function (css_file) {
        if (css_file.includes("vendors") || css_file.includes("app")) {
          view.push( /*#__PURE__*/_react.default.createElement("link", {
            href: css_file,
            type: "text/css",
            rel: "stylesheet",
            media: "all"
          }));
        } else {
          view.push( /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("link", {
            href: css_file,
            type: "text/css",
            as: "style",
            rel: "preload",
            onload: "this.rel='stylesheet'"
          }), /*#__PURE__*/_react.default.createElement("noscript", null, /*#__PURE__*/_react.default.createElement("link", {
            href: css_file,
            type: "text/css",
            rel: "stylesheet"
          }))));
        }
      });
    }

    return view;
  }

}

exports.default = Css;