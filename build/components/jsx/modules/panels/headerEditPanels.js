"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _selectComponentPanel = _interopRequireDefault(require("./selectComponentPanel"));

var _superagent = _interopRequireDefault(require("superagent"));

var _index = require("../../../../operations/modules/mandatory/i18n/services/index.js");

var _headerAccordionElement = _interopRequireDefault(require("./elements/headerAccordionElement"));

var _headerAccordionEditableElement = _interopRequireDefault(require("./elements/headerAccordionEditableElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var HeaderEditPanels = args => {
  var formURI = "/administrate/form/request/post?fragment";
  var formName = "manage_header_form_form";
  var headerURI = "/administrate/header/manage/post";
  var submitHeaderMS = "header_service/manage_header::submit::none";
  var [view, setView] = (0, _react.useState)([]);
  var [selectedHeader, isSelectedHeader] = (0, _react.useState)(false);
  var headerElsList;
  var header_id;
  var structuredHeaderElsList;
  var originalHeaderElsList;
  var lowestId;
  var targetEl = null;
  var draggedEl = null;

  var dragOver = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (e) {
      targetEl = e.target;

      if (draggedEl != null && targetEl.getAttribute("id") != null && (targetEl.getAttribute("id").includes("item") || targetEl.getAttribute("id").includes("hr"))) {
        var newList = [];
        var splicedEl;
        var targetElId = targetEl.getAttribute("id").split("-")[1];
        var draggedElId = draggedEl.getAttribute("id").split("-")[1];
        headerElsList.body.map((el, index) => {
          if (typeof el != "undefined") {
            if (el.id == draggedElId) {
              if (typeof targetEl.dataset.header_element_id != "undefined" && targetEl.dataset.header_element_id != null) {
                el.header_element_id = targetEl.dataset.header_element_id;
                el.header_element_name = typeof headerElsList.body.find(subel => el.header_element_id == subel.id) != "undefined" ? headerElsList.body.find(subel => el.header_element_id == subel.id).name : null;
              } else if (targetEl.id.includes("item") && draggedElId != targetElId) {
                el.header_element_id = targetElId;
                el.header_element_name = typeof headerElsList.body.find(subel => el.header_element_id == subel.id) != "undefined" ? headerElsList.body.find(subel => el.header_element_id == subel.id).name : null;
              } else {
                el.header_element_id = null;
                el.header_element_name = null;
              }

              splicedEl = el;
            } else {
              newList.push(el);
            }
          }
        });
        targetElId = targetEl.id.includes("item") ? parseInt(targetElId) : targetEl.id.includes("before") ? parseInt(targetElId) : parseInt(targetElId) + 1;
        newList.splice(headerElsList.body.findIndex(el => el.id == targetElId), 0, splicedEl);
        headerElsList = Object.assign({}, headerElsList, {
          body: newList
        });
        yield setItemsList();
      }
    });

    return function dragOver(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var dragStart = e => {
    if (e.target.closest(".accordion-control").nextSibling.getAttribute("order") != null) {
      draggedEl = e.target.closest(".accordion-control").nextSibling;
    } else if (e.target.closest(".accordion-control").nextSibling.closest("[draggable]") != null) {
      draggedEl = e.target.closest(".accordion-control").nextSibling.closest("[draggable]");
    } else {
      draggedEl = e.target.closest(".accordion-control").nextSibling.firstChild;
    }
  };

  var toggleVisibility = (e, header_el) => {
    e.preventDefault();

    if (e.target.tagName != "BUTTON") {
      var classList = Array.from(e.target.classList);
      classList.includes("opened") ? e.target.classList.remove("opened") : e.target.classList.add("opened");
      classList.includes("opened") ? e.target.closest(".accordion-control").nextSibling.classList.remove("opened") : e.target.closest(".accordion-control").nextSibling.classList.add("opened");
      classList = Array.from(e.target.classList);
      header_el = Object.assign({}, header_el, {
        isOpened: classList.includes("opened") ? true : false
      });

      if (typeof headerElsList != "undefined") {
        headerElsList.body.splice(headerElsList.body.findIndex(el => el.id == header_el.id), 1, header_el);
      }
    }
  };

  var createElement = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (e) {
      if (e.target.tagName == "BUTTON" || e.target.tagName == "I") {
        var plus;

        if (e.target.classList.contains("add-element")) {
          plus = e.target;
        } else {
          plus = e.target.parentNode;
        }

        var createElementHTML = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
          className: "form-group"
        }, /*#__PURE__*/_react.default.createElement("select", {
          id: "elem-select",
          className: "form-control",
          defaultValue: "a"
        }, /*#__PURE__*/_react.default.createElement("option", {
          value: "dropdown"
        }, _index.i18n.translate("Dropdown")), /*#__PURE__*/_react.default.createElement("option", {
          value: "a"
        }, _index.i18n.translate("Route")), /*#__PURE__*/_react.default.createElement("option", {
          value: "ul"
        }, _index.i18n.translate("List")), /*#__PURE__*/_react.default.createElement("option", {
          value: "span"
        }, _index.i18n.translate("Span")))), /*#__PURE__*/_react.default.createElement("div", {
          className: "input-group"
        }, /*#__PURE__*/_react.default.createElement("div", {
          id: "add-new",
          className: "btn btn-secondary",
          onClick: e => createElement(e)
        }, _index.i18n.translate("Add New"))), /*#__PURE__*/_react.default.createElement("div", {
          id: "new-elements"
        }));

        if (plus.parentNode.nextSibling.firstChild.id.includes("add-element")) {
          _reactDom.default.render(createElementHTML, plus.parentNode.nextSibling.firstChild);
        }
      } else {
        var newList = headerElsList.body;

        if (newList.length > 0) {
          newList.unshift({
            id: Math.max.apply(Math, newList.map(function (subel) {
              return subel.id;
            })) + 1,
            header_element_id: null,
            header_element_name: null,
            name: null,
            value: null,
            args: null,
            elem: e.target.parentNode.previousSibling.firstChild.value,
            isOpened: true,
            isEditable: true
          });
        } else {
          newList.push({
            id: 0,
            header_element_id: null,
            header_element_name: null,
            name: null,
            value: null,
            args: null,
            elem: e.target.parentNode.previousSibling.firstChild.value,
            isOpened: true,
            isEditable: true
          });
        }

        yield setItemsList();
      }
    });

    return function createElement(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var changePosition = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(function* (e, direction) {
      e.preventDefault();
      e.stopPropagation();
      var touchedEl = e.target.closest(".accordion-control").nextSibling;
      var touchedElId = parseInt(touchedEl.id.split("-")[1]);
      var els = Array.from(touchedEl.closest("ul").children).filter(e => e.id.includes("item"));
      var targetEl;

      if (direction == "up") {
        var targetIndex = els.findIndex(targetEl => parseInt(targetEl.id.split("-")[1]) == touchedElId && targetEl.header_element_id == touchedEl.header_element_id) - 1;

        if (targetIndex >= 0) {
          targetEl = els[targetIndex];
        }
      } else {
        var _targetIndex = els.findIndex(targetEl => parseInt(targetEl.id.split("-")[1]) == touchedElId && targetEl.header_element_id == touchedEl.header_element_id) + 1;

        if (_targetIndex >= 0) {
          targetEl = els[_targetIndex];
        }
      }

      var newList = [];
      var splicedEl;

      if (typeof targetEl != "undefined") {
        var targetElId = parseInt(targetEl.id.split("-")[1]);
        yield headerElsList.body.map((el, index) => {
          if (el.id == touchedElId) {
            splicedEl = Object.assign({}, el, {
              id: targetElId
            });
          } else if (el.id == targetElId) {
            targetEl = Object.assign({}, el, {
              id: touchedElId
            });
          } else if (el.header_element_id == touchedElId) {
            el.header_element_id = targetElId;
            newList.push(el);
          } else if (el.header_element_id == targetElId) {
            el.header_element_id = touchedElId;
            newList.push(el);
          } else {
            newList.push(el);
          }
        });
        newList.splice(touchedElId - lowestId, 0, targetEl);
        newList.splice(targetElId - lowestId, 0, splicedEl);

        if (splicedEl != targetEl) {
          headerElsList = Object.assign({}, headerElsList, {
            body: newList
          });
          yield setItemsList();
        }
      }
    });

    return function changePosition(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  var changeLevel = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(function* (e, level) {
      e.preventDefault();
      e.stopPropagation();
      var touchedEl = e.target.closest(".accordion-control").nextSibling;
      var touchedElId = parseInt(touchedEl.id.split("-")[1]);
      var newList = [];
      yield headerElsList.body.map((el, index) => {
        if (el.id == touchedElId) {
          var newHeaderElementId = null;
          var newHeaderElementName = null;

          if (level == "parent") {
            if (touchedEl.parentNode.closest(".accordion-item") != null) {
              newHeaderElementId = touchedEl.parentNode.closest(".accordion-item").parentNode.closest(".accordion-item") != null ? parseInt(touchedEl.parentNode.closest(".accordion-item").parentNode.closest(".accordion-item").id.split("-")[1]) : null;
              newHeaderElementName = typeof headerElsList.body.find(el => el.id == newHeaderElementId) != "undefined" ? headerElsList.body.find(el => el.id == newHeaderElementId).name : null;
            }
          } else {
            if (touchedEl.nextSibling != null && touchedEl.nextSibling.nextSibling != null) {
              newHeaderElementId = touchedEl.nextSibling.nextSibling.nextSibling != null ? parseInt(touchedEl.nextSibling.nextSibling.nextSibling.id.split("-")[1]) : el.header_element_id;
              newHeaderElementName = typeof headerElsList.body.find(el => el.id == newHeaderElementId) != "undefined" ? headerElsList.body.find(el => el.id == newHeaderElementId).name : null;
            }
          }

          el = Object.assign({}, el, {
            header_element_id: newHeaderElementId,
            header_element_name: newHeaderElementName
          });
          newList.push(el);
        } else {
          newList.push(el);
        }
      });

      if (newList.length == headerElsList.body.length) {
        headerElsList = Object.assign({}, headerElsList, {
          body: newList
        });
        yield setItemsList();
      }
    });

    return function changeLevel(_x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }();

  var editItem = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(function* (e) {
      e.preventDefault();
      e.stopPropagation();
      var touchedEl = e.target.closest(".accordion-control").nextSibling;
      var touchedElId = parseInt(touchedEl.id.split("-")[1]);
      var newList = headerElsList.body;
      var editableEl = newList.find(el => el.id == touchedElId);
      editableEl = typeof editableEl.isEditable == "undefined" ? Object.assign({}, editableEl, {
        isEditable: true,
        isOpened: true
      }) : editableEl.isEditable == true ? Object.assign({}, editableEl, {
        isEditable: false
      }) : Object.assign({}, editableEl, {
        isEditable: true,
        isOpened: true
      });
      newList.splice(newList.findIndex(subel => subel.id == touchedElId), 1, editableEl);
      headerElsList = Object.assign({}, headerElsList, {
        body: newList
      });
      yield setItemsList();
    });

    return function editItem(_x7) {
      return _ref5.apply(this, arguments);
    };
  }();

  var removeItem = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(function* (e) {
      var newList = headerElsList.body;
      var index = newList.findIndex(el => el.id == parseInt(e.target.id.split("-")[1]));

      var removeSubItems = (list, index) => {
        var subList;
        subList = list.filter(el => el.header_element_id == index);

        if (subList.length > 0) {
          subList.map((el, index) => {
            list.splice(list.findIndex(subel => subel.id == el.id), 1);
            removeSubItems(list, el.id);
          });
        }

        return list;
      };

      newList = yield removeSubItems(newList, parseInt(e.target.id.split("-")[1]));

      if (index > -1) {
        newList.splice(index, 1);
        yield setItemsList();
      }
    });

    return function removeItem(_x8) {
      return _ref6.apply(this, arguments);
    };
  }();

  var submitItem = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(function* (e, header_el) {
      e.preventDefault();
      var newEl = Object.assign({}, header_el);
      Array.from(e.target.elements).map(input => {
        var key = input.name;

        if (key != null && key.length > 0) {
          newEl = Object.assign({}, newEl, {
            [key]: input.value
          });
        }
      });
      newEl = Object.assign({}, newEl, {
        isEditable: false
      });
      var newList = headerElsList.body;
      newList[headerElsList.body.findIndex(el => el.id == newEl.id)] = newEl;
      headerElsList = Object.assign({}, headerElsList, {
        body: newList
      });
      yield setItemsList();
    });

    return function submitItem(_x9, _x10) {
      return _ref7.apply(this, arguments);
    };
  }();

  var sendHeader = () => {
    _superagent.default.post(headerURI).send({
      ms: submitHeaderMS,
      originalHeaderElsList: typeof headerElsList.text != "undefined" ? JSON.parse(headerElsList.text) : originalHeaderElsList.body,
      headerElsList: headerElsList.body,
      header_id: header_id
    }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log("Error while submitting new Header : " + error);
    });
  };

  var setItemsList = () => {
    var dragzone = [];
    var currentFormInputs = document.querySelector("#".concat(formName)).firstChild;
    var parents = headerElsList.body.filter(el => el.header_element_id == null);

    var buildNestedList = parents => {
      return parents.map(parent => {
        var newParents = headerElsList.body.filter(el => el.header_element_id == parent.id);
        parent = Object.assign({}, parent, {
          children: newParents
        });

        if (newParents.length > 0) {
          return Object.assign({}, parent, {
            children: buildNestedList(newParents)
          });
        } else {
          return parent;
        }
      });
    };

    var buildHtml = nestedArray => {
      var tempHtml = [];
      nestedArray.map((header_el, index) => {
        var children = header_el.children.length > 0 ? buildHtml(header_el.children) : undefined;
        return tempHtml.push( /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
          key: "fragment-".concat(header_el.id)
        }, index == 0 ? /*#__PURE__*/_react.default.createElement("hr", {
          "data-header_element_id": header_el.header_element_id,
          onDragOver: e => dragOver(e),
          key: "hrbefore-".concat(header_el.id),
          className: "dropzone",
          id: "hrbefore-".concat(header_el.id)
        }) : undefined, /*#__PURE__*/_react.default.createElement("a", {
          href: "#",
          className: "clickable accordion-control",
          key: "toggle-".concat(header_el.id),
          onTouchStart: e => dragStart(e),
          onDragStart: e => dragStart(e),
          onDragOver: e => dragOver(e),
          onClick: e => {
            toggleVisibility(e, header_el);
          }
        }, /*#__PURE__*/_react.default.createElement("h3", {
          key: "h3-".concat(header_el.id),
          className: "title-accordion ".concat(typeof header_el.isOpened != "undefined" ? header_el.isOpened == true ? "opened" : "" : "")
        }, /*#__PURE__*/_react.default.createElement("span", null, header_el.value), /*#__PURE__*/_react.default.createElement("div", {
          className: "next"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "actions-edit"
        }, /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          onClick: e => {
            editItem(e);
          },
          className: "btn btn-secondary-revert edit-item"
        }, /*#__PURE__*/_react.default.createElement("i", {
          className: "fa-solid fa-edit",
          onClick: e => {
            editItem(e);
          }
        }))), /*#__PURE__*/_react.default.createElement("div", {
          className: "actions-level"
        }, /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          onClick: e => {
            changeLevel(e, "parent");
          },
          className: "btn btn-secondary-revert parent-level"
        }, /*#__PURE__*/_react.default.createElement("i", {
          className: "fa-solid fa-level-up-alt flip-horizontal",
          onClick: e => {
            changeLevel(e, "parent");
          }
        })), /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          onClick: e => {
            changeLevel(e, "children");
          },
          className: "btn btn-secondary-revert children-level"
        }, /*#__PURE__*/_react.default.createElement("i", {
          className: "fa-solid fa-level-down-alt flip-horizontal",
          onClick: e => {
            changeLevel(e, "children");
          }
        }))), /*#__PURE__*/_react.default.createElement("div", {
          className: "actions-position"
        }, /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          onClick: e => {
            changePosition(e, "up");
          },
          className: "btn btn-secondary-revert upper-level"
        }, /*#__PURE__*/_react.default.createElement("i", {
          className: "fa-solid fa-angle-up",
          onClick: e => {
            changePosition(e, "up");
          }
        })), /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          onClick: e => {
            changePosition(e, "down");
          },
          className: "btn btn-secondary-revert next-level"
        }, /*#__PURE__*/_react.default.createElement("i", {
          className: "fa-solid fa-angle-down",
          onClick: e => {
            changePosition(e, "down");
          }
        }))), /*#__PURE__*/_react.default.createElement("div", {
          className: "actions-delete"
        }, /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          id: "delete-".concat(header_el.id),
          onClick: e => {
            removeItem(e);
          },
          className: "btn btn-secondary-revert edit-item"
        }, /*#__PURE__*/_react.default.createElement("i", {
          className: "fa-solid fa-trash-alt",
          id: "delete-".concat(header_el.id),
          onClick: e => {
            removeItem(e);
          }
        })))))), typeof header_el.isEditable == "undefined" || header_el.isEditable == false ? /*#__PURE__*/_react.default.createElement(_headerAccordionElement.default, {
          header_el: header_el,
          index: index,
          children: children,
          dragOver: dragOver
        }) : /*#__PURE__*/_react.default.createElement(_headerAccordionEditableElement.default, {
          header_el: header_el,
          index: index,
          children: children,
          submitItem: submitItem,
          dragOver: dragOver
        }), index == nestedArray.length ? undefined : /*#__PURE__*/_react.default.createElement("hr", {
          onDragOver: e => dragOver(e),
          className: "dropzone",
          "data-header_element_id": header_el.header_element_id,
          key: "hrafter-".concat(header_el.id),
          id: "hrafter-".concat(header_el.id)
        })));
      });
      return tempHtml;
    };

    structuredHeaderElsList = Object.assign({}, headerElsList, {
      body: buildNestedList(parents)
    });
    dragzone = buildHtml(structuredHeaderElsList.body);
    dragzone.push( /*#__PURE__*/_react.default.createElement("div", {
      onClick: () => sendHeader(),
      key: "header-submit-button-container",
      className: "form-group col row flex-row-reverse"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "button",
      key: "header-submit-button",
      className: "btn btn-primary",
      value: _index.i18n.translate("Submit")
    })));

    _reactDom.default.unmountComponentAtNode(currentFormInputs.querySelector("#dragndrop-results"));

    _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-12 row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col"
    }, /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      className: "btn btn-secondary round add-element",
      onClick: e => createElement(e)
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa-solid fa-plus"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-10"
    }, /*#__PURE__*/_react.default.createElement("div", {
      id: "add-element"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-12 row responsive-table"
    }, /*#__PURE__*/_react.default.createElement("ul", {
      key: "header-table",
      className: "col nested-list"
    }, dragzone))), currentFormInputs.querySelector("#dragndrop-results"));
  };

  var select = (args, id) => {
    isSelectedHeader(true);
    setView(null);
    header_id = id;

    _superagent.default.post(formURI).send({
      form_name: formName
    }).then(res => {
      setView( /*#__PURE__*/_react.default.createElement("div", {
        className: "col-12",
        dangerouslySetInnerHTML: {
          __html: res.text
        }
      }));
      var currentFormInputs = document.querySelector("#".concat(formName)).firstChild;

      _superagent.default.post(headerURI).send({
        ms: currentFormInputs.querySelector("#ms").value,
        id: id
      }).then(res => {
        if (res.body != null) {
          headerElsList = Object.assign({}, res, {
            body: res.body.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight))
          });
          originalHeaderElsList = Object.assign({}, res);
          lowestId = originalHeaderElsList.body[0].id;
          originalHeaderElsList = Object.assign({}, res, {
            body: res.body.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight))
          });
        } else {
          headerElsList = Object.assign({}, {
            body: []
          });
          lowestId = 0;
          originalHeaderElsList = Object.assign({}, {
            body: []
          });
        }

        setItemsList();
      });
    }).catch(err => {
      console.log(err);
    });
  };

  if (!selectedHeader) {
    view = /*#__PURE__*/_react.default.createElement(_selectComponentPanel.default, {
      datas: args.datas,
      count: args.count,
      searchEngine: args.searchEngine,
      select: select,
      keys: ["name", "lastModifiedAt"],
      split: {
        "name": "header_"
      },
      current: args.current
    });
  }

  return view;
};

var _default = HeaderEditPanels;
exports.default = _default;