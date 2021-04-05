"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _officeApp = require("../../../office-app.registry");

var _store = require("../../../redux/stores/store");

var _index = require("../../../../../../operations/modules/mandatory/i18n/services/index.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var HeaderElementForm = args => {
  var header_el = args.header_el;
  var [view, setView] = (0, _react.useState)([]);
  var Form = _officeApp.officeRegistry["form"];
  var [formControls, setForm] = (0, _react.useState)(undefined);

  var loadForm = () => {
    if (typeof formControls == "undefined") {
      var timer = setTimeout(function () {
        var form = document.getElementById("list-form-".concat(header_el.id));

        if (form != null && typeof formControls == "undefined") {
          formControls = /*#__PURE__*/_react.default.createElement(Form, {
            form: form,
            store: _store.store
          });
          setForm(formControls);
        } else {
          clearTimeout(timer);
        }
      }, 500);
    }
  };

  var inputStateChanged = e => {
    if (e.target.value.length > 0) {
      e.target.parentNode.previousSibling.classList.remove("invisible");
    } else {
      e.target.parentNode.previousSibling.classList.add("invisible");
    }
  };

  var changeTitle = e => {
    e.target.closest(".accordion-item").previousSibling.firstChild.firstChild.innerText = e.target.value;
    inputStateChanged(e);
  };

  view = /*#__PURE__*/_react.default.createElement("form", {
    id: "list-form-".concat(header_el.id),
    className: "col-12 row justify-content-center",
    onSubmit: e => args.submitItem(e, header_el),
    onLoad: typeof header_el.elem != "undefined" && header_el.elem == "a" ? loadForm() : undefined,
    key: "list-form-".concat(header_el.id)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-10 row flex-row-reverse"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    name: "ms",
    id: "ms",
    value: "route_service/search_route::search::none"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-4 form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    key: "prelabel-".concat(header_el.id),
    className: typeof header_el.name != "undefined" && header_el.name != null && header_el.name.length > 0 ? undefined : "invisible",
    htmlFor: "input-name-".concat(header_el.id)
  }, _index.i18n.translate("Name")), /*#__PURE__*/_react.default.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    name: "name",
    id: "input-name-".concat(header_el.id),
    className: "form-control form-input-text",
    onChange: e => inputStateChanged(e),
    placeholder: _index.i18n.translate("Name"),
    defaultValue: typeof header_el.name != "undefined" && header_el.name != null ? header_el.name : undefined
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-4 form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    key: "prelabel-".concat(header_el.id),
    className: typeof header_el.value != "undefined" && header_el.value != null && header_el.value.length > 0 ? undefined : "invisible",
    htmlFor: "input-title-".concat(header_el.id)
  }, _index.i18n.translate("Title")), /*#__PURE__*/_react.default.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    name: "value",
    id: "input-title-".concat(header_el.id),
    onChange: e => changeTitle(e),
    className: "form-control form-input-text",
    placeholder: _index.i18n.translate("Title"),
    defaultValue: typeof header_el.value != "undefined" && header_el.value != null ? header_el.value : undefined
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-4 form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    key: "prelabel-".concat(header_el.id),
    className: typeof header_el.elem != "undefined" && header_el.elem != null && header_el.elem.length > 0 ? undefined : "invisible",
    htmlFor: "input-element-".concat(header_el.id)
  }, _index.i18n.translate("Element")), /*#__PURE__*/_react.default.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    name: "elem",
    id: "input-element-".concat(header_el.id),
    onChange: e => inputStateChanged(e),
    className: "form-control form-input-text",
    placeholder: _index.i18n.translate("Element"),
    defaultValue: typeof header_el.elem != "undefined" && header_el.elem != null ? header_el.elem : undefined,
    readOnly: true,
    disabled: true
  }))), typeof header_el.elem != "undefined" && header_el.elem == "a" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    key: "prelabel-".concat(header_el.id),
    className: typeof header_el.uri != "undefined" && header_el.uri != null && header_el.uri.length > 0 ? undefined : "invisible",
    htmlFor: "input-uri-search-engine-".concat(header_el.id)
  }, _index.i18n.translate("Uri search engine")), /*#__PURE__*/_react.default.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "input-uri-search-engine-".concat(header_el.id),
    className: "form-control form-input-text has-dataset search-engine",
    onChange: e => inputStateChanged(e),
    placeholder: _index.i18n.translate("Name, url, or feature..."),
    defaultValue: typeof header_el.uri != "undefined" && header_el.uri != null ? header_el.uri : undefined,
    dataset: '{"search-engine": {"on" : ["keyup"], "method" : "post", "url" : "/administrate/route/remove/post", "renderOnLoad" : "true", "renderingTpl" : "headerRouteSelect",  "renderToId" : "selectLink"}}'
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    key: "prelabel-".concat(header_el.id),
    htmlFor: "selectLink"
  }, _index.i18n.translate("Select Uri")), /*#__PURE__*/_react.default.createElement("div", {
    id: "selectLink",
    className: "col row justify-content-center"
  }))) : undefined, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    key: "prelabel-".concat(header_el.id),
    htmlFor: "input-args-".concat(header_el.id)
  }, _index.i18n.translate("JSON Arguments")), /*#__PURE__*/_react.default.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/_react.default.createElement("textarea", {
    className: "form-control",
    id: "input-args-".concat(header_el.id),
    name: "args",
    defaultValue: typeof header_el.args != "undefined" && header_el.args != null ? header_el.args : undefined
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 form-group"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "submit",
    className: "btn btn-primary next"
  })))));
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, view, formControls);
};

var _default = HeaderElementForm;
exports.default = _default;