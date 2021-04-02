"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContentsFromRegistry = exports.getContentFromRegistry = exports.content = void 0;

var _void2 = _interopRequireDefault(require("./void"));

var _header = _interopRequireDefault(require("./header"));

var _nav = _interopRequireDefault(require("./nav"));

var _container = _interopRequireDefault(require("./container"));

var _row = _interopRequireDefault(require("./row"));

var _column = _interopRequireDefault(require("./column"));

var _div = _interopRequireDefault(require("./div"));

var _image = _interopRequireDefault(require("./image"));

var _h = _interopRequireDefault(require("./h1"));

var _h2 = _interopRequireDefault(require("./h2"));

var _h3 = _interopRequireDefault(require("./h3"));

var _ul = _interopRequireDefault(require("./ul"));

var _li = _interopRequireDefault(require("./li"));

var _a = _interopRequireDefault(require("./a"));

var _p = _interopRequireDefault(require("./p"));

var _span = _interopRequireDefault(require("./span"));

var _button = _interopRequireDefault(require("./button"));

var _dropdown = _interopRequireDefault(require("./dropdown"));

var _icon = _interopRequireDefault(require("./icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var content = {
  void: _void2.default,
  header: _header.default,
  nav: _nav.default,
  container: _container.default,
  row: _row.default,
  column: _column.default,
  div: _div.default,
  image: _image.default,
  h1: _h.default,
  h2: _h2.default,
  h3: _h3.default,
  ul: _ul.default,
  li: _li.default,
  a: _a.default,
  p: _p.default,
  span: _span.default,
  button: _button.default,
  dropdown: _dropdown.default,
  icon: _icon.default
};
exports.content = content;
var containerTypes = {
  void: args => {
    return {
      react_element: "void",
      name: "void element",
      args: {
        key: args.key,
        els: []
      }
    };
  },
  container: args => {
    return {
      react_element: "container",
      name: "container",
      args: {
        id: typeof args.id != "undefined" ? args.id : null,
        key: args.key,
        className: args.className
      }
    };
  },
  row: args => {
    return {
      react_element: "row",
      name: "row",
      args: {
        id: typeof args.id != "undefined" ? args.id : null,
        key: args.key,
        className: args.className
      }
    };
  },
  column: args => {
    return {
      react_element: "column",
      name: "column",
      args: {
        id: typeof args.id != "undefined" ? args.id : null,
        className: args.className,
        key: args.key
      }
    };
  },
  h1: args => {
    return {
      react_element: "h1",
      name: "h1",
      args: {
        id: typeof args.id != "undefined" ? args.id : null,
        className: args.className,
        els: args.els,
        key: typeof args.key != "undefined" ? args.key : "h1"
      }
    };
  },
  image: args => {
    return {
      react_element: "image",
      name: "image",
      args: {
        id: typeof args.id != "undefined" ? args.id : null,
        className: args.className,
        style: args.style,
        src: args.src,
        els: args.els,
        key: args.key
      }
    };
  },
  a: args => {
    return {
      react_element: "a",
      name: "a",
      args: {
        id: typeof args.id != "undefined" ? args.id : null,
        className: args.className,
        style: args.style,
        href: args.href,
        target: args.target,
        els: args.els,
        key: args.key
      }
    };
  },
  p: args => {
    return {
      react_element: "p",
      name: "p",
      args: {
        id: typeof args.id != "undefined" ? args.id : null,
        className: args.className,
        style: args.style,
        els: args.els,
        key: args.key
      }
    };
  },
  div: args => {
    return {
      react_element: "div",
      name: "div",
      args: {
        id: typeof args.id != "undefined" ? args.id : null,
        className: args.className,
        style: args.style,
        els: args.els,
        key: args.key
      }
    };
  },
  button: args => {
    return {
      react_element: "button",
      name: "button",
      args: {
        id: typeof args.id != "undefined" ? args.id : null,
        className: args.className,
        style: args.style,
        els: args.els,
        key: args.key
      }
    };
  },
  icon: args => {
    return {
      react_element: "icon",
      name: "icon",
      args: {
        id: typeof args.id != "undefined" ? args.id : null,
        className: args.className,
        style: args.style,
        els: args.els,
        key: args.key
      }
    };
  },
  customContainer: args => {
    return {
      react_element: args.react_element,
      name: args.name,
      args: {
        id: args.id,
        className: args.className,
        key: args.key
      }
    };
  }
};

var getContentFromRegistry = args => {
  if (typeof args != "undefined") {
    var newArgs;

    if (typeof args != "object") {
      newArgs = Object.assign({}, {
        key: "key-" + args + "-" + (typeof args.key != "undefined" ? args.key : 0)
      });
      return containerTypes[args](newArgs);
    } else {
      newArgs = Object.assign({}, args, {
        key: "key-" + args.libelle + "-" + (typeof args.key != "undefined" ? args.key : 0)
      });
      return containerTypes[args.libelle](newArgs);
    }
  }
};

exports.getContentFromRegistry = getContentFromRegistry;

var getContentsFromRegistry = types => {
  var container_array = [];
  var key = 0;
  types.map(function (type) {
    var newType = typeof type == "object" ? Object.assign({}, type, {
      key: key
    }) : Object.assign({}, {
      libelle: type
    }, {
      key: key
    });
    container_array.push(getContentFromRegistry(newType));
    key++;
  });
  return container_array;
};

exports.getContentsFromRegistry = getContentsFromRegistry;