"use strict";

var webpack = require('webpack');

var path = require('path');

var global = require("../global")();

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //Theming - css basé sur sass


module.exports = function () {
  var conf = {
    name: "theme-css",
    entry: {
      "app": path.resolve(path.normalize(global.DEV_CSS_DIR + "app.sass")),
      "office-app": path.resolve(path.normalize(global.DEV_CSS_DIR + "office-app.sass")),
      "vendors": path.resolve(path.normalize(global.DEV_CSS_DIR + "vendors.sass")),
      "office-vendors": path.resolve(path.normalize(global.DEV_CSS_DIR + "office-vendors.sass"))
    },
    plugins: [new FixStyleOnlyEntriesPlugin(), new OptimizeCSSAssetsPlugin({}), new MiniCssExtractPlugin({
      filename: '[name].min.css',
      chunkFilename: '[id].css'
    })],
    module: {
      rules: [{
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'sass-loader',
          options: {
            // Prefer `dart-sass`
            implementation: require('sass'),
            sourceMap: false,
            sassOptions: {
              outputStyle: 'compressed'
            }
          }
        }]
      }, {
        test: /\.(otf|ttf|eot|svg|gif|png|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: "[name].[ext]",
            outputPath: global.WEBPACK_FONTS_OUTPUT,
            publicPath: global.WEBPACK_FONTS_OUTPUT
          }
        }]
      }]
    },
    output: {
      path: path.resolve(path.normalize(global.SERVER_CSS_DIR)),
      publicPath: "/"
    }
  };
  return conf;
};