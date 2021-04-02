"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _superagent = _interopRequireDefault(require("superagent"));

var _index = require("../../../../operations/modules/mandatory/i18n/services/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InvokeRoles extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: null
    };
  }

  componentDidMount() {
    var inputContainer = [];

    _superagent.default.post("/administrate/users/roles").send("roles=".concat(this.props.roles)).then(result => {
      result = JSON.parse(result.text);
      result.roles.map(r => {
        r = r.charAt(0).toUpperCase() + r.slice(1);
        inputContainer.push( /*#__PURE__*/_react.default.createElement("div", {
          key: "input-container-".concat(r),
          className: "form-group form-check col-12 col-sm-4"
        }, /*#__PURE__*/_react.default.createElement("div", {
          key: "input-group-".concat(r),
          className: "input-group"
        }, /*#__PURE__*/_react.default.createElement("input", {
          key: "input-check-".concat(r),
          id: "id-".concat(r),
          className: "form-check-input checkbox",
          type: "checkbox",
          name: "is".concat(r)
        }), /*#__PURE__*/_react.default.createElement("label", {
          key: "input-label-".concat(r),
          htmlFor: "id-".concat(r),
          className: "form-check-label"
        }, _index.i18n.translate(r)))));
      });
      this.setState({
        view: inputContainer
      });
    });
  }

  render() {
    return this.state.view;
  }

}

var _default = InvokeRoles;
exports.default = _default;