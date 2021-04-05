"use strict";

//Routing - Module
//Author - Eric Salle
var path = require('path');

var global = require(path.resolve("./".concat(process.env.NODE_SRC, "global")))();

var theme = require(path.resolve("./".concat(process.env.NODE_SRC, "theme"))).init();

var db_transaction = require(path.resolve("./".concat(process.env.NODE_SRC, "db_transaction")))();

var routeBuilder = require(path.resolve("./".concat(process.env.NODE_SRC, "operations/init/routeBuilder")));

var views = require(path.resolve("./".concat(process.env.NODE_SRC, "operations/modules/mandatory/views/view_service")));

var favicon = require('serve-favicon');

module.exports = function (app, express, i18n) {
  var connection = db_transaction.init();
  db_transaction.db_use(connection).then(() => {
    db_transaction.db_query(connection, routeBuilder.getAllRoutes()).then(routes => {
      db_transaction.end(connection);
      var q = new Promise((resolve, reject) => {
        routes.map(function (route) {
          routeBuilder.buildRouteAsApi(route, app, i18n);
          routeBuilder.buildRoute(route, app, i18n);
          resolve();
        });
      }); //map 404 routes :

      q.then(res => {
        routeBuilder.build404Routes(app, i18n);
      });
      console.log("L'app est lancée.");
    }).catch(error => {
      console.log("Erreur lors de la génération des routes : " + error);
    });
  }).catch(error => {
    console.log(error);
  });
  ;
  /* PUBLIC : Répertoire visible par le client (theme.js),
  SERVER : Lu par le serveur (global.js) */

  app.use(theme.PUBLIC_JS_DIR, express.static(global.BUILD_SERVER_JS_DIR));
  app.use(theme.PUBLIC_CSS_DIR, express.static(global.BUILD_SERVER_CSS_DIR));
  app.use(favicon(global.BUILD_SERVER_FAVICON));

  if (process.env.AWS_ENV) {
    //s3 Repository for AWS ENV
    routeBuilder.buildS3RewritedFilesRoute(app, i18n);
  } else {
    //Local development
    app.use(theme.PUBLIC_FONTS_DIR, express.static(global.BUILD_SERVER_FONTS_DIR));
    app.use(theme.PUBLIC_IMG_DIR, express.static(global.BUILD_SERVER_IMG_DIR));
    app.use(theme.PUBLIC_VIDEOS_DIR, express.static(global.BUILD_SERVER_VIDEOS_DIR));
    app.use(theme.PUBLIC_PDF_DIR, express.static(global.BUILD_SERVER_PDF_DIR));
    app.use(theme.PUBLIC_HTML_DIR, express.static(global.BUILD_SERVER_HTML_PUBLIC_DIR));
  }

  return app;
};