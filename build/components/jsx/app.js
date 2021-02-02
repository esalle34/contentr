"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _officeApp = require("./modules/office-app.registry");

var _reactRedux = require("react-redux");

var _store = require("./modules/redux/stores/store");

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Author - Eric Salle
class App extends _react.default.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    _officeApp.officeRegistry["dropdown"]();

    Array.from(document.querySelectorAll('link[rel="preload"]')).map(css => {
      var preloadLink = document.createElement("link");
      preloadLink.href = css.href;
      preloadLink.rel = "stylesheet";
      preloadLink.as = "style";
      css.parentNode.parentNode.append(preloadLink);
    });
  }

  render() {
    return null;
  }

}

document.addEventListener("DOMContentLoaded", function () {
  var app = document.getElementById("main");

  if (app != null) {
    _reactDom.default.render( /*#__PURE__*/_react.default.createElement(App, null), app);
  }

  ;
});