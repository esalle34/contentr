"use strict";

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _html = _interopRequireDefault(require("../../../../components/jsx/templates/html"));

var _content = require("../../../../components/jsx/templates/html/content/content.registry");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Author - Eric Salle
var path = require('path');

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var routeBuilder = require(path.resolve("./".concat(process.env.NODE_SRC, "operations/init/routeBuilder")));

var HeaderFactory = require(path.resolve("".concat(global.MODULE_VIEW, "/headers/header_factory"))).HeaderFactory;

var awsS3Uploads = require(path.resolve("./".concat(process.env.NODE_SRC) + "/operations/init/awsS3UploadsInit"));

var fs = require('fs');

module.exports = {
  addRegistryType: (registryMap, els) => {
    var registry = {
      react_registry: registryMap,
      react_nested: els,
      args: {
        els: []
      }
    };
    return registry;
  },
  getElementFromRegistry: args => {
    return (0, _content.getContentFromRegistry)(args);
  },
  getElementsFromRegistry: args => {
    return (0, _content.getContentsFromRegistry)(args);
  },
  addNodeSibling: function addNodeSibling(els, siblings) {
    var before = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var content = Object.assign(getElementFromRegistry("void"), {
      react_nested: []
    });

    if (Array.isArray(siblings)) {
      if (before) {
        content.react_nested.push(els);
      }

      ;
      siblings.map(function (siblingsEl) {
        if (typeof siblingsEl.react_nested != "undefined") {
          content.react_nested.push({
            react_element: siblingsEl.react_element,
            args: siblingsEl.args,
            react_nested: siblingsEl.react_nested
          });
        } else {
          content.react_nested.push({
            react_element: siblingsEl.react_element,
            args: siblingsEl.args
          });
        }
      });

      if (!before) {
        content.react_nested.push(els);
      }

      return content;
    }

    if (before) {
      content.react_nested.push(els);
    }

    if (typeof siblings.react_nested != "undefined") {
      content.react_nested.push({
        react_element: siblings.react_element,
        args: siblings.args,
        react_nested: siblings.react_nested
      });
    } else {
      content.react_nested.push({
        react_element: siblings.react_element,
        args: siblings.args
      });
    }

    if (!before) {
      content.react_nested.push(els);
    }

    return content;
  },
  addNodeParent: (els, containers) => {
    if (Array.isArray(containers)) {
      var _container = els;
      containers.map(function (containerEl) {
        _container = {
          react_element: containerEl.react_element,
          react_nested: _container,
          args: containerEl.args
        };
        _container.args.els = [];
      });
      return _container;
    }

    var container = {
      react_element: containers.react_element,
      react_nested: els,
      args: containers.args
    };
    container.args.els = [];
    return container;
  },
  addLogoAsH1: (title, body) => {
    var els;
    var el = getElementFromRegistry({
      libelle: "a",
      key: "logo-link",
      els: title,
      className: "main-logo",
      id: title,
      href: "https://github.com/esalle34/cms_project",
      target: "_blank"
    });
    els = addNodeParent(el, getElementFromRegistry("h1"));
    els = addNodeParent(els, getElementsFromRegistry([{
      key: "logo-col",
      libelle: "column",
      className: "col-xs-12 col-sm-4"
    }, {
      key: "logo-row",
      libelle: "row",
      className: "row justify-content-center"
    }, {
      key: "logo-container",
      libelle: "container"
    }]));
    els = addNodeSibling(els, body);
    return els;
  },
  addHeader: (route, req, body) => {
    return new Promise(resolve => {
      if (req._parsedUrl.query != null && req._parsedUrl.query.includes("fragment")) {
        return resolve(body);
      }

      var els;
      var headerFactory = typeof req.session.user != "undefined" ? new HeaderFactory({
        loggedIn: true,
        userRoles: req.session.user.roles
      }) : new HeaderFactory({
        loggedIn: false
      });
      headerFactory.fetchHeader(headerFactory.getQueryPrefix("header")).then(header => {
        els = header.resolveSubElements(route, header.getHelemsData(), req.session.user);

        if (els != null) {
          header.setHeaderElements(header.getHeader(), els);
        }

        if (body == null) {
          return resolve(addReactRoot(header.getHeader(), route.theme));
        } else {
          return resolve(addNodeSibling(header.getHeader(), addReactRoot(body, route.theme)));
        }
      });
    }).catch(error => {
      console.error("Error while rendering Header (view_service@addHeader) : " + error);
    });
  },
  addReactRoot: (els, theme) => {
    var el = getElementFromRegistry({
      libelle: "customContainer",
      react_element: "container",
      id: theme,
      className: null
    });
    var newEls = els;
    newEls = addNodeSibling(el, newEls, true);
    return newEls;
  },
  checkAccessRights: function checkAccessRights(route, req, res) {
    var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var redirect = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var logoutAccess = Boolean(route.mandatoryLogout);
    var loginAccess = Boolean(route.mandatoryLogin);

    if (logoutAccess && typeof req.session.user != "undefined" && req.session.user.isAuthenticated) {
      if (typeof req.session.previousUrl != "undefined") {
        return body = {
          hasError: true,
          redirectUri: req.session.previousUrl,
          httpStatusCode: "409"
        };
      }

      return body = {
        hasError: true,
        redirectUri: global.HOME_PATH,
        httpStatusCode: "409"
      };
    }

    if (loginAccess && typeof req.session.user == "undefined" || loginAccess && typeof req.session.user != "undefined" && !req.session.user.isAuthenticated) {
      if (redirect) {
        req.session.previousUrl = route.uri;
      }

      return body = {
        hasError: true,
        redirectUri: global.LOGIN_PATH,
        httpStatusCode: "403"
      };
    }

    var accessGranted = false;
    var routePermissions = {};

    for (var prop in route) {
      if (prop.indexOf("".concat(global.ROUTE_PERMISSIONS_PREFIX, "Log")) <= -1 && prop.indexOf("".concat(global.ROUTE_PERMISSIONS_PREFIX)) > -1) {
        if (Boolean(route[prop])) {
          if (typeof req.session.user != "undefined" && Boolean(req.session.user.roles[prop.slice(global.ROUTE_PERMISSIONS_PREFIX.length)])) {
            accessGranted = true;
          }

          routePermissions = Object.assign(routePermissions, {
            [prop.slice(global.ROUTE_PERMISSIONS_PREFIX.length)]: route[prop]
          });
        }
      }
    }

    if (Object.keys(routePermissions).length === 0 && routePermissions.constructor === Object) {
      accessGranted = true;
    }

    if (!accessGranted) {
      return body = Object.assign({}, body, {
        hasError: true,
        template: "unauthorized",
        httpStatusCode: "403",
        errorMessage: "You do not have permission to access this page"
      });
    }

    return body;
  },
  getBuildView: (route, req, res, body) => {
    if (typeof req.session.user != "undefined") {
      return buildView(route, req, res, body);
    } else {
      return buildView(route, req, res);
    }
  },
  buildErrorView: (route, req, res, error) => {
    var body;

    if (!route.isMs) {
      body = {
        react_element: "div",
        args: {
          key: "error-container",
          className: "container"
        },
        react_nested: {
          react_element: "div",
          args: {
            key: "error-row",
            className: "row"
          },
          react_nested: {
            react_element: "div",
            args: {
              key: "error-stack",
              className: "col error-stack",
              els: route.i18n.translate("Error 500", route.lang) + " : " + error.stack
            }
          }
        }
      };
    } else {
      body = {
        httpStatusCode: 500,
        hasError: true,
        errorMessage: error.stack
      };
    }

    return buildView(route, req, res, body);
  },
  build404View: function build404View(route, req, res) {
    var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var message = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    addHeader(route, req, body).then(body => {
      if (body == null) {
        body = getElementFromRegistry("void");
      }

      ;
      var header;

      if (!route.isMs) {
        if (Array.isArray(body.react_nested)) {
          header = body.react_nested.find(b => b.react_element == "header");
        } else {
          header = body.react_nested[0];
        }

        body = addRegistryType(route.theme, body);
      } //404 URI


      if (typeof route.uri == "undefined" || message == "Nothing found") {
        var htmlFile = path.resolve(global.HTML_DIR + "/notFound.html");
        header = addRegistryType(route.theme, header);
        header = _server.default.renderToString( /*#__PURE__*/_react.default.createElement(_html.default, {
          data: route,
          body: header,
          fragment: true
        }));

        var head = _server.default.renderToString( /*#__PURE__*/_react.default.createElement(_html.default, {
          data: route
        }));

        fs.readFile(htmlFile, "utf-8", (err, data) => {
          data = data.replace("<Header />", "".concat(header));
          data = data.replace("<Theme />", "<div id=".concat(route.theme, " class=\"container\"></div>"));
          data = data.replace("<Homepage />", route.i18n.translate("Homepage", route.lang));
          return res.send(data.replace("<Head />", "".concat(head)));
        });
      }
    });
  },
  buildView: function buildView(route, req, res) {
    var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    addHeader(route, req, body).then(body => {
      if (body == null) {
        body = getElementFromRegistry("void");
      }

      ;
      var fileSystem = process.env.AWS_ENV ? awsS3Uploads.initS3FS() : fs;
      var header;

      if (!route.isMs) {
        if (Array.isArray(body.react_nested)) {
          header = body.react_nested.find(b => b.react_element == "header");
        } else {
          header = body.react_nested[0];
        }

        body = addRegistryType(route.theme, body);
      }

      body = checkAccessRights(route, req, res, body);

      if (body.hasError && !route.isMs) {
        fileSystem = fs;

        var head = _server.default.renderToString( /*#__PURE__*/_react.default.createElement(_html.default, {
          data: route
        }));

        header = addRegistryType(route.theme, header);
        header = _server.default.renderToString( /*#__PURE__*/_react.default.createElement(_html.default, {
          data: route,
          body: header
        }));
        var htmlFile = path.resolve(global.HTML_DIR + "/" + body.template + ".html");

        if (typeof body.redirectUri != "undefined") {
          return res.status(body.httpStatusCode).redirect(body.redirectUri);
        } else {
          if (!route.isMs) {
            fs.readFile(htmlFile, "utf-8", (err, data) => {
              data = data.replace("<h1></h1>", "<h1><a id=".concat(global.DEFAULT_SITE_TITLE, " class='main-logo' href='/'></a></h1>"));
              data = data.replace("<h2></h2>", "<h2>" + route.i18n.translate(body.errorMessage, route.lang) + "</h2>");
              data = data.replace("<a></a>", "<a href='/' class='btn btn-primary next'>" + route.i18n.translate("Back to homepage", route.lang) + "</a>");
              data = data.replace("<header></header>", "".concat(header));
              return res.status(body.httpStatusCode).send(data.replace("<head></head>", "".concat(head)));
            });
          }
        }
      } else if (body.hasError && route.isMs) {
        return res.status(body.httpStatusCode).send({
          httpStatusCode: body.httpStatusCode,
          message: typeof body.errorMessage != "undefined" ? body.errorMessage : "Undefined error"
        });
      } else {
        try {
          if (!route.isMs) {
            var tpl;

            var _htmlFile;

            var _head;

            if (!route.isFile) {
              fileSystem = fs;

              if (req._parsedUrl.query != null && req._parsedUrl.query.includes("fragment")) {
                _htmlFile = path.resolve(global.HTML_DIR + "/fragment.html");
                tpl = _server.default.renderToString( /*#__PURE__*/_react.default.createElement(_html.default, {
                  data: route,
                  body: body,
                  fragment: true
                }));
              } else {
                if (req._parsedUrl.query != null && req._parsedUrl.query.includes("print")) {
                  _htmlFile = path.resolve(global.HTML_DIR + "/print.html");
                  body = addRegistryType(route.theme, body.react_nested.react_nested[1]);
                  tpl = _server.default.renderToString( /*#__PURE__*/_react.default.createElement(_html.default, {
                    data: route,
                    body: body,
                    fragment: true
                  }));
                } else {
                  _htmlFile = path.resolve(global.HTML_DIR + "/index.html");
                  tpl = _server.default.renderToString( /*#__PURE__*/_react.default.createElement(_html.default, {
                    data: route,
                    body: body
                  }));
                }
              }
            } else if (route.isFile && route.filename.includes(".htm")) {
              header = addRegistryType(route.theme, header);
              header = _server.default.renderToString( /*#__PURE__*/_react.default.createElement(_html.default, {
                data: route,
                body: header,
                fragment: true
              }));
              _head = _server.default.renderToString( /*#__PURE__*/_react.default.createElement(_html.default, {
                data: route
              }));

              if (process.env.AWS_ENV) {
                fileSystem.headObject(route.filepath + route.filename, function (err, data) {
                  if (err && err.code === 'NotFound') {
                    fileSystem = fs;
                    _htmlFile = path.resolve(global.HTML_DIR + "/notFound.html");
                  } else {
                    _htmlFile = route.filepath + route.filename;
                  }

                  fileSystem.readFile(_htmlFile, "utf-8", (err, data) => {
                    if (err) {
                      console.error('Error-log Debug:', err);
                      return res.status(500).send(route.i18n.translate("Error 500", route.lang) + " : " + route.i18n.translate("Internal Server Error", route.lang));
                    }

                    if (route.isFile && route.filename.includes(".htm")) {
                      if (req._parsedUrl.query != null && req._parsedUrl.query.includes("print")) {
                        data = data.replace("<Header />", "");
                      } else {
                        data = data.replace("<Header />", "".concat(header));
                      }

                      data = data.replace("<Theme />", "<div id=".concat(route.theme, " class=\"container\"></div>"));
                      data = data.replace("<Homepage />", route.i18n.translate("Homepage", route.lang));
                      return res.send(data.replace("<Head />", "".concat(_head)));
                    }
                  });
                });
              } else {
                if (fileSystem.existsSync(global.PROJECT_DIR + route.filepath + route.filename)) {
                  _htmlFile = path.resolve(global.PROJECT_DIR + route.filepath + route.filename);
                } else {
                  fileSystem = fs;
                  _htmlFile = path.resolve(global.HTML_DIR + "/notFound.html");
                }
              }
            }

            if (typeof _htmlFile != "undefined") {
              fileSystem.readFile(_htmlFile, "utf-8", (err, data) => {
                if (err) {
                  console.error('Error-log Debug:', err);
                  return res.status(500).send(route.i18n.translate("Error 500", route.lang) + " : " + route.i18n.translate("Internal Server Error", route.lang));
                }

                if (route.isFile && route.filename.includes(".htm") && process.env.AWS_ENV != "true") {
                  if (req._parsedUrl.query != null && req._parsedUrl.query.includes("print")) {
                    data = data.replace("<Header />", "");
                  } else {
                    data = data.replace("<Header />", "".concat(header));
                  }

                  data = data.replace("<Theme />", "<div id=".concat(route.theme, " class=\"container\"></div>"));
                  data = data.replace("<Homepage />", route.i18n.translate("Homepage", route.lang));
                  return res.send(data.replace("<Head />", "".concat(_head)));
                } else if (req._parsedUrl.query != null && req._parsedUrl.query.includes("fragment")) {
                  return res.status(200).send(data.replace("<Body />", "".concat(tpl)));
                } else {
                  _head = _server.default.renderToString( /*#__PURE__*/_react.default.createElement(_html.default, {
                    data: route
                  }));

                  if (req._parsedUrl.query != null && req._parsedUrl.query.includes("print")) {
                    data = data.replace("<Head />", "".concat(_head));
                    data = data.replace("<Theme />", "<div id=".concat(route.theme, " class=\"container\"></div>"));
                    return res.send(data.replace("<Body />", "".concat(tpl)));
                  }

                  return res.send(data.replace("<Html />", "".concat(tpl)));
                }
              });
            } else {
              if (!route.filename.includes(".htm")) {
                var file = process.env.AWS_ENV ? route.filepath + route.filename : path.resolve("." + route.filepath + route.filename);

                if (process.env.AWS_ENV) {
                  fileSystem = awsS3Uploads.initS3FS();

                  var _head2 = fileSystem.headObject(file);

                  _head2.then(resolve => {
                    if (typeof resolve != "undefined" && resolve.ContentType.includes("audio/mpeg")) {
                      var range = req.headers.range;
                      var bytes = range.replace(/bytes=/, '').split('-');
                      var start = parseInt(bytes[0], 10);
                      var total = resolve.ContentLength;
                      var end = bytes[1] ? parseInt(bytes[1], 10) : total - 1;
                      var chunksize = end - start + 1;
                      res.writeHead(206, {
                        'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunksize,
                        'Last-Modified': resolve.LastModified,
                        'Content-Type': resolve.ContentType
                      });
                    } else {
                      res.writeHead(200, {
                        "Content-Type": resolve.ContentType
                      });
                    }

                    var s3 = awsS3Uploads.init();
                    s3.getObject({
                      Bucket: "".concat(global.S3_BUCKET),
                      Key: "".concat(global.CMS_TITLE, "/").concat(global.UPLOAD_FOLDER).concat(file)
                    }).createReadStream().pipe(res);
                    return res;
                  }).catch(error => {
                    if (error) {
                      return res.status(404).end();
                    }
                  });
                } else {
                  fileSystem.readFile(file, (err, data) => {
                    return res.sendFile(file);
                  });
                }
              }
            }
          } else {
            return res.send(body);
          }
        } catch (error) {
          console.error("Error while building view @view_service/buildView : " + error.stack);
        }
      }
    });
  }
};
var buildView = module.exports.buildView;
var getBuildView = module.exports.getBuildView;
var addHeader = module.exports.addHeader;
var addRegistryType = module.exports.addRegistryType;
var getElementFromRegistry = module.exports.getElementFromRegistry;
var getElementsFromRegistry = module.exports.getElementsFromRegistry;
var addNodeSibling = module.exports.addNodeSibling;
var addNodeParent = module.exports.addNodeParent;
var addReactRoot = module.exports.addReactRoot;
var addLogoAsH1 = module.exports.addLogoAsH1;
var checkAccessRights = module.exports.checkAccessRights;