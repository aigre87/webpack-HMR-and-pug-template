const webpack = require('webpack');
const path = require('path');


const config = {
	entry: [
		'webpack-hot-middleware/client',
    path.resolve(__dirname, './app.js')
	],
	output: {
		path: path.resolve(__dirname + '/views'),
		filename: './bundle.js'
	},
	devtool: 'inline-source-map',
  resolve: {
    modules: [
      './',
      'node_modules',
    ],
  },
	module: {
		rules: [
			{
				test: /\.(sass|scss|css)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: "css-loader",
						options: {
							modules: true,
							sourceMap: true,
							localIdentName: '[name]__[local]--[hash:base64:5]'
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					},
				]
			}
		]
  },
  plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
	],
}

module.exports = config;