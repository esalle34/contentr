//Global - Module
//Author : Eric Salle

/* Traitements côté serveur. */

//Global variables

const path = require("path");

let DEFAULT_SITE_TITLE = "Contentr | Dev";
let CMS_TITLE = "Contentr";
let DEFAULT_SITE_LANGUAGE = "fr-FR";
let PROJECT_DIR = path.dirname(require.main.filename);
let HTML_DIR = process.env.NODE_SRC == "build/" ? __dirname + "/../views/html/" : __dirname + "/views/html/";
let TRANSACTION_DIR = path.resolve(__dirname + "/operations");
let BACKEND_MODULE_DIR = "/operations/modules/mandatory";
let BACKEND_MODULE_DIR_SQL = "/operations/modules/mandatory";
let LOGIN_PATH = "/administrate/login";
let ROUTE_PERMISSIONS_PREFIX = "mandatory";
let HOME_PATH = "/";
let config;
try{
	config = require(path.resolve(PROJECT_DIR + "/config.json"));
}catch(error){
	
}
let AWS_REGION = typeof config != "undefined" ? config.AWS_REGION : process.env.AWS_REGION;
let AWS_REPO = typeof config != "undefined" ? config.AWS_REPO : process.env.AWS_REPO;
let S3_BUCKET = typeof config != "undefined" ? config.S3_BUCKET : process.env.S3_BUCKET;
let AUTO_SCALING_GROUP_NAME = typeof config != "undefined" ? config.AUTO_SCALING_GROUP_NAME : process.env.AUTO_SCALING_GROUP_NAME;
let UPLOAD_FOLDER = "uploaded-files";
let DEFAULT_SEARCH_ITEMS = 10;

//MODULE DIR

let MODULE_VIEW = PROJECT_DIR + BACKEND_MODULE_DIR + "/views";
let MODULE_FORM = PROJECT_DIR + BACKEND_MODULE_DIR + "/form";
let MODULE_USERS = PROJECT_DIR + BACKEND_MODULE_DIR + "/users";
let MODULE_ADMIN = PROJECT_DIR + BACKEND_MODULE_DIR + "/administration";
let MODULE_ROUTES = MODULE_ADMIN + "/route";
let MODULE_CONTENT = MODULE_ADMIN + "/content";
let MODULE_CONTENT_TYPES = MODULE_CONTENT + "/types";
let MODULE_I18N = PROJECT_DIR + BACKEND_MODULE_DIR + "/i18n";
let MODULE_UPLOAD = PROJECT_DIR + BACKEND_MODULE_DIR + "/content";

//Storage

let JSON_DATA_STORAGE = process.env.NODE_SRC == "build/" ? PROJECT_DIR +"/../"+ BACKEND_MODULE_DIR + "/data" : PROJECT_DIR + BACKEND_MODULE_DIR + "/data";

//Webpack inputs && SSR

let DEV_CSS_DIR = __dirname + "/components/css/";
let DEV_JSX_DIR = __dirname + "/components/jsx/";
let DEV_JSX_SSR_DIR = __dirname + "/components/jsx/templates/";

//Webpack outputs

let SERVER_CSS_DIR = __dirname + "/dist/css/";
let SERVER_JS_DIR = __dirname + "/dist/js/";
let SERVER_FONTS_DIR = __dirname + "/assets/fonts/";

//Build Directories

let BUILD_SERVER_CSS_DIR = process.env.NODE_SRC == "build/" ? __dirname + "/../dist/css/" : __dirname + "/dist/css/";
let BUILD_SERVER_JS_DIR = process.env.NODE_SRC == "build/" ? __dirname + "/../dist/js/" : __dirname + "/dist/js/";
let BUILD_SERVER_FONTS_DIR = process.env.NODE_SRC == "build/" ? __dirname + "/../assets/fonts/" : __dirname + "/assets/fonts/";
let BUILD_SERVER_IMG_DIR = process.env.AWS_ENV ? __dirname + "/../assets/images/" : __dirname + "/assets/images/";
let BUILD_SERVER_FAVICON = process.env.AWS_ENV ? __dirname + "/../favicon.ico" : __dirname + "/favicon.ico";
let BUILD_SERVER_VIDEOS_DIR = process.env.AWS_ENV ? __dirname + "/../assets/videos/" : __dirname + "/assets/videos/";
let BUILD_SERVER_PDF_DIR = process.env.AWS_ENV ? __dirname + "/../assets/pdf/" : __dirname + "/assets/pdf/";
let BUILD_SERVER_HTML_PUBLIC_DIR = process.env.AWS_ENV ? __dirname + "/../views/html/public/" : __dirname + "/views/html/public/";
let WEBPACK_FONTS_OUTPUT = "../../assets/fonts";


