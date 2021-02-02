const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const global = require("../global")();

//Front-end

module.exports = function () {

  const conf = {

    name: "theme-js",
    entry: {
      "app": path.resolve(path.normalize(global.DEV_JSX_DIR + "app.jsx")),
      "office-app": path.resolve(path.normalize(global.DEV_JSX_DIR + "office-app.jsx")),
      "vendors": path.resolve(path.normalize(global.DEV_JSX_DIR + "vendors.jsx")),
      "office-vendors": path.resolve(path.normalize(global.DEV_JSX_DIR + "office-vendors.jsx"))
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/preset-flow",
                "@babel/preset-env",
                "@babel/preset-react"
              ],
            }
          },
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: path.resolve(path.normalize(global.SERVER_JS_DIR)),
      publicPath: '/',
      filename: '[name].min.js'
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            parse: {},
            compress: {},
            ecma: 8,
            mangle: true, // Note `mangle.properties` is `false` by default.
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_fnames: false,
          },
        }),
      ],
    },
    devServer: {
      contentBase: './js'
    }
  }

  return conf;

};