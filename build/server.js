"use strict";

//Server
//Author - Eric Salle
var http = require("http");

var path = require("path");

var express = require("express");

var session = require(path.resolve("./".concat(process.env.NODE_SRC, "operations/init/session")));

var awsS3Uploads = require(path.resolve("./".concat(process.env.NODE_SRC, "operations/init/awsS3UploadsInit")));

var routing = require(path.resolve("./".concat(process.env.NODE_SRC, "routing")));

var global = require(path.resolve("./".concat(process.env.NODE_SRC, "global")))();

var i18n = require(path.resolve(global.MODULE_I18N + "/services/index")).i18n;

var app = express();
session.init(app);
routing(app, express, i18n);
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
var server = http.createServer(app);
server.listen(process.env.PORT, process.env.IP);