"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.theme_js = exports.theme_css = exports.default_root_folder_list = exports.root_folder_list = exports.theme_list = exports.theme_config_default = exports.theme_config = exports.init = void 0;

//Theme - Module
//Author - Eric Salle

/* Traitements côté client && theming. cf ressources statiques sur routing.js */
var path = require('path');

var PUBLIC_CSS_DIR = "/css";
var PUBLIC_JS_DIR = "/js";
var PUBLIC_FONTS_DIR = "/assets/fonts";
var PUBLIC_IMG_DIR = "/assets/images";
var PUBLIC_VIDEOS_DIR = "/assets/videos";
var PUBLIC_PDF_DIR = "/assets/pdf";
var PUBLIC_HTML_DIR = "/views/html/public";
var FAVICON = PUBLIC_IMG_DIR + "/favicon.ico";
var DEFAULT_SITE_TITLE = "Contentr | Dev";

var init = function init() {
  var _theme = {
    PUBLIC_CSS_DIR: PUBLIC_CSS_DIR,
    PUBLIC_JS_DIR: PUBLIC_JS_DIR,
    PUBLIC_FONTS_DIR: PUBLIC_FONTS_DIR,
    PUBLIC_IMG_DIR: PUBLIC_IMG_DIR,
    PUBLIC_VIDEOS_DIR: PUBLIC_VIDEOS_DIR,
    PUBLIC_PDF_DIR: PUBLIC_PDF_DIR,
    PUBLIC_HTML_DIR: PUBLIC_HTML_DIR,
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

var theme_list = () => {
  var _list = {
    main: ["vendors", "app"],
    office: ["office-vendors", "office-app"]
  };
  return _list;
};

exports.theme_list = theme_list;

var root_folder_list = () => {
  var _list = {
    views: {
      title: "views",
      uri: '/views/html/public'
    },
    image: {
      title: "images",
      uri: '/assets/images/custom'
    },
    video: {
      title: "videos",
      uri: '/assets/videos/custom'
    },
    pdf: {
      title: "pdf",
      uri: '/assets/pdf'
    }
  };
  return _list;
};

exports.root_folder_list = root_folder_list;

var default_root_folder_list = () => {
  var _list = ["/assets/fonts/", "/assets/images/default/", "/assets/images/banner/"];
  return _list;
};

exports.default_root_folder_list = default_root_folder_list;

var theme_css = function theme_css(theme) {
  var list = theme_list();
  var _theme_css = [];
  list[theme].map(function (css_stylesheet_name) {
    _theme_css.push(PUBLIC_CSS_DIR + "/" + css_stylesheet_name + ".min.css");
  });
  return _theme_css;
};

exports.theme_css = theme_css;

var theme_js = function theme_js(theme) {
  var list = theme_list();
  var _theme_js = [];
  list[theme].map(function (js_name) {
    _theme_js.push(PUBLIC_JS_DIR + "/" + js_name + ".min.js");
  });
  return _theme_js;
};

exports.theme_js = theme_js;