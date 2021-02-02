"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _superagent = _interopRequireDefault(require("superagent"));

var _officeApp = require("../office-app.registry");

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
  }

  validateFormInputs(inputs, store) {
    var eventList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    inputs.map(function (input) {
      if (eventList != null) {
        eventList.map(e => input.el.addEventListener(e, () => {
          store.dispatch(input);
          var text = store.getState().validators.form.input;

          if (input.elgroup.nextSibling === null && typeof text != "undefined" && typeof text.errorLabel != "undefined") {
            this.createLabel(input.elgroup, text);
          } else if (input.elgroup.nextSibling !== null && typeof text != "undefined" && typeof text.errorLabel == "undefined") {
            input.elgroup.parentNode.removeChild(input.elgroup.nextSibling);
          } else if (input.elgroup.nextSibling !== null && typeof text != "undefined" && typeof text.errorLabel != "undefined") {
            input.elgroup.parentNode.removeChild(input.elgroup.nextSibling);
            this.createLabel(input.elgroup, text);
          }
        }));
      } else {
        store.dispatch(input);
        var text = store.getState().validators.form.input;

        if (input.elgroup.nextSibling === null && typeof text != "undefined" && typeof text.errorLabel != "undefined") {
          this.createLabel(input.elgroup, text);
        } else if (input.elgroup.nextSibling !== null && typeof text != "undefined" && typeof text.errorLabel == "undefined") {
          input.elgroup.parentNode.removeChild(input.elgroup.nextSibling);
        } else if (input.elgroup.nextSibling !== null && typeof text != "undefined" && typeof text.errorLabel != "undefined") {
          input.elgroup.parentNode.removeChild(input.elgroup.nextSibling);
          this.createLabel(input.elgroup, text);
        }
      }
    }.bind(this));
  }

  formControls(inputs, store) {
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

      ;
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
    var el = element.parentNode.appendChild(document.createElement("dl"));
    var dt = document.createElement("dt");
    dt.className = typeof className != "undefined" ? "label-hasError " + className : "label-hasError";
    el = el.appendChild(dt);

    if (typeof text.errorLabel != "undefined") {
      el.innerText = text.errorLabel;
    }
  }

  componentDidMount() {
    var form = this.state.form;
    var store = this.props.store;
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
        var popin_container = document.createElement("div");
        var popin = {
          id: "".concat(form.id, "-popin"),
          key: "".concat(form.id, "-popin"),
          className: "form-popin"
        };
        popin_container.id = "".concat(form.id, "-popin-container");
        form.firstChild.prepend(popin_container);
        var Popin = _officeApp.officeRegistry.popin;

        _reactDom.default.render( /*#__PURE__*/_react.default.createElement(Popin, {
          args: popin
        }), popin_container);

        e.preventDefault();

        _superagent.default.post(form.action).send(new FormData(form)).then(res => {
          var submit = form.querySelector('.submit');
          submit = submit.parentNode;

          if (submit.nextSibling !== null) {
            submit.parentNode.removeChild(submit.nextSibling);
          }

          if (res.body != null && typeof res.body == "object" && res.body.hasOwnProperty("current")) {
            form.classList.remove("current");
            document.querySelector(res.body.current).classList.add("current");
          }

          form.firstChild.removeChild(form.firstChild.firstChild);

          if (typeof res.body != "undefined" && res.body != null && typeof res.body.redirect != "undefined") {
            document.location.href = res.body.redirect;
          }
        }, err => {
          var submit = form.querySelector('.submit');
          submit = submit.parentNode;

          if (submit.nextSibling === null && typeof err.response.text != "undefined") {
            this.createLabel(submit, JSON.parse(err.response.text), "center");
          } else if (submit.nextSibling !== null) {
            submit.parentNode.removeChild(submit.nextSibling);
            this.createLabel(submit, JSON.parse(err.response.text), "center");
          }

          form.firstChild.removeChild(form.firstChild.firstChild);
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