"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _meta = _interopRequireDefault(require("./head/meta"));

var _css = _interopRequireDefault(require("./head/css"));

var _scripts = _interopRequireDefault(require("./head/scripts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Head extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("head", null, /*#__PURE__*/_react.default.createElement(_meta.default, {
      data: this.state.data
    }), /*#__PURE__*/_react.default.createElement(_css.default, {
      data: this.state.data
    }), /*#__PURE__*/_react.default.createElement(_scripts.default, {
      data: this.state.data
    }));
  }

}

exports.default = Head;