"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = require("../../../../operations/modules/mandatory/i18n/services/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UriDeletePanels = args => {
  var selectAllClick = e => {
    var checkboxes;

    if (e.target.checked) {
      checkboxes = e.target.closest("#search-results").querySelectorAll("input[type=checkbox]:not(:checked)");
      Array.from(checkboxes).map(c => {
        c.checked = true;
      });
    } else {
      checkboxes = e.target.closest("#search-results").querySelectorAll("input[type=checkbox]:checked");
      Array.from(checkboxes).map(c => {
        c.checked = false;
      });
    }
  };

  var check = e => {
    if (!e.target.checked) {
      var selectAll = e.target.closest("#search-results").querySelector("#select-all-bellow");

      if (selectAll.checked) {
        selectAll.checked = false;
      }
    } else if (e.target.checked) {
      var checkboxes = e.target.closest("#search-results").querySelectorAll("input[type=checkbox]:not(:checked):not(#select-all-bellow)");

      if (checkboxes.length == 0) {
        var _selectAll = e.target.closest("#search-results").querySelector("#select-all-bellow");

        if (!_selectAll.checked) {
          _selectAll.checked = true;
        }
      }
    }
  };

  var view = [];
  var view_thead = [];
  var view_submit = [];
  console.log(args);

  if (args.datas != null && args.datas.length > 0) {
    var parent = document.querySelector("#search-results:first-child:not(.responsive-table)");

    if (parent != null) {
      parent.classList.remove("row");
      parent.classList.add("responsive-table");
    }

    view.push( /*#__PURE__*/_react.default.createElement("tr", {
      key: "route-check-select-all"
    }, /*#__PURE__*/_react.default.createElement("td", {
      key: "title-label"
    }, _index.i18n.translate("Title")), /*#__PURE__*/_react.default.createElement("td", {
      key: "link-label"
    }, _index.i18n.translate("Link")), /*#__PURE__*/_react.default.createElement("td", {
      key: "date-label"
    }, _index.i18n.translate("Last update")), /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement("input", {
      key: "check-all-bellow",
      id: "select-all-bellow",
      key: "select-all-bellow",
      type: "checkbox",
      className: "flex-checkbox onclick-select-all-bellow",
      onClick: selectAllClick
    }))));
    args.datas.map(m => {
      if (m.title == null) {
        if (Boolean(m.isExternal)) {
          m.title = /*#__PURE__*/_react.default.createElement("span", {
            className: "info"
          }, _index.i18n.translate("<External link />"));
        } else {
          m.title = /*#__PURE__*/_react.default.createElement("span", {
            className: "info"
          }, _index.i18n.translate("<No title />"));
        }
      }

      view.push( /*#__PURE__*/_react.default.createElement("tr", {
        key: "route-key-".concat(m.id)
      }, /*#__PURE__*/_react.default.createElement("td", {
        key: "title-value-" + m.id
      }, m.title), /*#__PURE__*/_react.default.createElement("td", {
        key: "link-value-" + m.id
      }, /*#__PURE__*/_react.default.createElement("a", {
        href: m.uri,
        target: "_blank"
      }, m.uri)), /*#__PURE__*/_react.default.createElement("td", {
        key: "date-value-" + m.id
      }, new Date(m.lastModifiedAt).toLocaleDateString(_index.i18n.getLang()), ", ", new Date(m.lastModifiedAt).toLocaleTimeString(_index.i18n.getLang())), /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement("input", {
        key: "delete-route-".concat(m.id),
        id: "delete-route-".concat(m.id),
        name: "delete-route-".concat(m.id),
        type: "checkbox",
        className: "flex-checkbox col-1",
        onClick: check
      }))));
    });
    var view_pages = [];

    if (args.count > 10) {
      var count = Math.ceil(args.count / 10);

      var _loop = function _loop(i) {
        view_pages.push( /*#__PURE__*/_react.default.createElement("a", {
          href: "#",
          key: "page-".concat(i),
          onClick: () => args.searchEngine(Object.assign({}, {
            page: i
          })),
          className: "btn btn-secondary page-btn ".concat(typeof args.current != "undefined" && args.current == i ? "current" : "")
        }, i));
      };

      for (var i = 1; i <= count; i++) {
        _loop(i);
      }
    }

    view_submit.push( /*#__PURE__*/_react.default.createElement("div", {
      key: "submit-container",
      className: "form-group col-12"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "input-group"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "submit",
      className: "next btn btn-primary submit",
      value: _index.i18n.translate("Submit")
    }))));
    view_pages = /*#__PURE__*/_react.default.createElement("div", {
      className: "col row justify-content-center"
    }, view_pages); //Insertion des head & body dans les thead et tbody du tableau

    view_thead = /*#__PURE__*/_react.default.createElement("thead", null, view_thead);
    view = /*#__PURE__*/_react.default.createElement("tbody", null, view); //Insertion des thead, tbody et du conteneur de soumission

    view = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-10 responsive-table"
    }, /*#__PURE__*/_react.default.createElement("table", {
      className: "col"
    }, view)), view_submit, view_pages);
  } else {
    var _parent = document.querySelector("#search-results:first-child.responsive-table");

    if (_parent != null) {
      _parent.classList.add("row");

      _parent.classList.remove("responsive-table");
    }

    view = /*#__PURE__*/_react.default.createElement("div", {
      key: "container-nothing-found",
      className: "center"
    }, /*#__PURE__*/_react.default.createElement("h3", null, _index.i18n.translate("Nothing was found")));
  }

  return view;
};

var _default = UriDeletePanels;
exports.default = _default;