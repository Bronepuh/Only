// webpack.prod.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const sassEmbedded = require("sass-embedded");

module.exports = merge(common, {
	mode: "production",
	devtool: "source-map",
	module: {
		rules: [
			{ test: /\.css$/i, use: [MiniCssExtractPlugin.loader, "css-loader"] },

			// SCSS модули
			{
				test: /\.module\.s[ac]ss$/i,
				use: [
					{ loader: MiniCssExtractPlugin.loader, options: { esModule: true } },
					{
						loader: "css-loader",
						options: {
							esModule: true,
							modules: { localIdentName: "[hash:base64:8]", namedExport: false },
						},
					},
					{
						loader: "sass-loader",
						options: {
							implementation: sassEmbedded,
							sassOptions: { silenceDeprecations: ["legacy-js-api"] },
						},
					},
				],
			},

			// Глобальный SCSS
			{
				test: /\.s[ac]ss$/i,
				exclude: /\.module\.s[ac]ss$/i,
				use: [
					{ loader: MiniCssExtractPlugin.loader, options: { esModule: true } },
					{ loader: "css-loader", options: { esModule: true } },
					{
						loader: "sass-loader",
						options: {
							implementation: sassEmbedded,
							sassOptions: { silenceDeprecations: ["legacy-js-api"] },
						},
					},
				],
			},
		],
	},
	plugins: [new MiniCssExtractPlugin({ filename: "assets/css/[name].[contenthash].css" })],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "assets/[name].[contenthash].js",
		publicPath: "/<Only>/",
		clean: true,
	},
});
