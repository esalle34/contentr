"use strict";

var webpack = require('webpack');

var path = require('path');

var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var global = require("../global")();

var CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');

var {
  styles
} = require('@ckeditor/ckeditor5-dev-utils'); //Front-end


module.exports = function () {
  var conf = {
    name: "theme-js",
    entry: {
      "app": path.resolve(path.normalize(global.DEV_JSX_DIR + "app.jsx")),
      "office-app": path.resolve(path.normalize(global.DEV_JSX_DIR + "office-app.jsx")),
      "vendors": path.resolve(path.normalize(global.DEV_JSX_DIR + "vendors.jsx")),
      "office-vendors": path.resolve(path.normalize(global.DEV_JSX_DIR + "office-vendors.jsx"))
    },
    module: {
      rules: [{
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-flow", "@babel/preset-env", "@babel/preset-react"]
          }
        }
      }, {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ['raw-loader']
      }, {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [{
          loader: 'style-loader',
          options: {
            injectType: 'singletonStyleTag',
            attributes: {
              'data-cke': true
            }
          }
        }, {
          loader: 'postcss-loader',
          options: styles.getPostCssConfig({
            themeImporter: {
              themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
            },
            minify: true
          })
        }]
      }]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: path.resolve(path.normalize(global.SERVER_JS_DIR)),
      publicPath: '/',
      filename: '[name].min.js'
    },
    plugins: [new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }), new CKEditorWebpackPlugin({
      // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
      language: 'fr',
      addMainLanguageTranslationsToAllAssets: true
    })],
    optimization: {
      minimizer: [new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          ecma: 8,
          mangle: true,
          // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false
        }
      })]
    },
    devServer: {
      contentBase: './js'
    }
  };
  return conf;
};