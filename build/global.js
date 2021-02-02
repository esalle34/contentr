"use strict";

//Global - Module
//Author : Eric Salle

/* Traitements côté serveur. */
//Global variables
var path = require("path");

var INSTANCE_IS_INIT;
var LOCATION;
var DEFAULT_SITE_TITLE = "Eric Salle | Développeur";
var CMS_TITLE = "Contentr";
var DEFAULT_SITE_LANGUAGE = "fr_FR";
var PROJECT_DIR = path.resolve(__dirname);
var HTML_DIR = process.env.NODE_SRC == "build/" ? __dirname + "/../views/html/" : __dirname + "/views/html/";
var TRANSACTION_DIR = path.resolve(__dirname + "/operations");
var BACKEND_MODULE_DIR = "/operations/modules/mandatory";
var BACKEND_MODULE_DIR_SQL = "/operations/modules/mandatory";
var LOGIN_PATH = "/administrate/login";
var ROUTE_PERMISSIONS_PREFIX = "mandatory";
var HOME_PATH = "/"; //MODULE DIR

var MODULE_VIEW = PROJECT_DIR + BACKEND_MODULE_DIR + "/views";
var MODULE_FORM = PROJECT_DIR + BACKEND_MODULE_DIR + "/form";
var MODULE_USERS = PROJECT_DIR + BACKEND_MODULE_DIR + "/users";
var MODULE_ADMIN = PROJECT_DIR + BACKEND_MODULE_DIR + "/administration";
var MODULE_I18N = PROJECT_DIR + BACKEND_MODULE_DIR + "/i18n"; //Storage

var JSON_DATA_STORAGE = process.env.NODE_SRC == "build/" ? PROJECT_DIR + "/../" + BACKEND_MODULE_DIR + "/data" : PROJECT_DIR + BACKEND_MODULE_DIR + "/data"; //Webpack inputs && SSR

var DEV_CSS_DIR = __dirname + "/components/css/";
var DEV_JSX_DIR = __dirname + "/components/jsx/";
var DEV_JSX_SSR_DIR = __dirname + "/components/jsx/templates/"; //Webpack outputs

var SERVER_CSS_DIR = __dirname + "/dist/css/";
var SERVER_JS_DIR = __dirname + "/dist/js/";
var SERVER_FONTS_DIR = __dirname + "/assets/fonts/"; //Build Directories

var BUILD_SERVER_CSS_DIR = process.env.NODE_SRC == "build/" ? __dirname + "/../dist/css/" : __dirname + "/dist/css/";
var BUILD_SERVER_JS_DIR = process.env.NODE_SRC == "build/" ? __dirname + "/../dist/js/" : __dirname + "/dist/js/";
var BUILD_SERVER_FONTS_DIR = process.env.NODE_SRC == "build/" ? __dirname + "/../assets/fonts/" : __dirname + "/assets/fonts/";
var BUILD_SERVER_IMG_DIR = process.env.NODE_SRC == "build/" ? __dirname + "/../assets/images/" : __dirname + "/assets/images/";
var WEBPACK_FONTS_OUTPUT = "../../assets/fonts"; //Webpack extensions

var WEBPACK_MODULES_DIRECTORY = __dirname + "/webpack-modules/";

module.exports = function () {
  var _global = {
    DEFAULT_SITE_TITLE: DEFAULT_SITE_TITLE,
    CMS_TITLE: CMS_TITLE,
    DEFAULT_SITE_LANGUAGE: DEFAULT_SITE_LANGUAGE,
    PROJECT_DIR: PROJECT_DIR,
    HTML_DIR: HTML_DIR,
    TRANSACTION_DIR: TRANSACTION_DIR,
    BACKEND_MODULE_DIR: BACKEND_MODULE_DIR,
    BACKEND_MODULE_DIR_SQL: BACKEND_MODULE_DIR_SQL,
    LOGIN_PATH: LOGIN_PATH,
    ROUTE_PERMISSIONS_PREFIX: ROUTE_PERMISSIONS_PREFIX,
    HOME_PATH: HOME_PATH,
    MODULE_VIEW: MODULE_VIEW,
    MODULE_FORM: MODULE_FORM,
    MODULE_USERS: MODULE_USERS,
    MODULE_ADMIN: MODULE_ADMIN,
    MODULE_I18N: MODULE_I18N,
    JSON_DATA_STORAGE: JSON_DATA_STORAGE,
    DEV_CSS_DIR: DEV_CSS_DIR,
    DEV_JSX_DIR: DEV_JSX_DIR,
    DEV_JSX_SSR_DIR: DEV_JSX_SSR_DIR,
    BUILD_SERVER_CSS_DIR: BUILD_SERVER_CSS_DIR,
    BUILD_SERVER_JS_DIR: BUILD_SERVER_JS_DIR,
    BUILD_SERVER_FONTS_DIR: BUILD_SERVER_FONTS_DIR,
    BUILD_SERVER_IMG_DIR: BUILD_SERVER_IMG_DIR,
    SERVER_CSS_DIR: SERVER_CSS_DIR,
    SERVER_JS_DIR: SERVER_JS_DIR,
    SERVER_FONTS_DIR: SERVER_FONTS_DIR,
    WEBPACK_MODULES_DIRECTORY: WEBPACK_MODULES_DIRECTORY,
    WEBPACK_FONTS_OUTPUT: WEBPACK_FONTS_OUTPUT
  };
  return _global;
};