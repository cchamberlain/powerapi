module.exports = require("./make-webpack-config")({
  devServer: true,
  hotComponents: true,
  devtool: "eval-source-map",
  debug: true
});
