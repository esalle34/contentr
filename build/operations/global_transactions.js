"use strict";

//Module Global - Transaction
//Author - Eric Salle
//Variables de la couche transactionnelle :
var path = require('path');

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var config;

try {
  config = require(path.resolve(root_path + "/config.json"));
} catch (error) {}

var LOCAL_SA_DB_ROOT = typeof config != "undefined" ? config.LOCAL_SA_DB_ROOT : undefined;
var LOCAL_SA_DB_PWD = typeof config != "undefined" ? config.LOCAL_SA_DB_PWD : undefined;
;
var LOCAL_DB_HOST = typeof config != "undefined" ? config.LOCAL_DB_HOST : undefined;
var DB_PORT = typeof config != "undefined" ? config.DB_PORT : process.env.DB_PORT;
var AWS_SA_DB_ROOT = typeof config != "undefined" ? config.AWS_SA_DB_ROOT : process.env.AWS_SA_DB_ROOT;
var AWS_SA_DB_PWD = typeof config != "undefined" ? config.AWS_SA_DB_PWD : process.env.AWS_SA_DB_PWD;
var AWS_DB_HOST = typeof config != "undefined" ? config.AWS_DB_HOST : process.env.AWS_DB_HOST;
var DB_USER = typeof config != "undefined" ? config.DB_USER : process.env.DB_USER;
var DB_PWD = typeof config != "undefined" ? config.DB_PWD : process.env.DB_PWD;
var DB_MAIL = typeof config != "undefined" ? config.DB_MAIL : process.env.DB_MAIL;
var DB_NAME = typeof config != "undefined" ? config.DB_NAME : process.env.DB_NAME;
var DB_ROLE = typeof config != "undefined" ? config.DB_ROLE : process.env.DB_ROLE;

module.exports = function () {
  var _global_transactions = {
    DB_PORT: DB_PORT,
    LOCAL_SA_DB_ROOT: LOCAL_SA_DB_ROOT,
    LOCAL_SA_DB_PWD: LOCAL_SA_DB_PWD,
    LOCAL_DB_HOST: LOCAL_DB_HOST,
    AWS_SA_DB_ROOT: AWS_SA_DB_ROOT,
    AWS_SA_DB_PWD: AWS_SA_DB_PWD,
    AWS_DB_HOST: AWS_DB_HOST,
    DB_USER: DB_USER,
    DB_PWD: DB_PWD,
    DB_MAIL: DB_MAIL,
    DB_NAME: DB_NAME,
    DB_ROLE: DB_ROLE,
    DEFAULT_SITE_TITLE: global.DEFAULT_SITE_TITLE,
    BACKEND_MODULE_DIR: global.BACKEND_MODULE_DIR,
    ROUTE_PERMISSIONS_PREFIX: global.ROUTE_PERMISSIONS_PREFIX,
    BACKEND_MODULE_DIR_SQL: global.BACKEND_MODULE_DIR_SQL
  };
  return _global_transactions;
};