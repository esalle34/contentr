"use strict";

var path = require('path');

var global = require(path.resolve("./".concat(process.env.NODE_SRC, "global")))();

var root_folder_list = require(path.resolve("./".concat(process.env.NODE_SRC, "theme"))).root_folder_list();

var default_root_folder_list = require(path.resolve("./".concat(process.env.NODE_SRC, "theme"))).default_root_folder_list();

var views = require(path.resolve("./".concat(process.env.NODE_SRC, "operations/modules/mandatory/views/view_service")));

var upload_service = require(path.resolve("./".concat(process.env.NODE_SRC, "operations/modules/mandatory/content/upload_service")));

var awsS3Uploads = require(path.resolve("./".concat(process.env.NODE_SRC) + "/operations/init/awsS3UploadsInit"));

var multer = require("multer");

module.exports = {
  getAllRoutes: function getAllRoutes() {
    var _routing = {
      name: "routing_transaction",
      query: "SELECT * from uri AS u INNER JOIN pages AS p ON p.uri_id = u.id INNER JOIN pages_permissions AS pp ON pp.page_id = p.id LEFT JOIN callback AS c ON c.id = p.callback_id where u.isPublished = true",
      message: "Selecting every existing routes"
    };
    return _routing;
  },
  buildRoute: function buildRoute(route, app, i18n) {
    if (!route.isExternal && !route.uri.includes("/files/add")) {
      app[route.method](route.uri, multer().array(), (req, res) => {
        var acceptLanguage = 'Accept-Language: ' + req.acceptsLanguages();

        if (req.acceptsLanguages() != "*") {
          acceptLanguage = acceptLanguage.split(':')[1].match(/[a-zA-Z\-]{4,10}/g) || [];
          acceptLanguage = acceptLanguage[0];
          acceptLanguage = acceptLanguage.slice(0, 3) + acceptLanguage.charAt(3).toUpperCase() + acceptLanguage.charAt(4).toUpperCase();
          acceptLanguage = typeof acceptLanguage != "undefined" ? acceptLanguage : i18n.getLang();
        } else {
          acceptLanguage = i18n.getLang();
        }

        route = Object.assign({}, route, {
          i18n: i18n,
          lang: acceptLanguage,
          isMs: false
        });

        if (route.callback != null) {
          try {
            var c = require(path.resolve(global.PROJECT_DIR + route.filepath + route.filename));

            c[route.callback](route, req, res);
          } catch (error) {
            return views.buildErrorView(route, req, res, error);
          }
        } else {
          views.buildView(route, req, res);
        }
      });
    } else if (route.uri.includes("/files/add")) {
      var storage = upload_service.createMulterLocalStorage();
      var upload = multer({
        storage: storage
      }).single("file_uploaded");
      app[route.method](route.uri, upload, (req, res) => {
        var body = views.checkAccessRights(route, req, res, null, false);

        if (body != null && body.hasError) {
          if (typeof body.redirectUri != "undefined") {
            return res.status(403).send(Object.assign({}, {
              redirect: body.redirectUri
            }));
          }
        }

        var compress = new Promise((resolve, reject) => {
          upload_service.compressFiles(req, res, resolve);
        });
        compress.then(resolve => {
          if (process.env.AWS_ENV == "true") {
            upload_service.uploadFileToS3(req, res, resolve);
          } else {
            return res.status(200).send(Object.assign({}, {
              message: "reload-file-browser",
              path: req._parsedOriginalUrl.path.split("/files/add")[1]
            }));
          }
        });
      });
    }
  },
  resolveFile: (s3FS, resolve, uri, req, res) => {
    if (!uri.includes("html")) {
      var file;

      if (resolve.ContentType.includes("audio/mpeg")) {
        var s3 = awsS3Uploads.init();
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
        s3.getObject({
          Bucket: "".concat(global.S3_BUCKET),
          Key: "".concat(global.CMS_TITLE, "/").concat(global.UPLOAD_FOLDER).concat(req.path),
          Range: range
        }).createReadStream().pipe(res);
      } else {
        file = s3FS.createReadStream(req.path);
        file.on('error', function (err) {
          return res.status(404).end();
        });
        res.writeHead(200, {
          "Content-Type": resolve.ContentType
        });
        file.pipe(res);
      }
    } else {
      s3FS.readFile(req.path, "utf-8", (err, data) => {
        if (err) {
          return res.status(404).end();
        }

        return res.status(200).send(data);
      });
    }
  },
  buildS3RewritedFilesRoute: function buildS3RewritedFilesRoute(app, i18n) {
    var _loop = function _loop(folder) {
      app.get(root_folder_list[folder].uri + "*", function (req, res) {
        var s3FS = awsS3Uploads.initS3FS();
        var head = s3FS.headObject(req.path);
        head.then(resolve => {
          resolveFile(s3FS, resolve, root_folder_list[folder].uri, req, res);
        }).catch(error => {
          if (error) {
            return res.status(404).end();
          }
        });
      });
    };

    for (var folder in root_folder_list) {
      _loop(folder);
    }

    default_root_folder_list.map(folder => {
      app.get(folder + "*", function (req, res) {
        var s3FS = awsS3Uploads.initS3FS();
        var head = s3FS.headObject(req.path);
        head.then(resolve => {
          resolveFile(s3FS, resolve, folder, req, res);
        }).catch(error => {
          if (error) {
            return res.status(404).end();
          }
        });
      });
    });
  },
  buildRouteAsApi: function buildRouteAsApi(route, app, i18n) {
    if (!route.isExternal) {
      app[route.method]("/api" + route.uri, (req, res) => {
        var acceptLanguage = 'Accept-Language: ' + req.headers["accept-language"];
        acceptLanguage = acceptLanguage.split(':')[1].match(/[a-zA-Z\-]{4,10}/g) || [];
        acceptLanguage = acceptLanguage[0];
        acceptLanguage = typeof acceptLanguage != "undefined" ? acceptLanguage : i18n.getLang();
        route = Object.assign({}, route, {
          i18n: i18n,
          lang: acceptLanguage,
          isMs: true
        });

        if (route.callback != null) {
          try {
            var c = require(path.resolve(global.PROJECT_DIR + route.filepath + route.filename));

            c[route.callback](route, req, res);
          } catch (error) {
            return views.buildErrorView(route, req, res, error);
          }
        } else {
          views.buildView(route, req, res);
        }
      });
    }
  },
  build404Routes: function build404Routes(app, i18n) {
    app.get('*', function (req, res) {
      var acceptLanguage = 'Accept-Language: ' + req.acceptsLanguages();

      if (req.acceptsLanguages() != "*") {
        acceptLanguage = acceptLanguage.split(':')[1].match(/[a-zA-Z\-]{4,10}/g) || [];
        acceptLanguage = acceptLanguage[0];
        acceptLanguage = acceptLanguage.slice(0, 3) + acceptLanguage.charAt(3).toUpperCase() + acceptLanguage.charAt(4).toUpperCase();
        acceptLanguage = typeof acceptLanguage != "undefined" ? acceptLanguage : i18n.getLang();
      } else {
        acceptLanguage = i18n.getLang();
      }

      var route = Object.assign({}, {
        theme: "office",
        i18n: i18n,
        lang: acceptLanguage,
        isMs: false
      });
      views.build404View(route, req, res);
    });
  }
};
var resolveFile = module.exports.resolveFile;