"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = require("../../../../operations/modules/mandatory/i18n/services/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectComponentPanel = args => {
  var view = [];
  var view_thead = [];
  var finalcontainer = [];

  if (args.datas != null && args.datas.length > 0) {
    var parent = document.querySelector("#search-results:first-child:not(.responsive-table)");

    if (parent != null) {
      parent.classList.remove("row");
      parent.classList.add("responsive-table");
    }

    view.push( /*#__PURE__*/_react.default.createElement("tr", {
      key: "table-titles"
    }, args.keys.map(key => {
      return /*#__PURE__*/_react.default.createElement("td", {
        key: "".concat(key, "-label")
      }, _index.i18n.translate(key));
    })));
    args.datas.map(data => {
      if (typeof data.title != "undefined" && data.title == null) {
        if (Boolean(data.isExternal)) {
          data.title = /*#__PURE__*/_react.default.createElement("span", {
            className: "info"
          }, _index.i18n.translate("<External link />"));
        } else {
          data.title = /*#__PURE__*/_react.default.createElement("span", {
            className: "info"
          }, _index.i18n.translate("<No title />"));
        }
      }

      view.push( /*#__PURE__*/_react.default.createElement("tr", {
        key: "table-values-".concat(data.id)
      }, args.keys.map(key => {
        if (typeof args.split != "undefined") {
          var split = Object.keys(args.split).find(k => k == key);

          if (typeof split != "undefined") {
            data[key] = data[key].split(args.split[split])[1];
          }
        }

        if (typeof args.translate != "undefined") {
          if (args.translate.includes(key)) {
            data[key] = typeof _index.i18n.translate(data[key]) != "undefined" ? _index.i18n.translate(data[key]) : data[key];
          }
        }

        if (key == "uri") {
          return /*#__PURE__*/_react.default.createElement("td", {
            key: "".concat(key, "-value")
          }, /*#__PURE__*/_react.default.createElement("a", {
            className: "table-link ",
            href: data[key],
            target: "_blank"
          }, data[key]));
        } else if (key == "lastModifiedAt") {
          return /*#__PURE__*/_react.default.createElement("td", {
            key: "".concat(key, "-value")
          }, new Date(data[key]).toLocaleDateString(_index.i18n.getLang()), ", ", new Date(data[key]).toLocaleTimeString(_index.i18n.getLang()));
        } else {
          return /*#__PURE__*/_react.default.createElement("td", {
            key: "".concat(key, "-value")
          }, data[key]);
        }
      }), /*#__PURE__*/_react.default.createElement("td", {
        className: "table-flex-btn row-reverse"
      }, /*#__PURE__*/_react.default.createElement("a", {
        key: "submit-".concat(data.id),
        id: "submit-".concat(data.id),
        name: "submit-".concat(data.id),
        className: "btn btn-secondary r-bold",
        href: "#",
        onClick: () => args.select(args, data.id)
      }, _index.i18n.translate("Choose")))));
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

    finalcontainer.push( /*#__PURE__*/_react.default.createElement("div", {
      key: "submit-container",
      className: "col-12"
    }));
    view_pages = /*#__PURE__*/_react.default.createElement("div", {
      className: "col row justify-content-center"
    }, view_pages); //Insertion des head & body dans les thead et tbody du tableau

    view_thead = /*#__PURE__*/_react.default.createElement("thead", null, view_thead);
    view = /*#__PURE__*/_react.default.createElement("tbody", null, view); //Insertion des thead, tbody et du conteneur de soumission

    view = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-10 responsive-table"
    }, /*#__PURE__*/_react.default.createElement("table", {
      className: "col"
    }, view)), finalcontainer, view_pages);
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

var _default = SelectComponentPanel;
exports.default = _default;