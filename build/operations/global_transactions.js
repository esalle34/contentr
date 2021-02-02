"use strict";

//Module Global - Transaction
//Author - Eric Salle
//Variables de la couche transactionnelle :
var path = require('path');

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var DB_PORT = 3306;
var LOCAL_SA_DB_ROOT = "root";
var LOCAL_SA_DB_PWD = "root";
var LOCAL_DB_HOST = "localhost";
var AWS_SA_DB_ROOT = "cl_admin";
var AWS_SA_DB_PWD = "awsadmin34!!";
var AWS_DB_HOST = "contentr-dev.csqdkow3e3ni.eu-west-3.rds.amazonaws.com";
var DB_USER = "esalle";
var DB_PWD = "esalle@34!!!";
var DB_MAIL = "admin@example.com";
var DB_NAME = "eric_salle_pro";
var DB_ROLE = "admin_users";
var DEFAULT_SITE_TITLE = "Eric Salle | Développeur";
var ROUTE_PERMISSIONS_PREFIX;
var BACKEND_MODULE_DIR = global.ROUTE_PERMISSIONS_PREFIX;

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