//Theme - Module
//Author - Eric Salle

/* Traitements côté client && theming. cf ressources statiques sur routing.js */

var path = require('path');
let PUBLIC_CSS_DIR = "/css";
let PUBLIC_JS_DIR = "/js";
let PUBLIC_FONTS_DIR = "/assets/fonts";
let PUBLIC_IMG_DIR = "/assets/images";
let PUBLIC_VIDEOS_DIR = "/assets/videos";
let PUBLIC_PDF_DIR = "/assets/pdf";
let PUBLIC_HTML_DIR = "/views/html/public";
let FAVICON = PUBLIC_IMG_DIR + "/favicon.ico";
let DEFAULT_SITE_TITLE = "Contentr | Dev";

export const init = function () {

	const _theme = {


		PUBLIC_CSS_DIR: PUBLIC_CSS_DIR,
		PUBLIC_JS_DIR: PUBLIC_JS_DIR,
		PUBLIC_FONTS_DIR: PUBLIC_FONTS_DIR,
		PUBLIC_IMG_DIR: PUBLIC_IMG_DIR,
		PUBLIC_VIDEOS_DIR: PUBLIC_VIDEOS_DIR,
		PUBLIC_PDF_DIR: PUBLIC_PDF_DIR,
		PUBLIC_HTML_DIR: PUBLIC_HTML_DIR,
		FAVICON: FAVICON

	}

	return _theme;

}

export const theme_config = function () {

	const _theme_config = {

		title: DEFAULT_SITE_TITLE,
		charset: "utf-8"

	}

	return _theme_config;


}

export const theme_config_default = function () {

	const _theme_config_default = {

		title: DEFAULT_SITE_TITLE,
		charset: "utf-8"

	}

	return _theme_config_default;


}

export const theme_list = ()=>{

	const _list = {

		main: ["vendors", "app"],
		office: ["office-vendors", "office-app"],

	};

	return _list;

}

export const root_folder_list = ()=>{

	const _list = {

		views : { title : "views", uri : '/views/html/public'},
		image : { title : "images", uri : '/assets/images/custom'},
		video : { title : "videos", uri : '/assets/videos/custom'},
		pdf : { title : "pdf", uri : '/assets/pdf'},


	};

	return _list;

}

export const default_root_folder_list = ()=>{

	const _list = [

		"/assets/fonts/",
		"/assets/images/default/",
		"/assets/images/banner/"


	];

	return _list;

}


export const theme_css = function (theme) {


	const list = theme_list();
	const _theme_css = [];

	list[theme].map(function (css_stylesheet_name) {

		_theme_css.push(PUBLIC_CSS_DIR + "/" + css_stylesheet_name + ".min.css");


	})

	return _theme_css;

}

export const theme_js = function (theme) {

	const list = theme_list();
	const _theme_js = [];

	list[theme].map(function (js_name) {

		_theme_js.push(PUBLIC_JS_DIR + "/" + js_name + ".min.js");


	})

	return _theme_js;


}








