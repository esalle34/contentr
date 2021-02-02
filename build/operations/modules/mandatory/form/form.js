"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var _webpack = require("webpack");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//Author - Eric Salle
class Form extends Object {
  constructor(args) {
    super();
  }

  setFormData(form) {
    this.formData = form;
  }

  getFormData() {
    return this.formData;
  }

  setFelemsData(felems) {
    this.felemsData = felems;
  }

  getFelemsData() {
    return this.felemsData;
  }

  resolveFormElements(route, formComponent, els) {
    var parentTag = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    if (typeof formComponent != "undefined" && formComponent.args.className.includes("forwardable-form")) {
      formComponent.forms.map(formEl => {
        var newEls = els.filter(el => el.form_number == formEl.number);
        formComponent.react_nested.push(this.resolveFormElements(route, formEl, newEls));
      });
      return formComponent;
    } else {
      var parentComponent;

      if (parentTag != null) {
        if (parentTag.length == 1) {
          parentComponent = {
            react_element: parentTag[0].elem,
            args: JSON.parse(parentTag[0].args),
            react_nested: []
          };
        } else {
          throw new Error("Form filter resolved more than one parent, this is not allowed (@modules/mandatory/forms/Form.js)");
        }
      }

      var parent;
      els.map(function (felem) {
        if (typeof parentComponent != "undefined") {
          var felemParsedArgs = JSON.parse(felem.args);

          if (typeof felemParsedArgs.placeholder != "undefined") {
            felemParsedArgs.placeholder = route.i18n.translate(felemParsedArgs.placeholder, route.lang);
          }

          if (typeof felemParsedArgs.value != "undefined" && felemParsedArgs.type == "submit") {
            felemParsedArgs.value = route.i18n.translate(felemParsedArgs.value, route.lang);
          }

          if (typeof felemParsedArgs.prelabel != "undefined") {
            felemParsedArgs.prelabel = route.i18n.translate(felemParsedArgs.prelabel, route.lang);
          }

          if (typeof felemParsedArgs.aplabel != "undefined") {
            felemParsedArgs.aplabel = route.i18n.translate(felemParsedArgs.aplabel, route.lang);
          }

          if (typeof felemParsedArgs.options != "undefined" && felemParsedArgs.options.translate) {
            var options = [];
            felemParsedArgs.options.values.map(function (option) {
              option = option.split("|");
              option[0] = route.i18n.translate(option[0], route.lang);
              option[1] = route.i18n.translate(option[1], route.lang);
              options.push(option[0] + "|" + option[1]);
            });
            felemParsedArgs.options.values = options;
          }

          var felemComponent = {
            react_element: felem.elem,
            args: felemParsedArgs
          };
          return parentComponent.react_nested.push(felemComponent);
        } else if (felem.form_element_id != null && typeof parent == "undefined") {
          parent = els.filter(el => el.id == felem.form_element_id);
          var childs = els.filter(el => el.id != felem.form_element_id && el.form_number == felem.form_number);

          if (parent.length > 0) {
            return formComponent.react_nested = this.resolveFormElements(route, formComponent, childs, parent);
          }
        }
      }.bind(this));
      return typeof parentComponent != "undefined" ? parentComponent : formComponent;
    }
  }

  setFormComponent() {
    var formArgs = JSON.parse(this.formData.element);
    var formComponent = {
      react_element: "form",
      args: {
        id: this.formData.name,
        key: this.formData.name,
        method: formArgs.method,
        async: Boolean(formArgs.async),
        className: formArgs.className,
        action: this.formData.action,
        enctype: formArgs.enctype,
        els: formArgs.els
      },
      react_nested: []
    };

    if (!Boolean(this.formData.number)) {
      return formComponent;
    } else {
      var forwardableFormContainer = {
        react_element: "div",
        number: this.formData.number,
        args: {
          id: formArgs.id + "-forwardable-form",
          key: formArgs.id + "-forwardable-form",
          className: "forwardable-form"
        },
        forms: [],
        react_nested: []
      };

      for (var i = 0; i <= this.formData.number; i++) {
        if (i == 0) {
          if (!formArgs.className.includes("current")) {
            forwardableFormContainer.forms.push(Object.assign({}, formComponent, {
              args: _objectSpread(_objectSpread({}, formComponent.args), {}, {
                className: formArgs.className + " current step-".concat(i + 1)
              })
            }, {
              number: i
            }));
          } else {
            forwardableFormContainer.forms.push(Object.assign({}, formComponent, {
              args: _objectSpread(_objectSpread({}, formComponent.args), {}, {
                className: formArgs.className + " step-".concat(i + 1)
              })
            }, {
              number: i
            }));
          }
        } else {
          forwardableFormContainer.forms.push(Object.assign({}, formComponent, {
            args: _objectSpread(_objectSpread({}, formComponent.args), {}, {
              className: formArgs.className + " step-".concat(i + 1)
            })
          }, {
            number: i
          }));
        }
      }

      return forwardableFormContainer;
    }
  }

}

exports.Form = Form;