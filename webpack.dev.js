// webpack.dev.js
const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const sassEmbedded = require("sass-embedded");

module.exports = merge(common, {
	mode: "development",
	devtool: "eval-source-map",
	module: {
		rules: [
			{ test: /\.css$/i, use: ["style-loader", "css-loader"] },

			// 1) SCSS МОДУЛИ: только *.module.scss / *.module.sass
			{
				test: /\.module\.s[ac]ss$/i,
				use: [
					{ loader: "style-loader", options: { esModule: true } },
					{
						loader: "css-loader",
						options: {
							esModule: true,
							sourceMap: true,
							modules: { localIdentName: "[name]__[local]__[hash:base64:5]", namedExport: false },
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
							implementation: sassEmbedded,
							sassOptions: { silenceDeprecations: ["legacy-js-api"] },
						},
					},
				],
			},

			// 2) Глобальный SCSS
			{
				test: /\.s[ac]ss$/i,
				exclude: /\.module\.s[ac]ss$/i,
				use: [
					{ loader: "style-loader", options: { esModule: true } },
					{ loader: "css-loader", options: { esModule: true, sourceMap: true } },
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
							implementation: sassEmbedded,
							sassOptions: { silenceDeprecations: ["legacy-js-api"] },
						},
					},
				],
			},
		],
	},
	devServer: {
		static: { directory: path.resolve(__dirname, "public") },
		historyApiFallback: true,
		compress: true,
		hot: true,
		port: 5173,
	},
});
