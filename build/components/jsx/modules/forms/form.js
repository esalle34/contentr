"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _superagent = _interopRequireDefault(require("superagent"));

var _officeApp = require("../office-app.registry");

var _index = require("../../../../operations/modules/mandatory/i18n/services/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Form extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: props.form
    };
    this.validateFormInputs = this.validateFormInputs.bind(this);
    this.formControls = this.formControls.bind(this);
    this.createLabel = this.createLabel.bind(this);
    this.loadInvokables = this.loadInvokables.bind(this);
  }

  validateFormInputs(inputs, store) {
    var eventList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    inputs.map(function (input) {
      var className = input.el.classList;

      if (typeof className != "undefined") {
        if (className.value.includes("machine-name")) {
          var machineName = Array.from(className).find(el => el.indexOf("machine-name") > -1);
          var separator = machineName.split("::")[1];

          if (input.el.value.length > 0 && (input.elgroup.nextSibling == null || input.elgroup.nextSibling.tagName != "DL")) {
            this.createLabel(input.elgroup, _index.i18n.translate("Machine name") + " : " + input.el.value.replace(/\s/g, separator), "small");
          }
        }
      }

      if (eventList != null) {
        eventList.map(e => input.el.addEventListener(e, () => {
          store.dispatch(input);
          var text = store.getState().validators.form.input;

          if (input.elgroup.nextSibling === null && typeof text != "undefined" && typeof text.errorLabel != "undefined") {
            this.createLabel(input.elgroup, text, "label-hasError");
          } else if (input.elgroup.nextSibling !== null && typeof text != "undefined" && typeof text.errorLabel == "undefined") {
            input.elgroup.parentNode.removeChild(input.elgroup.nextSibling);

            if (typeof className != "undefined") {
              if (className.value.includes("machine-name")) {
                var _machineName = Array.from(className).find(el => el.indexOf("machine-name") > -1);

                var _separator = _machineName.split("::")[1];

                this.createLabel(input.elgroup, _index.i18n.translate("Machine name") + " : " + input.el.value.replace(/\s/g, _separator), "small");
              }
            }
          } else if (input.elgroup.nextSibling !== null && typeof text != "undefined" && typeof text.errorLabel != "undefined") {
            input.elgroup.parentNode.removeChild(input.elgroup.nextSibling);
            this.createLabel(input.elgroup, text, "label-hasError");
          }
        }));
      } else {
        store.dispatch(input);
        var text = store.getState().validators.form.input;

        if (input.elgroup.nextSibling === null && typeof text != "undefined" && typeof text.errorLabel != "undefined") {
          this.createLabel(input.elgroup, text, "label-hasError");
        } else if (input.elgroup.nextSibling !== null && typeof text != "undefined" && typeof text.errorLabel == "undefined") {
          input.elgroup.parentNode.removeChild(input.elgroup.nextSibling);
        } else if (input.elgroup.nextSibling !== null && typeof text != "undefined" && typeof text.errorLabel != "undefined") {
          input.elgroup.parentNode.removeChild(input.elgroup.nextSibling);
          this.createLabel(input.elgroup, text, "label-hasError");
        }
      }
    }.bind(this));
  }

  formControls(inputs, store) {
    inputs = Array.isArray(inputs) ? inputs : [inputs];
    inputs.map(function (input) {
      var visibility_toggle = input.elgroup.querySelector(".toggle-visibility");

      if (visibility_toggle != null) {
        visibility_toggle.onclick = e => {
          store.dispatch({
            type: "TOGGLE_INPUT_VISIBILITY",
            input: input.el
          });
          input.el.setAttribute("type", store.getState().formControls.input_type);
        };
      }

      var country_code = input.elgroup.querySelector(".countrycode");

      if (country_code != null) {
        store.dispatch({
          type: "GET_DEFAULT_COUNTRY",
          input: input.el
        });
      }

      ;
      var file = input.elgroup.querySelector(".file");

      if (file != null) {
        file.onchange = e => {
          store.dispatch({
            type: "CHANGE_LABEL_TEXT",
            input: input.el
          });
        };
      }

      var is_mutator_checkbox = input.elgroup.querySelector(".is-mutator-checkbox");

      if (is_mutator_checkbox != null) {
        if (is_mutator_checkbox.classList.contains("default_unchecked") && is_mutator_checkbox.checked || is_mutator_checkbox.classList.contains("default_checked") && !is_mutator_checkbox.checked) {
          is_mutator_checkbox.checked = !is_mutator_checkbox.checked;
        }

        is_mutator_checkbox.onclick = e => {
          store.dispatch({
            type: "IS_MUTATOR_CHECKBOX",
            input: input.el
          });
          this.validateFormInputs(inputs, store, ['keyup', 'keydown', 'blur']);
        };
      }

      ; //Ajouter des nouvelles dataset ici:

      var has_dataset = input.elgroup.querySelector(".has-dataset");

      if (has_dataset != null) {
        if (has_dataset.classList.contains("checkbox-creator") && has_dataset.classList.contains("input-creator")) {
          var parsedDataSet = JSON.parse(has_dataset.getAttribute("dataset"));
          var val = has_dataset.value.split("-")[1];

          if (parsedDataSet["checkbox-creator"]["on-values"].includes(val)) {
            store.dispatch({
              type: "CHECKBOX_CREATOR",
              input: input.el
            });
            if (store.getState().formControls.input != null) this.formControls(store.getState().formControls.input, store);
          } else if (parsedDataSet["input-creator"]["on-values"].includes(val)) {
            store.dispatch({
              type: "INPUT_CREATOR",
              input: input.el
            });
            if (store.getState().formControls.input != null) this.formControls(store.getState().formControls.input, store);
          }

          has_dataset.onchange = e => {
            val = e.target.value.split("-")[1];

            if (parsedDataSet["checkbox-creator"]["on-values"].includes(val)) {
              store.dispatch({
                type: "CHECKBOX_CREATOR",
                input: input.el
              });
              if (store.getState().formControls.input != null) this.formControls(store.getState().formControls.input, store);
            } else if (parsedDataSet["input-creator"]["on-values"].includes(val)) {
              store.dispatch({
                type: "INPUT_CREATOR",
                input: input.el
              });
              if (store.getState().formControls.input != null) this.formControls(store.getState().formControls.input, store);
            }
          };
        } else if (has_dataset.classList.contains("checkbox-creator")) {
          store.dispatch({
            type: "CHECKBOX_CREATOR",
            input: input.el
          });
          if (store.getState().formControls.input != null) this.formControls(store.getState().formControls.input, store);

          has_dataset.onchange = e => {
            store.dispatch({
              type: "CHECKBOX_CREATOR",
              input: input.el
            });
            if (store.getState().formControls.input != null) this.formControls(store.getState().formControls.input, store);
          };
        } else if (has_dataset.classList.contains("input-creator")) {
          if (has_dataset.type == "checkbox") has_dataset.onclick = e => {
            store.dispatch({
              type: "INPUT_CREATOR",
              input: input.el
            });
            if (store.getState().formControls.input != null) this.formControls(store.getState().formControls.input, store);
          };
        }

        if (has_dataset.classList.contains("search-engine")) {
          var _parsedDataSet = JSON.parse(has_dataset.getAttribute("dataset"));

          var ms = has_dataset.closest("form").querySelector("#ms");
          var RenderingTpl = _officeApp.officeRegistry[_parsedDataSet["search-engine"]['renderingTpl']];
          var renderTo;
          var searchMs = ms.value.split("::");
          searchMs[1] = "search";
          searchMs = searchMs.join("::");

          if (typeof _parsedDataSet["search-engine"].renderToId != "undefined") {
            renderTo = has_dataset.closest("form").querySelector("#" + _parsedDataSet["search-engine"].renderToId);
          }

          var keyword = "send";

          if (_parsedDataSet["search-engine"]["method"] == "get") {
            keyword = "query";
          }

          var searchEngine = args => _superagent.default[_parsedDataSet["search-engine"]["method"]](_parsedDataSet["search-engine"]["url"])[keyword]({
            value: "".concat(has_dataset.value),
            ms: searchMs,
            page: typeof args != "undefined" && typeof args.page != "undefined" ? args.page : 1
          }).then((resolve, reject) => {
            if (typeof renderTo != "undefined" && renderTo.firstChild != null && renderTo.firstChild.firstChild.classList.contains("popin")) {
              this.removeLoader(renderTo, renderTo.firstChild);
            }

            _reactDom.default.unmountComponentAtNode(renderTo);

            _reactDom.default.render( /*#__PURE__*/_react.default.createElement(RenderingTpl, {
              datas: Array.isArray(resolve.body) ? resolve.body[0] : resolve.body,
              count: Array.isArray(resolve.body) ? typeof resolve.body[1] != "undefined" ? resolve.body[1].count : undefined : undefined,
              searchEngine: searchEngine,
              current: typeof args != "undefined" && typeof args.page != "undefined" ? args.page : 1
            }), renderTo);
          }).catch(error => {
            if (typeof renderTo != "undefined" && renderTo.firstChild != null && renderTo.firstChild.firstChild.classList.contains("popin")) {
              this.removeLoader(renderTo, renderTo.firstChild);
            }

            if (error.status == 404) {
              this.createLabel(renderTo, _index.i18n.translate("Nothing was found"), "label-hasError");
            }

            if (typeof error.response != "undefined" && typeof error.response.body != "undefined" && error.response.body != null && typeof error.response.body.redirect != "undefined") {
              return document.location.href = error.response.body.redirect;
            }
          });

          if (_parsedDataSet["search-engine"].renderOnLoad) {
            if (typeof renderTo != "undefined" && renderTo.firstChild == null) {
              this.addLoader(renderTo, "search-engine-popin", true);
              searchEngine();
            }
          }

          var timer;

          _parsedDataSet["search-engine"]["on"].map(e => input.el.addEventListener(e, () => {
            if (has_dataset.value.length > 2 || has_dataset.value.length == 0) {
              if (renderTo.parentNode.lastChild.tagName == "DL") {
                renderTo.parentNode.removeChild(renderTo.parentNode.childNodes[renderTo.parentNode.childNodes.length - 1]);
              }

              if (typeof renderTo != "undefined" && renderTo.firstChild != null && !renderTo.firstChild.firstChild.classList.contains("popin") || renderTo.firstChild == null) {
                this.addLoader(renderTo, "search-engine-popin", true);
              }

              clearTimeout(timer);
              timer = setTimeout(function () {
                searchEngine();
              }, 1000);
            }
          }));
        }
      }

      var back = input.elgroup.querySelector(".form-back");

      if (back != null) {
        back.onclick = e => {
          var forwardableForm = back.parentNode;

          while (typeof forwardableForm != "undefined" && !forwardableForm.classList.contains("forwardable-form")) {
            forwardableForm = forwardableForm.parentNode;
          }

          var currentPartForm = forwardableForm.querySelector('.current');
          currentPartForm.previousSibling.classList.add("current");
          currentPartForm.classList.remove("current");
        };
      }

      var progress = input.elgroup.querySelector(".isProgressBar");

      if (progress != null) {
        var ProgressBar = _officeApp.officeRegistry.progressBar;

        _reactDom.default.render( /*#__PURE__*/_react.default.createElement(ProgressBar, {
          className: progress.className,
          value: progress.value
        }), progress.parentNode);
      }
    }.bind(this));
  }

  createLabel(element, text) {
    var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var groupClassName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
    var el = element.parentNode.appendChild(document.createElement("dl"));

    if (typeof groupClassName != "undefined") {
      el.classList = groupClassName;
    }

    var dt = document.createElement("dt");

    if (typeof className != "undefined") {
      dt.className = className;
    }

    el = el.appendChild(dt);

    if (typeof text != "undefined") {
      if (typeof text.errorLabel != "undefined") {
        el.innerText = text.errorLabel;
      } else {
        el.innerText = text;
      }
    }
  }

  loadInvokables() {
    var invokeTheme = this.state.form.querySelector("#invoke-theme");
    var invokeRoles = this.state.form.querySelector("#invoke-roles");

    if (invokeTheme != null) {
      var InvokeTheme = _officeApp.officeRegistry.invokeTheme;

      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(InvokeTheme, null), invokeTheme);
    }

    if (invokeRoles != null) {
      var InvokeRoles = _officeApp.officeRegistry.invokeRoles;

      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(InvokeRoles, {
        roles: JSON.parse(invokeRoles.getAttribute("dataset")).getRoles
      }), invokeRoles);
    }
  }

  addLoader(container, className) {
    var removeChildren = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    //summon loader
    var popin_container = document.createElement("div");
    var popin = {
      id: "".concat(container.id, "-popin"),
      key: "".concat(container.id, "-popin"),
      className: "".concat(className)
    };
    popin_container.id = "".concat(container.id, "-popin-container");

    if (removeChildren) {
      _reactDom.default.unmountComponentAtNode(container);
    }

    container.prepend(popin_container);
    var Popin = _officeApp.officeRegistry.popin;

    _reactDom.default.render( /*#__PURE__*/_react.default.createElement(Popin, {
      args: popin
    }), popin_container);
  }

  removeLoader(parent, loader) {
    parent.removeChild(loader);
  }

  componentDidMount() {
    var form = this.state.form;
    var store = this.props.store;
    this.loadInvokables();
    form.classList.add("loaded-form");
    store.dispatch({
      type: "LOAD_INPUTS",
      form: form
    });
    this.setState({
      form: store.getState().validators.form
    });
    var inputs = store.getState().validators.inputs;
    this.formControls(inputs, store);
    this.validateFormInputs(inputs, store, ['keyup', 'keydown', 'blur']);

    form.onsubmit = e => {
      store.dispatch({
        type: "LOAD_INPUTS",
        form: form
      });
      var inputs = store.getState().validators.inputs;
      this.validateFormInputs(inputs, store);
      store.dispatch({
        type: "VALIDATE_FORM",
        form: form,
        inputs: inputs
      });

      if (!form.isValid) {
        form.classList.add("form-hasError");
        return false;
      } else if (form.classList.contains("form-hasError")) {
        form.classList.remove("form-hasError");
      }

      if (form.classList.contains("async")) {
        this.addLoader(form.firstChild, "form-popin");
        e.preventDefault();

        _superagent.default.post(form.action).send(new FormData(form)).then(res => {
          var submit = form.querySelector('.submit');
          submit = submit.parentNode;

          if (form.lastChild.tagName == "DL") {
            form.lastChild.remove();
          }

          if (res.body != null && typeof res.body == "object") {
            if (res.body.hasOwnProperty("current")) {
              form.classList.remove("current");
              var nextForm = document.querySelector(res.body.current);
              nextForm.classList.add("current");

              if (res.body.hasOwnProperty("fetchedData")) {
                if (res.body.fetchedData.hasOwnProperty("addInput")) {
                  for (var [key, value] of Object.entries(res.body.fetchedData.addInput)) {
                    var newInput = document.createElement("input");
                    newInput.type = "hidden";
                    newInput.value = value;
                    newInput.name = key;
                    nextForm.firstChild.appendChild(newInput);
                  }
                }
              }
            }
          }

          if (typeof res.body != "undefined" && res.body != null) {
            if (typeof res.body.redirect != "undefined") {
              document.location.href = res.body.redirect;
            } else if (typeof res.body.message != "undefined" && res.body.message == "reload-file-browser") {
              this.props.displayFiles(res.body.path);
            }
          }

          this.removeLoader(form.firstChild, form.firstChild.firstChild);
        }, err => {
          if (typeof err.response.body != "undefined" && err.response.body != null && typeof err.response.body.redirect != "undefined") {
            return document.location.href = err.response.body.redirect;
          }

          if (form.firstChild.lastChild.tagName != "DL") {
            this.createLabel(form.firstChild.lastChild, JSON.parse(err.response.text), "label-hasError center", "row col justify-content-center");
          } else if (form.firstChild.lastChild.tagName == "DL") {
            form.firstChild.lastChild.remove();
            this.createLabel(form.firstChild.lastChild, JSON.parse(err.response.text), "label-hasError center", "row col justify-content-center");
          }

          this.removeLoader(form.firstChild, form.firstChild.firstChild);
        });
      }
    };
  }

  render() {
    return null;
  }

}

var _default = Form;
exports.default = _default;