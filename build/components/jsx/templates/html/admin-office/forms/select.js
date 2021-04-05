"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _option = _interopRequireDefault(require("./option"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require("path");

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var Select = args => {
  if (typeof args.options != "undefined") {
    args.els = [];
    var i = 0;

    if (typeof args.options.values != "undefined") {
      args.options.values.map(function (option) {
        option = option.split("|");
        var value = option[0];
        var innerText = option[1];
        args.els.push( /*#__PURE__*/_react.default.createElement(_option.default, {
          id: "".concat(args.id, "-option-").concat(i),
          key: "".concat(args.key, "-key-").concat(i),
          value: value,
          els: innerText,
          selected: typeof args.options.default != "undefined" && args.options.default == option[1] ? true : undefined
        }));
        i++;
      });
    } else if (typeof args.options.file != "undefined") {
      var data = require(path.resolve(global[args.options.path] + args.options.file));

      args.els = [];
      var _i = 0;
      data.map(function (option) {
        var value = option.value;
        var innerText = option.innerText;
        args.els.push( /*#__PURE__*/_react.default.createElement(_option.default, {
          id: "".concat(args.id, "-option-").concat(_i),
          key: "".concat(args.key, "-key-").concat(_i),
          value: value,
          els: innerText
        }));
        _i++;
      });
    }
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    key: "".concat(args.key, "-container"),
    className: typeof args.groupClassName != "undefined" && args.groupClassName != null ? args.groupClassName : "form-group"
  }, typeof args.prelabel != "undefined" && args.prelabel != null && /*#__PURE__*/_react.default.createElement("label", {
    key: "prelabel-".concat(args.id),
    htmlFor: args.id
  }, args.prelabel), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("select", {
    key: args.key,
    dataset: typeof args.options.dataSet != "undefined" && args.options.dataSet != null ? JSON.stringify(args.options.dataSet) : undefined,
    id: typeof args.id != "undefined" && args.id != null ? args.id : undefined,
    name: typeof args.name != "undefined" && args.name != null ? args.name : undefined,
    className: typeof args.className != "undefined" && args.className != null ? args.className + " " + (typeof args.options.dataSet != "undefined" ? "has-dataset " + Object.keys(args.options.dataSet).join(" ") : "") : undefined,
    value: args.value != "undefined" && args.value != null ? args.value : undefined,
    placeholder: typeof args.placeholder != "undefined" && args.placeholder != null ? args.placeholder : undefined
  }, args.els)));
};

var _default = Select;
exports.default = _default;