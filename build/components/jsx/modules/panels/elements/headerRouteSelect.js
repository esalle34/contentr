"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = require("../../../../../operations/modules/mandatory/i18n/services/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderRouteSelect = args => {
  var view = /*#__PURE__*/_react.default.createElement("div", {
    className: "col row"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "center"
  }, _index.i18n.translate("Nothing was found")));

  var options = [];

  if (args.datas.length > 0) {
    args.datas.map((data, index) => {
      options.push( /*#__PURE__*/_react.default.createElement("option", {
        key: "option-".concat(index),
        value: data.uri
      }, data.title, " - ", data.uri));
    });
    view = /*#__PURE__*/_react.default.createElement("div", {
      className: "input-group"
    }, /*#__PURE__*/_react.default.createElement("select", {
      className: "form-control",
      name: "uri"
    }, options));
  }

  return view;
};

var _default = HeaderRouteSelect;
exports.default = _default;