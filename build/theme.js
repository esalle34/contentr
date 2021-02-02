"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.theme_js = exports.theme_css = exports.theme_config_default = exports.theme_config = exports.init = void 0;

//Theme - Module
//Author - Eric Salle

/* Traitements côté client && theming. cf ressources statiques sur routing.js */
var path = require('path');

var PUBLIC_CSS_DIR = "/css";
var PUBLIC_JS_DIR = "/js";
var PUBLIC_FONTS_DIR = "/assets/fonts";
var PUBLIC_IMG_DIR = "/assets/images";
var FAVICON = PUBLIC_IMG_DIR + "/favicon.ico";

var DEFAULT_SITE_TITLE = require(path.resolve('./build/global'))().DEFAULT_SITE_TITLE;

var init = function init() {
  var _theme = {
    PUBLIC_CSS_DIR: PUBLIC_CSS_DIR,
    PUBLIC_JS_DIR: PUBLIC_JS_DIR,
    PUBLIC_FONTS_DIR: PUBLIC_FONTS_DIR,
    PUBLIC_IMG_DIR: PUBLIC_IMG_DIR,
    FAVICON: FAVICON
  };
  return _theme;
};

exports.init = init;

var theme_config = function theme_config() {
  var _theme_config = {
    title: DEFAULT_SITE_TITLE,
    charset: "utf-8"
  };
  return _theme_config;
};

exports.theme_config = theme_config;

var theme_config_default = function theme_config_default() {
  var _theme_config_default = {
    title: DEFAULT_SITE_TITLE,
    charset: "utf-8"
  };
  return _theme_config_default;
};

exports.theme_config_default = theme_config_default;

var theme_css = function theme_css(theme) {
  var list = {
    main: ["vendors", "app"],
    office: ["office-vendors", "office-app"]
  };
  var _theme_css = [];
  list[theme].map(function (css_stylesheet_name) {
    _theme_css.push(PUBLIC_CSS_DIR + "/" + css_stylesheet_name + ".min.css");
  });
  return _theme_css;
};

exports.theme_css = theme_css;

var theme_js = function theme_js(theme) {
  var list = {
    main: ["vendors", "app"],
    office: ["office-vendors", "office-app"]
  };
  var _theme_js = [];
  list[theme].map(function (js_name) {
    _theme_js.push(PUBLIC_JS_DIR + "/" + js_name + ".min.js");
  });
  return _theme_js;
};

exports.theme_js = theme_js;