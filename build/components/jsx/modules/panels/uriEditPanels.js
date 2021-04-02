"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _index = require("../../../../operations/modules/mandatory/i18n/services/index.js");

var _officeApp = require("../office-app.registry");

var _store = require("../redux/stores/store");

var _superagent = _interopRequireDefault(require("superagent"));

var _selectComponentPanel = _interopRequireDefault(require("./selectComponentPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var UriEditPanels = args => {
  var formURI = "/administrate/form/request/post?fragment";
  var formName = "edit_route_form_form";
  var [view, setView] = (0, _react.useState)([]);
  var [selectedUri, changeSelectedUri] = (0, _react.useState)(false);
  var [formValidators, setFormValidators] = (0, _react.useState)([]);

  var timer = callback => {
    setTimeout(callback, 200);
  };

  var select = (args, id) => {
    _superagent.default.post(formURI).send({
      form_name: formName
    }).then(res => {
      changeSelectedUri(true);
      return new Promise((resolve, reject) => {
        setView( /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
          className: "col-12 form-group justify-content-start"
        }, /*#__PURE__*/_react.default.createElement("hr", {
          className: "separator"
        }), /*#__PURE__*/_react.default.createElement("a", {
          href: "#",
          className: "btn btn-secondary",
          onClick: () => args.searchEngine(Object.assign({}, {
            page: args.current
          }))
        }, _index.i18n.translate("Back"))), /*#__PURE__*/_react.default.createElement("div", {
          id: "edit-uri-form",
          className: "col-12 row",
          dangerouslySetInnerHTML: {
            __html: res.text
          }
        })));
        resolve(view);
      }).then(res => {
        var forms = Array.from(document.getElementById("edit-uri-form").getElementsByTagName("FORM"));
        var Form = _officeApp.officeRegistry["form"];
        var formData = args.datas.find(data => data.id == id); //Création d'un champ input avec l'id du formulaire à éditer

        var idInput = document.createElement("input");
        idInput.type = "hidden";
        idInput.name = "id"; //Récupération des valeurs et injection dans le formulaire

        forms.map((form, i) => {
          var elementToClick = [];
          Array.from(form.querySelectorAll("input, select")).map(input => {
            var foundData;
            foundData = formData[Object.keys(formData).find(f => {
              if (f != "id" && (input.name == f || input.name.indexOf(f) > -1)) {
                return true;
              } else if (input.name == f) {
                return true;
              }

              return false;
            })];

            if (typeof foundData != "undefined" && typeof foundData != "object" && foundData != null) {
              //Récupération en fonction du nom du champ
              if (input.type == "text") {
                input.value = foundData;

                if (input.value == "/") {
                  input.disabled = true;
                  form.querySelector("input[name='isExternal']").parentNode.parentNode.classList.add("hidden");
                }

                var theme;
                timer(function () {
                  theme = form.querySelector("select[name='theme']");

                  if (theme != null) {
                    theme.value = formData.theme;
                  } else {
                    clearTimeout(timer);
                  }
                });
              } else if (input.type == "checkbox" && Boolean(foundData)) {
                //Click après l'initialisation du formulaire
                elementToClick.push(input);
              } else {
                if (typeof formData.callback != "undefined") {
                  var method = form.querySelector("#method");

                  if (method != null) {
                    //Récupération au chargement
                    if (typeof formData.callback.callback != "undefined" && formData.callback.callback == "getContent") {
                      method.value = "get-page";

                      if (typeof formData.callback.content_id != "undefined" && formData.callback.content_id != null) {
                        var content_id;
                        var existing_data; //Chargement des données au chargement de l'input

                        timer(function () {
                          existing_data = form.querySelector("input[name='is-existing-data']");

                          if (existing_data != null) {
                            existing_data.click();
                          } else {
                            clearTimeout(timer);
                          }
                        });
                        timer(function () {
                          content_id = form.querySelector("input[name='contentid']");

                          if (content_id != null) {
                            content_id.value = formData.callback.content_id;
                          } else {
                            clearTimeout(timer);
                          }
                        });
                      }
                    } else if (typeof formData.callback.callback != "undefined" && (formData.callback.callback == "getForm" || formData.callback.callback == "validateForm")) {
                      if (formData.callback.callback == "getForm") {
                        method.value = "get-form";
                      } else if (formData.callback.callback == "validateForm") {
                        method.value = "post-callback";
                      }

                      if (typeof formData.callback.form_name != "undefined" && formData.callback.form_name != null) {
                        var form_name;

                        var _existing_data;

                        timer(function () {
                          _existing_data = form.querySelector("input[name='is-existing-data']");

                          if (_existing_data != null) {
                            _existing_data.click();
                          } else {
                            clearTimeout(timer);
                          }
                        }); //Chargement des données au chargement de l'input

                        timer(function () {
                          form_name = form.querySelector("input[name='contentid']");

                          if (form_name != null) {
                            form_name.value = formData.callback.form_name;
                          } else {
                            clearTimeout(timer);
                          }
                        });
                      }
                    } else if (typeof formData.callback.isFile != "undefined" && Boolean(formData.callback.isFile)) {
                      method.value = "get-file";
                      var filepath; //Chargement des données au chargement de l'input

                      timer(function () {
                        filepath = form.querySelector("input[name='path-to-file-and-filename']");

                        if (filepath != null) {
                          filepath.value = (typeof formData.callback.filepath != "undefined" ? formData.callback.filepath : "") + (typeof formData.callback.filename != "undefined" ? formData.callback.filename : "");
                        } else {
                          clearTimeout(timer);
                        }
                      });
                    }
                  }
                }
              }
            }
          });
          setFormValidators( /*#__PURE__*/_react.default.createElement(Form, {
            key: "form-control-".concat(i),
            form: form,
            store: _store.store
          }));

          if (elementToClick.length > 0) {
            elementToClick.map(el => {
              el.click();
            });
          }

          idInput.value = formData[Object.keys(formData).find(el => el == "id")];
        });
        forms[0].appendChild(idInput);
      });
    });
  };

  if (!selectedUri) {
    view = /*#__PURE__*/_react.default.createElement(_selectComponentPanel.default, {
      datas: args.datas,
      count: args.count,
      keys: ["title", "uri", "lastModifiedAt"],
      searchEngine: args.searchEngine,
      select: select,
      current: args.current
    });
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, view, formValidators);
};

var _default = UriEditPanels;
exports.default = _default;