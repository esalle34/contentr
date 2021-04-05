"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _selectComponentPanel = _interopRequireDefault(require("./selectComponentPanel"));

var _superagent = _interopRequireDefault(require("superagent"));

var _officeApp = require("../office-app.registry");

var _store = require("../redux/stores/store");

var _index = require("../../../../operations/modules/mandatory/i18n/services/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var CreateContent = args => {
  var [formView, setFormView] = (0, _react.useState)(null);
  var [formValidators, setFormValidators] = (0, _react.useState)(undefined);
  var view = null;
  var formURI = "/administrate/form/request/post?fragment";
  var formId = "create_content_form";

  var select = (args, id) => {
    _superagent.default.post(formURI).send({
      content_type_id: id
    }).then(res => {
      return new Promise((resolve, reject) => {
        setFormView( /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
          className: "row col-12",
          dangerouslySetInnerHTML: {
            __html: res.text
          }
        })));
        resolve(view);
      }).then(() => {
        var form = document.getElementById(formId).getElementsByTagName("FORM")[0];
        var form_id = document.createElement("input");
        form_id.value = id;
        form_id.name = "form_id";
        form_id.type = "hidden";
        form.firstChild.firstChild.appendChild(form_id);
        var Form = _officeApp.officeRegistry["form"];
        setFormValidators( /*#__PURE__*/_react.default.createElement(Form, {
          key: "form-control",
          form: form,
          store: _store.store
        }));
      });
    }, rej => {});
  };

  if (formView == null) {
    view = /*#__PURE__*/_react.default.createElement(_selectComponentPanel.default, {
      datas: args.datas,
      count: args.count,
      searchEngine: args.searchEngine,
      select: select,
      keys: ["machine_name", "template_name"],
      current: args.current
    });
  } else {
    view = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, formView, formValidators);
  }

  return view;
};

var _default = CreateContent;
exports.default = _default;