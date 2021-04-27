const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: "./src/main.ts",
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "handwriting.js",
    library: 'Handwriting',
    libraryExport: "default",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, loader: "ts-loader", options: {
          transpileOnly: true,
          configFile: "tsconfig.dev.json"
        }
      }
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