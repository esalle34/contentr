"use strict";

//Webpack Config
//Author - Eric Salle

/* Centralisation des child modules */
var path = require("path");

var global = require(path.resolve("./global"))();

var themeJSConfig = require(path.resolve(path.normalize(global.WEBPACK_MODULES_DIRECTORY + "theme-js-module.js")));

var themeCSSConfig = require(path.resolve(path.normalize(global.WEBPACK_MODULES_DIRECTORY + "theme-css-module.js")));

module.exports = [themeJSConfig(), themeCSSConfig()];