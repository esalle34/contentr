"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _services = require("../../../../../../operations/modules/mandatory/i18n/services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = args => {
  if (typeof args.properties != "undefined" && args.properties.isEditable == true) {
    var newInput = Object.assign({}, args.properties);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: "input-frag-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "row",
      key: "row-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "hidden",
      name: "element-".concat(args.properties.id),
      value: args.el
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-6",
      key: "form-group-name-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("label", {
      key: "prelabel-".concat(args.properties.id),
      htmlFor: "input-name-".concat(args.properties.id),
      className: "invisible"
    }, _services.i18n.translate("Name")), /*#__PURE__*/_react.default.createElement("div", {
      className: "input-group",
      key: "input-group-name-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("input", {
      key: "input-name-".concat(args.properties.id),
      type: "text",
      placeholder: _services.i18n.translate("Name"),
      name: "name-".concat(args.properties.id),
      onChange: e => args.inputStateChanged(e, "name", newInput),
      className: "form-control validate_string minlength-3",
      defaultValue: newInput.name
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-6",
      key: "form-group-id-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("label", {
      key: "prelabel-".concat(args.properties.id),
      htmlFor: "input-id-".concat(args.properties.id),
      className: "invisible"
    }, _services.i18n.translate("Id")), /*#__PURE__*/_react.default.createElement("div", {
      className: "input-group",
      key: "input-group-id-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("input", {
      key: "input-id-".concat(args.properties.id),
      type: "text",
      placeholder: _services.i18n.translate("Id"),
      name: "id-".concat(args.properties.id),
      onChange: e => args.inputStateChanged(e, "text-id", newInput),
      className: "form-control validate_string minlength-3",
      defaultValue: newInput["text-id"]
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-12",
      key: "form-group-values-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("label", {
      key: "prelabel-".concat(args.properties.id),
      className: "invisible",
      htmlFor: "input-group-values-".concat(args.properties.id)
    }, _services.i18n.translate("Values, separate label and values with '|', next value with ','")), /*#__PURE__*/_react.default.createElement("div", {
      className: "input-group",
      key: "input-group-values-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("textarea", {
      key: "input-group-values-".concat(args.properties.id),
      id: "input-group-values-".concat(args.properties.id),
      name: "values-".concat(args.properties.id),
      placeholder: _services.i18n.translate("Values, separate label and values with '|', next value with ','") + "...",
      onChange: e => args.inputStateChanged(e, "values", newInput),
      className: "form-control",
      defaultValue: newInput.values
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group form-check col-3 checkbox-container",
      key: "form-group-label-before-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("div", {
      key: "input-group-label-before-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("input", {
      key: "input-label-before-".concat(args.properties.id),
      id: "input-label-before-".concat(args.properties.id),
      defaultChecked: newInput.labelbefore,
      name: "prelabel-".concat(args.properties.id),
      type: "checkbox",
      placeholder: _services.i18n.translate("Is label before input ?"),
      onChange: e => args.inputStateChanged(e, "labelbefore", newInput, "checkbox"),
      className: "form-check-input checkbox",
      defaultValue: newInput.labelbefore
    })), /*#__PURE__*/_react.default.createElement("label", {
      key: "prelabel-".concat(args.properties.id),
      htmlFor: "input-label-before-".concat(args.properties.id),
      className: "form-check-label"
    }, _services.i18n.translate("Is label before input ?"))), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-9",
      key: "form-group-label-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("label", {
      key: "prelabel-".concat(args.properties.id),
      htmlFor: "input-label-".concat(args.properties.id),
      className: "invisible"
    }, _services.i18n.translate("Label")), /*#__PURE__*/_react.default.createElement("div", {
      className: "input-group",
      key: "input-group-label-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("input", {
      key: "input-label-".concat(args.properties.id),
      id: "input-label-".concat(args.properties.id),
      name: "label-".concat(args.properties.id),
      type: "text",
      placeholder: _services.i18n.translate("Label"),
      onChange: e => args.inputStateChanged(e, "label", newInput),
      className: "form-control validate_string minlength-3",
      defaultValue: newInput.label
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-12",
      key: "form-group-groupclassName-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("label", {
      key: "prelabel-".concat(args.properties.id),
      htmlFor: "input-groupclassName-".concat(args.properties.id),
      className: "invisible"
    }, _services.i18n.translate("Group Classes")), /*#__PURE__*/_react.default.createElement("div", {
      className: "input-group",
      key: "input-group-groupclassName-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("input", {
      key: "input-groupclassName-".concat(args.properties.id),
      id: "input-groupclassName-".concat(args.properties.id),
      name: "groupClassName-".concat(args.properties.id),
      type: "text",
      placeholder: _services.i18n.translate("Group Classes"),
      onChange: e => args.inputStateChanged(e, "groupClassName", newInput),
      className: "form-control",
      defaultValue: newInput.groupClassName
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-12",
      key: "form-group-className-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("label", {
      key: "prelabel-".concat(args.properties.id),
      htmlFor: "input-className-".concat(args.properties.id),
      className: "invisible"
    }, _services.i18n.translate("Classes")), /*#__PURE__*/_react.default.createElement("div", {
      className: "input-group",
      key: "input-group-className-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("input", {
      key: "input-className-".concat(args.properties.id),
      id: "input-className-".concat(args.properties.id),
      name: "className-".concat(args.properties.id),
      type: "text",
      placeholder: _services.i18n.translate("Classes"),
      onChange: e => args.inputStateChanged(e, "className", newInput),
      className: "form-control",
      defaultValue: newInput.className
    })))));
  }
};

var _default = Select;
exports.default = _default;