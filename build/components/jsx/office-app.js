"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _officeApp = require("./modules/office-app.registry");

var _reactRedux = require("react-redux");

var _store = require("./modules/redux/stores/store");

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Author - Eric Salle
class OfficeApp extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: ""
    };
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
    var adminforms = Array.from(document.getElementsByTagName("FORM"));
    var Form = _officeApp.officeRegistry["form"];
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: "officeapp"
    }, adminforms.map((form, i) => {
      return /*#__PURE__*/_react.default.createElement(Form, {
        key: "form-control-".concat(i),
        form: form,
        store: _store.store
      });
    }));
  }

}

document.addEventListener("DOMContentLoaded", function () {
  var officeapp = document.getElementById("office");

  if (officeapp != null) {
    _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
      store: _store.store
    }, /*#__PURE__*/_react.default.createElement(OfficeApp, null)), officeapp);
  }

  ;
});