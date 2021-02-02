"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _head = _interopRequireDefault(require("./head"));

var _html = require("./html/html.registry");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Html extends _react.default.Component {
  constructor(props) {
    super(props);
    this.buildBody = this.buildBody.bind(this);
    this.state = {
      data: props.data,
      els: this.buildBody(this.props.body)
    };
  }

  buildBody(data) {
    var lastData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var registry = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (typeof data != "undefined" && data != null) {
      if (registry == null) {
        registry = data.react_registry;

        if (typeof registry == "undefined" || registry == null) {
          throw "registry not set in data";
        }
      }

      if (data.hasOwnProperty("react_nested") || data.hasOwnProperty("react_registry")) {
        data.args.els = this.buildBody(data.react_nested, data, registry);
        var el;

        if (!data.hasOwnProperty("react_registry")) {
          if (data.hasOwnProperty("args")) {
            el = _html.html[registry][data.react_element](data.args);
          } else {
            el = _html.html[registry][data.react_element];
          }
        } else {
          el = data.args.els;
        }

        return el;
      }

      if (lastData != "undefined" && lastData != null) {
        if (Array.isArray(data)) {
          var container = [];
          data.map(function (elem) {
            if (elem.hasOwnProperty("react_nested")) {
              elem.args.els = this.buildBody(elem.react_nested, elem, registry);
            }

            var el;

            if (elem.hasOwnProperty("args")) {
              el = _html.html[registry][elem.react_element](elem.args);
            } else {
              el = _html.html[registry][elem.react_element];
            }

            container.push(el);
          }.bind(this));
          return container;
        } else if (data.hasOwnProperty("react_element")) {
          var _el;

          if (data.hasOwnProperty("args")) {
            _el = _html.html[registry][data.react_element](data.args);
          } else {
            _el = _html.html[registry][data.react_element];
          }

          return _el;
        }
      }
    }
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("html", {
      rootid: this.state.data.root_id,
      lang: this.state.data.lang
    }, /*#__PURE__*/_react.default.createElement(_head.default, {
      data: this.state.data
    }), /*#__PURE__*/_react.default.createElement("body", null, this.props.body && this.state.els));
  }

}

exports.default = Html;