//Webpack extensions 

let WEBPACK_MODULES_DIRECTORY =  __dirname + "/webpack-modules/";


module.exports = function(){

		const _global = {

				DEFAULT_SITE_TITLE : DEFAULT_SITE_TITLE,
				CMS_TITLE : CMS_TITLE,
				DEFAULT_SITE_LANGUAGE : DEFAULT_SITE_LANGUAGE,
				PROJECT_DIR : PROJECT_DIR,
				HTML_DIR : HTML_DIR,
				TRANSACTION_DIR : TRANSACTION_DIR,
				BACKEND_MODULE_DIR : BACKEND_MODULE_DIR,
				BACKEND_MODULE_DIR_SQL : BACKEND_MODULE_DIR_SQL,
				LOGIN_PATH : LOGIN_PATH,
				ROUTE_PERMISSIONS_PREFIX : ROUTE_PERMISSIONS_PREFIX,
				HOME_PATH : HOME_PATH,
				AWS_REGION : AWS_REGION,
				AWS_REPO : AWS_REPO,
				S3_BUCKET : S3_BUCKET,
				AUTO_SCALING_GROUP_NAME : AUTO_SCALING_GROUP_NAME,
				UPLOAD_FOLDER : UPLOAD_FOLDER,
				DEFAULT_SEARCH_ITEMS : DEFAULT_SEARCH_ITEMS,
				MODULE_VIEW : MODULE_VIEW,
				MODULE_FORM : MODULE_FORM,
				MODULE_USERS : MODULE_USERS,
				MODULE_ADMIN : MODULE_ADMIN,
				MODULE_I18N : MODULE_I18N,
				MODULE_ROUTES : MODULE_ROUTES,
				MODULE_CONTENT : MODULE_CONTENT,
				MODULE_CONTENT_TYPES : MODULE_CONTENT_TYPES,
				MODULE_UPLOAD : MODULE_UPLOAD,
				JSON_DATA_STORAGE : JSON_DATA_STORAGE,
				DEV_CSS_DIR : DEV_CSS_DIR,
				DEV_JSX_DIR : DEV_JSX_DIR,
				DEV_JSX_SSR_DIR : DEV_JSX_SSR_DIR,
				BUILD_SERVER_CSS_DIR : BUILD_SERVER_CSS_DIR,
				BUILD_SERVER_JS_DIR : BUILD_SERVER_JS_DIR,
				BUILD_SERVER_FONTS_DIR : BUILD_SERVER_FONTS_DIR,
				BUILD_SERVER_IMG_DIR : BUILD_SERVER_IMG_DIR,
				BUILD_SERVER_FAVICON : BUILD_SERVER_FAVICON,
				BUILD_SERVER_VIDEOS_DIR : BUILD_SERVER_VIDEOS_DIR,
				BUILD_SERVER_PDF_DIR : BUILD_SERVER_PDF_DIR,
				BUILD_SERVER_HTML_PUBLIC_DIR : BUILD_SERVER_HTML_PUBLIC_DIR,
				SERVER_CSS_DIR : SERVER_CSS_DIR,
				SERVER_JS_DIR : SERVER_JS_DIR,
				SERVER_FONTS_DIR : SERVER_FONTS_DIR,
				WEBPACK_MODULES_DIRECTORY : WEBPACK_MODULES_DIRECTORY,
				WEBPACK_FONTS_OUTPUT : WEBPACK_FONTS_OUTPUT,

		}

		return _global;

}

