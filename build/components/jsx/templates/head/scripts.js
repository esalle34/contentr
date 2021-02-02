"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _theme = require("../../../../theme.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Scripts extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      scripts: (0, _theme.theme_js)(props.data.theme)
    };
  }

  render() {
    var view = [];

    if (typeof this.state.scripts != "undefined") {
      this.state.scripts.map(function (script) {
        view.push( /*#__PURE__*/_react.default.createElement("script", {
          type: "text/javascript",
          src: script,
          defer: true
        }));
      });
    }

    return view;
  }

}

exports.default = Scripts;