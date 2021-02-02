"use strict";

//Contents Module
//Author - Eric Salle
var path = require('path');

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));

var ContentFactory = require(path.resolve(global.MODULE_ADMIN + "/content/content_factory")).ContentFactory;

module.exports = {
  administration_content: (route, req, res) => {
    var body = {
      react_element: "div",
      args: {
        key: "administration-Contents-container",
        className: "container first-content"
      },
      react_nested: {
        react_element: "p",
        args: {
          els: "test"
        }
      }
    };
    return view_service.getBuildView(route, req, res, body);
  },
  create_content: (route, req, res) => {},
  decorateContainer: function decorateContainer(route) {
    var dMethod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "tabsDecorator";
    var formComponent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var container = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var feature = route.feature.split("_")[0];
    var contentFactory = new ContentFactory();

    try {
      return new Promise(resolve => {
        contentFactory.fetchAllUriByFeature(contentFactory.getQueryPrefix("feature"), feature).then(Contents => {
          var decorator = module.exports[dMethod]();
          Contents.map(Content => {
            decorator.react_nested.react_nested.push({
              react_element: "li",
              args: {
                key: "tabs-".concat(Content.getFeature()),
                className: "nav-item"
              },
              react_nested: {
                react_element: "a",
                args: {
                  key: "link-".concat(Content.getFeature()),
                  className: "nav-link ".concat(route.uri == Content.getUri() ? 'active' : ""),
                  href: Content.getUri(),
                  els: route.i18n.translate(Content.getValue(), route.lang)
                }
              }
            });
          });
          var containerD = decorator;

          if (container) {
            containerD = containerDecorator(feature, formComponent, decorator);
          }

          return resolve(containerD);
        });
      });
    } catch (error) {
      throw new Error("Error in form_service@decorateForm : " + error);
    }
  },
  tabsDecorator: () => {
    var tabs = {
      react_element: "div",
      args: {
        key: "tabs-decorator",
        className: "col-12 col-lg-10"
      },
      react_nested: {
        react_element: "ul",
        args: {
          key: "tabs-decorator-list",
          className: "nav nav-tabs justify-content-end"
        },
        react_nested: []
      }
    };
    return tabs;
  },
  containerDecorator: function containerDecorator(key) {
    var formComponent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var els = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (formComponent != null) {
      els = [els, formComponent];
    }

    return {
      react_element: "div",
      args: {
        key: "".concat(key, "-container"),
        className: "container first-content"
      },
      react_nested: {
        react_element: "div",
        args: {
          key: "".concat(key, "-row"),
          className: "row justify-content-center"
        },
        react_nested: els
      }
    };
  }
};
var containerDecorator = module.exports.containerDecorator;