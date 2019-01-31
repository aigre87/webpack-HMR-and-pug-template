const webpack = require('webpack');
const path = require('path');
const argv = require('yargs').argv;
const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;

const config = {
	entry: [
    	path.resolve(__dirname, './src/frontend/app.js')
	],
	output: {
		path: path.resolve(__dirname + '/dist'),
		filename: './bundle.js'
	},
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
		// new webpack.HotModuleReplacementPlugin(),
		// new webpack.NamedModulesPlugin(),
	],
}

module.exports = config;