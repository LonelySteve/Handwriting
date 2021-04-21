const path = require('path');
const fs = require("fs")
const HtmlWebpackPlugin = require('html-webpack-plugin');

function generateConfig({ name, mode }) {
  return {
    entry: "./src/main.ts",
    mode,
    devtool: mode === "production" ? undefined : "source-map",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: `${name}.js`,
      library: 'Handwriting',
      libraryExport: "default",
      // umdNamedDefine: true,
      libraryTarget: "umd",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" }
      ]
    },
    devServer: {
      port: 8080,
      proxy: {
        "/proxy/qqShuru": {
          target: "https://handwriting.shuru.qq.com/cloud/cgi-bin/cloud_hw_pub.wsgi",
          secure: false,
          // https://stackoverflow.com/a/36662307/12364718
          changeOrigin: true
        },
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "examples", "index.html"),
        inject: "head"
      })
    ],
  }
}

function getConfig() {
  const name = JSON.parse(fs.readFileSync("package.json")).name
  const mode = process.env.NODE_ENV === "production" || name.indexOf("min") !== -1 ? "production" : "development"

  return generateConfig({
    name,
    mode
  })
}

module.exports = getConfig()
