"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _services = require("../../../../operations/modules/mandatory/i18n/services");

var _inputContainerElement = _interopRequireDefault(require("./elements/inputContainerElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var InvokeFormBuilder = args => {
  var [view, setView] = (0, _react.useState)([]);
  var selectedValue = "input";
  var [inputs, setInputs] = (0, _react.useState)([]);
  var draggedEl;

  var createInput = e => {
    var newInput;

    switch (selectedValue) {
      case "input":
        newInput = Object.assign({}, {
          id: inputs.length + 1,
          el: "input",
          type: "text",
          labelbefore: true,
          isOpened: true,
          isEditable: true
        });
        setInputs(inputs => [...inputs, newInput]);
        break;

      case "select":
        newInput = Object.assign({}, {
          id: inputs.length + 1,
          el: "select",
          labelbefore: true,
          isOpened: true,
          isEditable: true
        });
        setInputs(inputs => [...inputs, newInput]);
        break;

      case "ckeditor":
        newInput = Object.assign({}, {
          id: inputs.length + 1,
          el: "ckEditor",
          labelbefore: true,
          isOpened: true,
          isEditable: true
        });
        setInputs(inputs => [...inputs, newInput]);
        break;
    }
  };

  var toggleVisibility = e => {
    var newInput;

    if (e.target.closest("[class^='actions']") == null) {
      newInput = inputs.find(el => el.id == e.target.closest(".accordion-control").id.split("-")[1]);
    }

    if (typeof newInput != "undefined") {
      var index = inputs.findIndex(el => el.id == e.target.closest(".accordion-control").id.split("-")[1]);
      newInput = Object.assign({}, newInput, {
        isOpened: !newInput.isOpened
      });
      var newInputs = inputs;
      newInputs.splice(index, 1, newInput);
      setInputs(inputs => [...newInputs]);
    }
  };

  var dragStart = e => {
    draggedEl = e.target.closest("a.draggable");
  }; //dragOver différent du header, pas de gestion des éléments nichés nécéssaire


  var dragOver = e => {
    var currentEl = e.target;
    var currentElId = currentEl.id.split("-")[1];

    if (typeof draggedEl != "undefined" && currentElId != draggedEl.id.split("-")[1]) {
      var currentElTag = currentEl.id.split("-")[0];
      var draggedElId = draggedEl.id.split("-")[1];
      var tempInputs = inputs;
      var currentIndex = tempInputs.findIndex(el => el.id == currentElId);
      var currentValue = tempInputs.find(el => el.id == currentElId);
      var draggedIndex = tempInputs.findIndex(el => el.id == draggedElId);
      var draggedValue = tempInputs.find(el => el.id == draggedElId);

      if (currentElTag.includes("before")) {
        tempInputs.splice(draggedIndex, 1);
        tempInputs.splice(currentIndex, 1, currentValue);
        tempInputs.splice(currentIndex, 0, draggedValue);
      } else if (currentElTag.includes("after")) {
        tempInputs.splice(draggedIndex, 1);
        tempInputs.splice(currentIndex + 1, 0, draggedValue);
      }

      var newInputs = [];
      tempInputs.map((input, index) => {
        newInputs.push(Object.assign({}, input, {
          id: index + 1
        }));
      });
      e.target.closest("form").reset();
      setInputs(inputs => [...newInputs]);
    }
  };

  var changePosition = (e, direction) => {
    var tempInputs = inputs;
    var currentElId = e.target.id.split("-")[1];
    var currentIndex = tempInputs.findIndex(el => el.id == parseInt(currentElId));
    var currentValue = tempInputs[currentIndex];
    currentIndex = parseInt(currentIndex);

    if (direction == "up") {
      var upperIndex = tempInputs.findIndex(el => el.id == parseInt(currentElId) - 1);

      if (upperIndex != -1) {
        tempInputs.splice(currentIndex, 1);
        tempInputs.splice(currentIndex - 1, 0, currentValue);
      }
    } else if (direction == "down") {
      var bottomIndex = tempInputs.findIndex(el => el.id == parseInt(currentElId) + 1);

      if (bottomIndex != -1) {
        tempInputs.splice(currentIndex, 1);
        tempInputs.splice(bottomIndex, 0, currentValue);
      }
    }

    var newInputs = [];
    tempInputs.map((input, index) => {
      newInputs.push(Object.assign({}, input, {
        id: index + 1
      }));
    });
    e.target.closest("form").reset();
    setInputs(inputs => [...newInputs]);
  };

  var removeInput = e => {
    var tempInputs = inputs;
    var currentElId = e.target.id.split("-")[1];
    var currentIndex = tempInputs.findIndex(el => el.id == currentElId);
    tempInputs.splice(parseInt(currentIndex), 1);
    var newInputs = [];
    tempInputs.map((input, index) => {
      newInputs.push(Object.assign({}, input, {
        id: index + 1
      }));
    });
    setInputs(inputs => [...newInputs]);
  };

  var inputStateChanged = function inputStateChanged(e, inputName, newInput) {
    var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    submitItem(e, newInput = Object.assign({}, newInput, {
      [inputName]: e.target.value
    }));

    if (type != "checkbox") {
      if (e.target.value.length > 0) {
        e.target.parentNode.previousSibling.classList.remove("invisible");
      } else {
        e.target.parentNode.previousSibling.classList.add("invisible");
      }
    }
  };

  var submitItem = (e, input) => {
    var tempInputs = inputs;
    var index = tempInputs.findIndex(el => el.id == input.id);
    tempInputs.splice(index, 1, input);
    setInputs(inputs => [...tempInputs]);
  };

  var buildHtml = () => {
    if (inputs.length > 0) {
      var newView = [];
      inputs.map(newInput => {
        newView.push( /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
          key: "input-el-".concat(newInput.id)
        }, newInput.id == 1 ? /*#__PURE__*/_react.default.createElement("hr", {
          key: "hrbefore-".concat(newInput.id),
          onDragOver: e => dragOver(e),
          id: "hrbefore-".concat(newInput.id)
        }) : undefined, /*#__PURE__*/_react.default.createElement("a", {
          key: "link-".concat(newInput.id),
          id: "link-".concat(newInput.id),
          onTouchStart: e => dragStart(e),
          onDragStart: e => dragStart(e),
          className: "clickable draggable accordion-control",
          onClick: e => toggleVisibility(e),
          draggable: "true"
        }, /*#__PURE__*/_react.default.createElement("h3", {
          key: "title-".concat(newInput.id),
          className: "title-accordion ".concat(newInput.isOpened ? "opened" : "")
        }, /*#__PURE__*/_react.default.createElement("span", {
          key: "span-".concat(newInput.id)
        }, typeof newInput.name != "undefined" ? newInput.name.includes("ckeditor-") ? newInput.name.substring(9) : newInput.name : _services.i18n.translate(newInput.el.charAt(0).toUpperCase() + newInput.el.substring(1))), /*#__PURE__*/_react.default.createElement("div", {
          key: "actions-".concat(newInput.id),
          className: "next"
        }, /*#__PURE__*/_react.default.createElement("div", {
          key: "position-".concat(newInput.id),
          className: "actions-position"
        }, /*#__PURE__*/_react.default.createElement("button", {
          key: "position-btn-up-".concat(newInput.id),
          id: "btnup-".concat(newInput.id),
          type: "button",
          onClick: e => {
            changePosition(e, "up");
          },
          className: "btn btn-secondary-revert upper-level"
        }, /*#__PURE__*/_react.default.createElement("i", {
          key: "position-icon-up-".concat(newInput.id),
          id: "iconup-".concat(newInput.id),
          className: "fa-solid fa-angle-up",
          onClick: e => {
            changePosition(e, "up");
          }
        })), /*#__PURE__*/_react.default.createElement("button", {
          key: "position-icon-bottom-".concat(newInput.id),
          id: "btndown-".concat(newInput.id),
          type: "button",
          onClick: e => {
            changePosition(e, "down");
          },
          className: "btn btn-secondary-revert next-level"
        }, /*#__PURE__*/_react.default.createElement("i", {
          key: "position-icon-bottom-".concat(newInput.id),
          id: "icondown-".concat(newInput.id),
          className: "fa-solid fa-angle-down",
          onClick: e => {
            changePosition(e, "down");
          }
        }))), /*#__PURE__*/_react.default.createElement("div", {
          key: "delete-".concat(newInput.id),
          className: "actions-delete"
        }, /*#__PURE__*/_react.default.createElement("button", {
          key: "delete-btn-".concat(newInput.id),
          type: "button",
          id: "delete-".concat(newInput.id),
          onClick: e => {
            removeInput(e);
          },
          className: "btn btn-secondary-revert edit-item"
        }, /*#__PURE__*/_react.default.createElement("i", {
          key: "delete-icon-".concat(newInput.id),
          className: "fa-solid fa-trash-alt",
          id: "delete-".concat(newInput.id),
          onClick: e => {
            removeInput(e);
          }
        })))))), /*#__PURE__*/_react.default.createElement(_inputContainerElement.default, {
          el: newInput.el,
          properties: newInput,
          inputStateChanged: inputStateChanged
        }), /*#__PURE__*/_react.default.createElement("hr", {
          key: "hrafter-".concat(newInput.id),
          onDragOver: e => dragOver(e),
          id: "hrafter-".concat(newInput.id)
        })));
      });
      view = newView;
    }
  };

  var changeValue = e => {
    selectedValue = e.target.value;
  };

  buildHtml();

  var createElement = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 form-group"
  }, /*#__PURE__*/_react.default.createElement("select", {
    id: "elem-select",
    className: "form-control",
    defaultValue: "input",
    onChange: e => changeValue(e)
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "input"
  }, _services.i18n.translate("Input")), /*#__PURE__*/_react.default.createElement("option", {
    value: "select"
  }, _services.i18n.translate("Select")), /*#__PURE__*/_react.default.createElement("option", {
    value: "ckeditor"
  }, _services.i18n.translate("Ckeditor")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 form-group"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "add-new",
    className: "btn btn-secondary next",
    onClick: e => createInput(e)
  }, _services.i18n.translate("Add New")))), /*#__PURE__*/_react.default.createElement("div", {
    id: "new-elements",
    className: "col-12 row responsive-table"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "col nested-list"
  }, view)));

  return createElement;
};

var _default = InvokeFormBuilder;
exports.default = _default;