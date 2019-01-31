const fs = require('fs');
const path = require('path');
const pug = require('pug');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const app = express();
const router = require('./router.js');

const compiler = webpack(config);
const devMiddleware = webpackDevMiddleware(compiler, {
	inline: true,
	compress: true,
	hotOnly: true,
	stats: config.stats,
	open: true
});
const hotMiddleware = webpackHotMiddleware(compiler, {
	log: console.log,
	path: '/__webpack_hmr',
	heartbeat: 2000
});
app.use(devMiddleware);
app.use(hotMiddleware);

const server = require('http').Server(app);

const withHotloader = require('express-engine-hotloader');
app.engine('pug', withHotloader(server, pug.__express));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/views'));
app.use('/', router);

server.listen(3000, () => console.log('Listening 3000'));