const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
	entry: path.resolve(__dirname, "src/index.tsx"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "assets/js/[name].[contenthash].js",
		assetModuleFilename: "assets/[hash][ext][query]",
		clean: true,
		publicPath: "/",
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx"],
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
				type: "asset/resource",
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/i,
				type: "asset/resource",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public/index.html"),
		}),
	],
};
