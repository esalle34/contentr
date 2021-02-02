"use strict";

//Configuation du reload
//Author - Eric Salle
var path = require("path");

var global = require(path.resolve('./global.js'))();

var nodemon = require('nodemon');

var livereload = require("livereload");

var {
  exec
} = require('child_process');

module.exports = function () {
  var _instance = {
    init: function init() {
      var liveReloadServer = livereload.createServer();
      liveReloadServer.watch(__dirname + "\\");
      nodemon({
        script: __dirname + '\\server.js',
        ignore: ['*.min.js', '*.tpl.js', "/build/**"],
        ext: 'sass jsx js json'
      });
      global.INSTANCE_IS_INIT = !global.INSTANCE_IS_INIT;
    },
    isInit: function isInit() {
      return global.INSTANCE_IS_INIT;
    },
    startlisteners: function startlisteners() {
      nodemon.on('start', function () {
        console.log("L'app est en cours de lancement.");
      }).on('quit', function () {
        console.log("L'app va s'arrêter.");
        process.exit();
      }).on('restart', function (files) {
        var css_proc = "";
        var jsx_proc = "";
        var global_proc = "";
        var cmd;
        files.map(function (file) {
          switch (file.substr(file.lastIndexOf('.') + 1)) {
            case "jsx":
              jsx_proc = "theme-js";
              break;

            case "sass":
              css_proc = "theme-css";
              break;
          }

          if (typeof cmd == "undefined") {
            if ((css_proc && jsx_proc) != "") {
              cmd = "npm run ".concat(process.env.NODE_ENV, "-process");
              global_proc = "all-config";
            } else if ((css_proc || jsx_proc) != "") {
              cmd = "webpack --mode ".concat(process.env.NODE_ENV, " --config-name ").concat(css_proc, " ").concat(jsx_proc);
            }
          }
        });

        if (typeof cmd != "undefined") {
          var process_cmd = exec("".concat(cmd), function (error, stdout, stderr) {
            console.log(stdout + stderr);
          });
          console.log("Traitement des pre-process en cours en mode : ".concat(global_proc, " ").concat(process.env.NODE_ENV, " ").concat(jsx_proc, " ").concat(css_proc));
        }

        console.log('App en cours de redémarrage suite au traitement de : ', files);
      });
    }
  };
  return _instance;
};