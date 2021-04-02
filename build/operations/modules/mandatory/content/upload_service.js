"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Upload Service Module
//Author - Eric Salle
var path = require('path');

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var awsS3Uploads = require(path.resolve(root_path + "/operations/init/awsS3UploadsInit"));

var view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));

var rimraf = require("rimraf");

var multer = require("multer");

var fs = require("fs");

var mime = require("mime-types");

var imagemin = require("imagemin");

var imageminMozjpeg = require('imagemin-mozjpeg');

var imageminOptipng = require('imagemin-optipng');

var imageminGifsicle = require('imagemin-gifsicle');

var imageminSvgo = require('imagemin-svgo');

module.exports = {
  initDirectories: (route, req, res) => {
    var s3 = awsS3Uploads.init();
    var uploadQuery = new Promise((resolve, reject) => {
      try {
        awsS3Uploads.createRootUploadFolder(s3);
        resolve();
      } catch (error) {
        reject();
        console.log(error);
      }
    });
    uploadQuery.then(resolve => {
      return res.status(200).send("Directories created successfully !");
    });
  },
  uploadFileToS3: (req, res) => {
    var s3 = awsS3Uploads.init();
    var filemime = mime.lookup(req.file.filename);

    if (filemime.includes("video")) {
      filemime = "audio/mpeg";
    } else if (filemime.includes("svg")) {
      filemime = "image/svg+xml";
    }

    var stream = fs.createReadStream(req.file.path);

    var uri = req._parsedOriginalUrl.path.split("/files/add")[1];

    if (uri.endsWith("/")) {
      uri = uri.slice(0, -1);
    }

    var params = Object.assign({}, {
      Bucket: "".concat(global.S3_BUCKET),
      Key: "".concat(global.CMS_TITLE, "/").concat(global.UPLOAD_FOLDER).concat(uri, "/").concat(req.file.filename),
      Body: stream,
      ContentType: filemime
    });
    var s3upload = s3.upload(params, function (err, data) {
      if (err) {
        console.log("Error creating the folder: ", err);
      } else {
        console.log("Successfully created ".concat(global.CMS_TITLE, "/").concat(global.UPLOAD_FOLDER).concat(req._parsedOriginalUrl.path.split("/files/add")[1], "/ on S3"));
      }
    }).promise();

    try {
      s3upload.then(s3resolve => {
        return res.status(200).send(Object.assign({}, {
          message: "reload-file-browser",
          path: req._parsedOriginalUrl.path.split("/files/add")[1]
        }));
      });
    } catch (error) {
      console.log(error);
    }
  },
  createMulterLocalStorage: (req, res) => {
    var storage = multer.diskStorage({
      destination: function destination(req, file, cb) {
        var uri;
        uri = "." + req._parsedOriginalUrl.path.split("/files/add")[1];

        if (!fs.existsSync(uri)) {
          fs.mkdirSync(uri, {
            recursive: true
          });
        }

        cb(null, uri);
      },
      filename: function filename(req, file, cb) {
        file = Object.assign({}, file, {
          originalname: file.originalname.replace(/\s/g, '_')
        });
        cb(null, path.basename(file.originalname, path.extname(file.originalname)) + path.extname(file.originalname));
      }
    });
    return storage;
  },
  getUploadView: (route, req, res) => {
    var body = {
      react_element: "getUploadView",
      args: {
        tr_title: route.i18n.translate("Files", route.lang)
      }
    };
    return view_service.getBuildView(route, req, res, body);
  },
  getFiles: (route, req, res) => {
    var body = view_service.checkAccessRights(route, req, res, null, false);

    if (body != null && body.hasError) {
      if (typeof body.redirectUri != "undefined") {
        return res.status(403).send(Object.assign({}, {
          redirect: body.redirectUri
        }));
      }
    }

    var params = req.body;
    var files = [];
    var fileSystem = process.env.AWS_ENV == "true" ? awsS3Uploads.initS3FS() : fs;
    var p = path.resolve(process.env.AWS_ENV == "true" ? params.root_path : root_path + params.root_path);

    if (params.root_path.length > 0) {
      fileSystem.readdir(p, (err, filenames) => {
        if (err) {
          console.log(err);
          return res.status(404).send(Object.assign({}, {
            message: "Folder not found",
            path: "../" + process.env.NODE_SRC + "/" + params.root_path
          }));
        }

        filenames.map(f => {
          files.push(Object.assign({}, {
            filename: f.endsWith('/') ? f.slice(0, -1) : f,
            path: params.root_path,
            extension: path.extname(f).toLowerCase()
          }));
        });

        if (files.length > 0) {
          return res.status(200).send(files);
        } else {
          return res.status(404).send(Object.assign({}, {
            message: "Nothing found"
          }));
        }
      });
    } else {
      return res.status(404).send(Object.assign({}, {
        message: "Nothing found"
      }));
    }
  },

  addFolder(route, req, res) {
    var body = view_service.checkAccessRights(route, req, res, null, false);

    if (body != null && body.hasError) {
      if (typeof body.redirectUri != "undefined") {
        return res.status(403).send(Object.assign({}, {
          redirect: body.redirectUri
        }));
      }
    }

    var params = req.body;

    if (params[Object.keys(req.body).find(k => k.includes("folder"))].match(/[^\w]/gi)) {
      return res.status(409).send(Object.assign({}, {
        isValid: false,
        errorLabel: route.i18n.translate("Accentuated and special characters are forbidden", route.lang)
      }));
    }

    if (process.env.AWS_ENV != "true") {
      var name = params[Object.keys(req.body).find(k => k.includes("folder"))];

      if (!fs.existsSync("." + params.folderpath + "/" + name)) {
        fs.mkdirSync("." + params.folderpath + "/" + name);
      }

      res.status(200).send(Object.assign({}, {
        message: "reload-file-browser",
        path: params.folderpath
      }));
    } else {
      var s3 = awsS3Uploads.init();
      var s3Params = Object.assign({}, {
        Bucket: "".concat(global.S3_BUCKET),
        Key: "".concat(global.CMS_TITLE, "/").concat(global.UPLOAD_FOLDER).concat(params.folderpath, "/").concat(params[Object.keys(req.body).find(k => k.includes("folder"))], "/"),
        Body: ""
      });
      var s3upload = s3.upload(s3Params, function (err, data) {
        if (err) {
          console.log("Error creating the folder: ", err);
        } else {
          console.log("Successfully created ".concat(global.CMS_TITLE, "/").concat(global.UPLOAD_FOLDER).concat(params.folderpath, "/").concat(params[Object.keys(req.body).find(k => k.includes("folder"))], "/ on S3"));
        }
      }).promise();

      try {
        s3upload.then(resolve => {
          res.status(200).send(Object.assign({}, {
            message: "reload-file-browser",
            path: params.folderpath
          }));
        });
      } catch (error) {
        console.log(error);
      }
    }
  },

  removeFile(route, req, res) {
    var body = view_service.checkAccessRights(route, req, res, null, false);

    if (body != null && body.hasError) {
      if (typeof body.redirectUri != "undefined") {
        return res.status(403).send(Object.assign({}, {
          redirect: body.redirectUri
        }));
      }
    }

    var params = req.body;

    if (process.env.AWS_ENV != "true") {
      rimraf.sync("." + params.file);
      res.status(200).send("File was successfully removed");
    } else {
      var s3 = awsS3Uploads.init();
      var file = params.file;
      var s3Params;
      var fileRemoveQuery;

      var removeCurrent = () => {
        s3Params = {
          Bucket: "".concat(global.S3_BUCKET),
          Key: "".concat(global.CMS_TITLE, "/").concat(global.UPLOAD_FOLDER).concat(file)
        };
        fileRemoveQuery = s3.deleteObject(s3Params, function (err, data) {
          if (err) console.log(err, err.stack);else console.log();
        }).promise();
        fileRemoveQuery.then(resolve => {
          res.status(200).send("File was successfully removed");
        });
      };

      if (path.extname(params.file).length == 0) {
        file = file + "/";
        var s3FS = awsS3Uploads.initS3FS();
        var deleteArray = [];
        s3FS.readdir(file, (err, files) => {
          if (files.length > 0) {
            files.map((f, index) => {
              deleteArray.push({
                Key: "".concat(global.CMS_TITLE, "/").concat(global.UPLOAD_FOLDER).concat(file).concat(f)
              });
            });
          }

          if (deleteArray.length > 0) {
            s3Params = {
              Bucket: "".concat(global.S3_BUCKET),
              Delete: {
                Objects: deleteArray
              }
            };
            fileRemoveQuery = s3.deleteObjects(s3Params, function (err, data) {
              if (err) console.log(err, err.stack);else console.log();
            }).promise();
            fileRemoveQuery.then(result => {
              removeCurrent();
            });
          } else {
            removeCurrent();
          }
        });
      } else {
        removeCurrent();
      }
    }
  },

  compressFiles: (req, res, resolve) => {
    try {
      fs.readFile(process.env.AWS_ENV == "true" ? path.resolve(root_path + '/../' + req.file.path) : path.resolve(root_path + '/' + req.file.path), /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (err, data) {
          var buf = yield imagemin.buffer(data, {
            plugins: [imageminMozjpeg({
              quality: 60
            }), imageminOptipng({
              optimizationLevel: 3
            }), imageminSvgo(), imageminGifsicle({
              optimizationLevel: 3
            })]
          });

          try {
            fs.writeFile(process.env.AWS_ENV == "true" ? path.resolve(root_path + '/../' + req.file.path) : path.resolve(root_path + '/' + req.file.path), buf, function (err) {
              if (err) {
                console.log(err);
              }

              if (resolve != null) {
                resolve();
              }
            });
          } catch (error) {
            console.log(error);
          }
        });

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    } catch (error) {
      console.log(error);
    }
  }
};