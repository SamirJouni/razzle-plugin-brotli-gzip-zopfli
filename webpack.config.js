const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: "./index.js",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "main.js",
		libraryTarget: "commonjs2"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, "src"),
				exclude: /(node_modules|bower_components|build)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			}
		]
	},
	node: {
		fs: "empty"
	}
};
