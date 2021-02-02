"use strict";

//Routing - Module
//Author - Eric Salle
var path = require('path');

var global = require(path.resolve("./".concat(process.env.NODE_SRC, "global")))();

var theme = require(path.resolve("./".concat(process.env.NODE_SRC, "theme"))).init();

var db_transaction = require(path.resolve("./".concat(process.env.NODE_SRC, "db_transaction")))();

var routing = require(path.resolve("./".concat(process.env.NODE_SRC, "operations/init/routes"))).getAllRoutes();

var views = require(path.resolve("./".concat(process.env.NODE_SRC, "operations/modules/mandatory/views/view_service")));

var favicon = require('serve-favicon');

module.exports = function (app, express, i18n) {
  var connection = db_transaction.init();
  db_transaction.db_use(connection).then(() => {
    db_transaction.db_query(connection, routing).then(routes => {
      routes.map(function (route) {
        app[route.method](route.uri, (req, res) => {
          var acceptLanguage = 'Accept-Language: ' + req.acceptsLanguages();

          if (req.acceptsLanguages() != "*") {
            acceptLanguage = acceptLanguage.split(':')[1].match(/[a-zA-Z\-]{4,10}/g) || [];
            acceptLanguage = acceptLanguage[0];
            acceptLanguage = acceptLanguage.slice(0, 3) + acceptLanguage.charAt(3).toUpperCase() + acceptLanguage.charAt(4).toUpperCase();
            acceptLanguage = typeof acceptLanguage != "undefined" ? acceptLanguage : i18n.getLang();
          } else {
            acceptLanguage = i18n.getLang();
          }

          route = Object.assign({}, route, {
            i18n: i18n,
            lang: acceptLanguage,
            isMs: false
          });

          if (route.callback != null) {
            try {
              var c = require(path.resolve(global.PROJECT_DIR + route.filepath + route.filename));

              c[route.callback](route, req, res);
            } catch (error) {
              return views.buildErrorView(route, req, res, error);
            }
          } else {
            views.buildView(route, req, res);
          }
        });
        app[route.method]("/api" + route.uri, (req, res) => {
          var acceptLanguage = 'Accept-Language: ' + req.headers["accept-language"];
          acceptLanguage = acceptLanguage.split(':')[1].match(/[a-zA-Z\-]{4,10}/g) || [];
          acceptLanguage = acceptLanguage[0];
          acceptLanguage = typeof acceptLanguage != "undefined" ? acceptLanguage : i18n.getLang();
          route = Object.assign({}, route, {
            i18n: i18n,
            lang: acceptLanguage,
            isMs: true
          });

          if (route.callback != null) {
            try {
              var c = require(path.resolve(global.PROJECT_DIR + route.filepath + route.filename));

              c[route.callback](route, req, res);
            } catch (error) {
              return views.buildErrorView(route, req, res, error);
            }
          } else {
            views.buildView(route, req, res);
          }
        });
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
  app.use(theme.PUBLIC_FONTS_DIR, express.static(global.BUILD_SERVER_FONTS_DIR));
  app.use(theme.PUBLIC_IMG_DIR, express.static(global.BUILD_SERVER_IMG_DIR));
  app.use(favicon(global.BUILD_SERVER_IMG_DIR + "/default/favicon.ico"));
  return app;
};