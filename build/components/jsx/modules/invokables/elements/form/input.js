"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _services = require("../../../../../../operations/modules/mandatory/i18n/services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = args => {
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
      className: "col-3 form-group"
    }, /*#__PURE__*/_react.default.createElement("label", {
      key: "type-select-label-".concat(args.properties.id),
      htmlFor: "type-select-".concat(args.properties.id)
    }, _services.i18n.translate("Type")), /*#__PURE__*/_react.default.createElement("select", {
      key: "type-select-".concat(args.properties.id),
      id: "type-select-".concat(args.properties.id),
      name: "type-".concat(args.properties.id),
      className: "form-control",
      defaultValue: args.properties.type,
      onChange: e => args.inputStateChanged(e, "type", newInput)
    }, /*#__PURE__*/_react.default.createElement("option", {
      value: "text"
    }, "Text"), /*#__PURE__*/_react.default.createElement("option", {
      value: "number"
    }, "Number"), /*#__PURE__*/_react.default.createElement("option", {
      value: "email"
    }, "Email"), /*#__PURE__*/_react.default.createElement("option", {
      value: "password"
    }, "Password"), /*#__PURE__*/_react.default.createElement("option", {
      value: "checkbox"
    }, "Checkbox"), /*#__PURE__*/_react.default.createElement("option", {
      value: "submit"
    }, "Submit"))), typeof args.properties.type != "undefined" ? args.properties.type == "text" ? /*#__PURE__*/_react.default.createElement("div", {
      className: "col-12 row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-6",
      key: "form-group-minlength-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("label", {
      key: "prelabel-".concat(args.properties.id),
      htmlFor: "input-minlength-".concat(args.properties.id),
      className: "invisible"
    }, _services.i18n.translate("Min length")), /*#__PURE__*/_react.default.createElement("div", {
      className: "input-group",
      key: "input-group-minlength-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("input", {
      key: "input-minlength-".concat(args.properties.id),
      id: "input-minlength-".concat(args.properties.id),
      name: "minlength-".concat(args.properties.id),
      type: "text",
      placeholder: _services.i18n.translate("Min length"),
      onChange: e => args.inputStateChanged(e, "minlength", newInput),
      className: "form-control validate_number min-3 max-255",
      defaultValue: newInput.minlength
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-6",
      key: "form-group-maxlength-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("label", {
      key: "prelabel-".concat(args.properties.id),
      htmlFor: "input-maxlength-".concat(args.properties.id),
      className: "invisible"
    }, _services.i18n.translate("Max length")), /*#__PURE__*/_react.default.createElement("div", {
      className: "input-group",
      key: "input-group-maxlength-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("input", {
      key: "input-maxlength-".concat(args.properties.id),
      id: "input-maxlength-".concat(args.properties.id),
      name: "maxlength-".concat(args.properties.id),
      type: "text",
      placeholder: _services.i18n.translate("Max length"),
      onChange: e => args.inputStateChanged(e, "maxlength", newInput),
      className: "form-control validate_number min-3 max-255",
      defaultValue: newInput.maxlength
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group form-check col-3 checkbox-container",
      key: "form-group-label-before-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("div", {
      key: "input-group-label-before-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("input", {
      key: "input-label-before-".concat(args.properties.id),
      id: "input-label-before-".concat(args.properties.id),
      name: "prelabel-".concat(args.properties.id),
      type: "checkbox",
      defaultChecked: newInput.labelbefore,
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
    })))) : args.properties.type == "number" ? /*#__PURE__*/_react.default.createElement("div", {
      className: "col-12 row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-6",
      key: "form-group-min-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("label", {
      key: "prelabel-".concat(args.properties.id),
      htmlFor: "input-min-".concat(args.properties.id),
      className: "invisible"
    }, _services.i18n.translate("Min")), /*#__PURE__*/_react.default.createElement("div", {
      className: "input-group",
      key: "input-group-min-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("input", {
      key: "input-min-".concat(args.properties.id),
      id: "input-min-".concat(args.properties.id),
      name: "min-".concat(args.properties.id),
      type: "text",
      placeholder: _services.i18n.translate("Min"),
      onChange: e => args.inputStateChanged(e, "min", newInput),
      className: "form-control validate_number min-3",
      defaultValue: newInput.min
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-6",
      key: "form-group-max-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("label", {
      key: "prelabel-".concat(args.properties.id),
      htmlFor: "input-max-".concat(args.properties.id),
      className: "invisible"
    }, _services.i18n.translate("Max")), /*#__PURE__*/_react.default.createElement("div", {
      className: "input-group",
      key: "input-group-max-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("input", {
      key: "input-max-".concat(args.properties.id),
      id: "input-max-".concat(args.properties.id),
      name: "max-".concat(args.properties.id),
      type: "text",
      placeholder: _services.i18n.translate("Max"),
      onChange: e => args.inputStateChanged(e, "max", newInput),
      className: "form-control validate_number min-3",
      defaultValue: newInput.max
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group form-check col-3 checkbox-container",
      key: "form-group-label-before-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("div", {
      key: "input-group-label-before-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("input", {
      key: "input-label-before-".concat(args.properties.id),
      id: "input-label-before-".concat(args.properties.id),
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
    })))) : args.properties.type == "checkbox" ? /*#__PURE__*/_react.default.createElement("div", {
      className: "col-12 row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-6",
      key: "form-group-checkbox-on-value-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("label", {
      key: "prelabel-".concat(args.properties.id),
      htmlFor: "label-on-value-".concat(args.properties.id),
      className: "invisible"
    }, _services.i18n.translate("Label if true")), /*#__PURE__*/_react.default.createElement("div", {
      className: "input-group",
      key: "label-on-value-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("input", {
      key: "label-on-value-".concat(args.properties.id),
      id: "label-on-value-".concat(args.properties.id),
      name: "onvalue-".concat(args.properties.id),
      type: "text",
      placeholder: _services.i18n.translate("Label if true"),
      onChange: e => args.inputStateChanged(e, "ontrue", newInput),
      className: "form-control validate_string minlength-3",
      defaultValue: newInput.ontrue
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-6",
      key: "form-group-checkbox-off-value-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("label", {
      key: "prelabel-".concat(args.properties.id),
      htmlFor: "label-off-value-".concat(args.properties.id),
      className: "invisible"
    }, _services.i18n.translate("Label if false")), /*#__PURE__*/_react.default.createElement("div", {
      className: "input-group",
      key: "label-off-value-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("input", {
      key: "label-off-value-".concat(args.properties.id),
      id: "label-off-value-".concat(args.properties.id),
      name: "offvalue-".concat(args.properties.id),
      type: "text",
      placeholder: _services.i18n.translate("Label if false"),
      onChange: e => args.inputStateChanged(e, "onfalse", newInput),
      className: "form-control validate_string minlength-3",
      defaultValue: newInput.onfalse
    })))) : args.properties.type == "submit" ? /*#__PURE__*/_react.default.createElement("div", {
      className: "form-group col-9",
      key: "form-group-els-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("label", {
      key: "prelabel-".concat(args.properties.id),
      htmlFor: "els-".concat(args.properties.id),
      className: "invisible"
    }, _services.i18n.translate("Value")), /*#__PURE__*/_react.default.createElement("div", {
      className: "input-group",
      key: "els-".concat(args.properties.id)
    }, /*#__PURE__*/_react.default.createElement("input", {
      key: "els-".concat(args.properties.id),
      id: "els-".concat(args.properties.id),
      name: "els-".concat(args.properties.id),
      type: "text",
      placeholder: _services.i18n.translate("Value"),
      onChange: e => args.inputStateChanged(e, "value", newInput),
      className: "form-control validate_string minlength-3",
      defaultValue: newInput.value
    }))) : undefined : undefined, /*#__PURE__*/_react.default.createElement("div", {
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

var _default = Input;
exports.default = _default;