// import html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const WorkboxPlugin = require("workbox-webpack-plugin");
// import InjectManifest
const { InjectManifest } = require("workbox-webpack-plugin");
// require WebpackPwaManifest
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

module.exports = {
  // add mode here (and set to development, then prodution when ready)
  mode: "production",
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      title: "Webpack Plugin",
    }),
    new WebpackPwaManifest({
      name: "Contact Cards Application",
      short_name: "Contact Cards",
      description: "Keep track of contacts!",
      background_color: "#7eb4e2",
      theme_color: "#7eb4e2",
      start_url: "./",
      publicPath: "./",
      icons: [
        {
          src: path.resolve("src/images/icon-manifest.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons"),
        },
        {
          src: path.resolve("src/images/icon-manifest.png"),
          size: "1024x1024",
          destination: path.join("assets", "icons"),
          purpose: "maskable",
        },
      ],
    }),
    new InjectManifest({
      swSrc: "./src/sw.js",
      swDest: "service-worker.js",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
