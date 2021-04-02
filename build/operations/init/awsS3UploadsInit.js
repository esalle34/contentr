"use strict";

var path = require('path');

var global = require(path.resolve("./".concat(process.env.NODE_SRC, "global")))();

var rootFolders = require(path.resolve("./".concat(process.env.NODE_SRC, "theme"))).root_folder_list();

var defaultRootFolders = require(path.resolve("./".concat(process.env.NODE_SRC, "theme"))).default_root_folder_list();

var S3FS = require('s3fs');

var fs = require("fs");

var mime = require('mime-types');

module.exports = {
  init: () => {
    var AWS = require("aws-sdk");

    var s3;

    if (process.env.AWS_ENV != "true") {
      AWS.config.loadFromPath("".concat(process.env.NODE_SRC, "credentials.json"));
      s3 = new AWS.S3();
    } else {
      AWS.config.update({
        region: global.AWS_REGION,
        "accessKeyId": process.env.AWSAccessKeyId,
        "secretAccessKey": process.env.AWSSecretKey
      });
      s3 = new AWS.S3({
        apiVersion: "2006-03-01"
      });
    }

    return s3;
  },
  initS3FS: () => {
    var s3fsImpl;

    if (process.env.AWS_ENV != "true") {
      s3fsImpl = new S3FS("".concat(global.S3_BUCKET, "/").concat(global.CMS_TITLE, "/").concat(global.UPLOAD_FOLDER), {
        accessKeyId: require(path.resolve("".concat(process.env.NODE_SRC, "credentials.json"))).accessKeyId,
        secretAccessKey: require(path.resolve("".concat(process.env.NODE_SRC, "credentials.json"))).secretAccessKey,
        signatureVersion: 'v4'
      });
    } else if (process.env.AWS_ENV == "true") {
      s3fsImpl = new S3FS("".concat(global.S3_BUCKET, "/").concat(global.CMS_TITLE, "/").concat(global.UPLOAD_FOLDER), {
        accessKeyId: process.env.AWSAccessKeyId,
        secretAccessKey: process.env.AWSSecretKey,
        signatureVersion: 'v4'
      });
    }

    return s3fsImpl;
  },
  createRootUploadFolder: function createRootUploadFolder(s3) {
    var bucketParams = {
      Bucket: global.S3_BUCKET,
      Prefix: "".concat(global.CMS_TITLE, "/").concat(global.UPLOAD_FOLDER)
    }; // Call S3 to obtain a list of the objects in the bucket

    s3.listObjectsV2(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        if (data.Contents.length == 0) {
          var params = {
            Bucket: global.S3_BUCKET,
            Key: "".concat(global.CMS_TITLE, "/").concat(global.UPLOAD_FOLDER, "/"),
            ACL: "public-read-write",
            Body: ""
          };
          s3.upload(params, function (err, data) {
            if (err) {
              console.log("Error creating the folder: ", err);
            } else {
              console.log("Successfully created a uploaded-files folder on S3");
            }
          });
          var folderUploadQuery = new Promise((resolve, reject) => {
            var _loop = function _loop(folder) {
              params = Object.assign({}, params, {
                Key: "".concat(global.CMS_TITLE, "/").concat(global.UPLOAD_FOLDER).concat(rootFolders[folder].uri, "/")
              });
              s3.upload(params, function (err, data) {
                if (err) {
                  console.log("Error creating the folder: ", err);
                } else {
                  console.log("Successfully created ".concat(global.CMS_TITLE, "/").concat(global.UPLOAD_FOLDER).concat(rootFolders[folder].uri, "/ on S3"));
                }
              });
              resolve();
            };

            for (var folder in rootFolders) {
              _loop(folder);
            }
          });

          try {
            folderUploadQuery.then(res => {
              uploadDefaults(s3);
            });
          } catch (error) {
            console.log(error);
          }
        }

        console.log("Success", data);
      }
    });
  },
  uploadDefaults: s3 => {
    defaultRootFolders.map(def => {
      fs.readdir(path.resolve(process.env.NODE_SRC == "build/" ? "".concat(process.env.NODE_SRC, "../").concat(def) : "".concat(process.env.NODE_SRC).concat(def)), (err, filenames) => {
        filenames.map(file => {
          var filemime = mime.lookup(file);
          var stream = fs.createReadStream(process.env.NODE_SRC == "build/" ? "".concat(process.env.NODE_SRC, "../").concat(def).concat(file) : "".concat(process.env.NODE_SRC).concat(def).concat(file));
          var params = {
            Bucket: global.S3_BUCKET,
            Key: "".concat(global.CMS_TITLE, "/").concat(global.UPLOAD_FOLDER).concat(def).concat(file),
            ACL: "public-read-write",
            Body: stream,
            ContentType: filemime
          };
          s3.upload(params, function (err, data) {
            if (err) {
              console.log("Error creating the folder: ", err);
            } else {
              console.log("Successfully created ".concat(global.CMS_TITLE, "/").concat(global.UPLOAD_FOLDER).concat(def).concat(file, " on S3"));
            }
          });
        });
      });
    });
  }
};
var uploadDefaults = module.exports.uploadDefaults;