const del = require("del");
const { src, dest } = require("gulp");
const webpackStream = require('webpack-stream');
const webpack = require("webpack")

const currentVersion = require('./package.json').version
const currentYear = new Date().getFullYear()

/**
 * 基于宿主环境的 webpack 版本的 webpack stream
 * 
 * @param {webpack.Configuration} webpackConfig 
 * @param {webpack.Compiler.Handler} callback 
 */
function wp(webpackConfig, callback) {
  return webpackStream(webpackConfig, webpack, callback)
}

async function clean() {
  await del("dist/**")
}

function build() {
  return src("src/main.ts")
    .pipe(wp({
      mode: "production",
      output: {
        filename: "handwriting.js",
        library: "Handwriting",
        libraryExport: "default",
        libraryTarget: "umd",
      },
      resolve: {
        extensions: [".ts", ".tsx", ".js"]
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          },
          {
            test: /\.tsx?$/, loader: "ts-loader"
          }
        ]
      },
      plugins: [
        new webpack.BannerPlugin(`
Handwriting v${currentVersion}

Copyright (c) ${currentYear} JLoeve, https://github.com/LonelySteve/Handwriting
Licensed under the MIT License.
http://opensource.org/licenses/mit-license
        `)
      ]
    }))
    .pipe(dest("./dist"))
}

module.exports = { clean, build }
