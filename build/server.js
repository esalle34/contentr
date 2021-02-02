"use strict";

//Server
//Author - Eric Salle
var http = require("http");

var path = require("path");

var express = require("express");

var session = require('express-session');

var MySQLStore = require('express-mysql-session')(session);

var {
  v4: uuidv4
} = require('uuid');

var routing = require(path.resolve("./".concat(process.env.NODE_SRC, "routing")));

var multer = require('multer')();

var global = require(path.resolve("./".concat(process.env.NODE_SRC, "global")))();

var global_transaction = require(global.TRANSACTION_DIR + '/global_transactions.js')();

var i18n = require(path.resolve(global.MODULE_I18N + "/services/index")).i18n;

var options = {
  host: process.env.NODE_ENV != "development" && process.env.NODE_ENV != "production" ? global_transaction.AWS_DB_HOST : global_transaction.LOCAL_DB_HOST,
  port: global_transaction.DB_PORT,
  user: global_transaction.DB_USER,
  password: global_transaction.DB_PWD,
  database: global_transaction.DB_NAME
};
var sessionStore = new MySQLStore(options);
var app = express();
var routes = routing(app, express, i18n);
app.use(session({
  genid: function genid(req) {
    return uuidv4();
  },
  store: sessionStore,
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(express.json());
app.use(multer.array());
app.use(express.urlencoded({
  extended: true
}));
var server = http.createServer(app);
server.listen(process.env.PORT, process.env.IP);