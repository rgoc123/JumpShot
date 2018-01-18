var path = require("path");

module.exports = {
  entry: "./lib/jumpshot.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  devtool: 'source-map',
};
