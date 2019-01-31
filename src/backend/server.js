// const fs = require('fs');
// const path = require('path');
// const pug = require('pug');
// const express = require('express');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const config = require('../../webpack.config.js');
// const app = express();
// const rootDir = path.dirname(require.main.filename);

// const compiler = webpack(config);
// const devMiddleware = webpackDevMiddleware(compiler, {
// 	inline: true,
// 	compress: true,
// 	hotOnly: true,
// 	stats: config.stats,
// 	open: true
// });
// const hotMiddleware = webpackHotMiddleware(compiler, {
// 	log: console.log,
// 	path: '/__webpack_hmr',
// 	heartbeat: 2000
// });
// app.use(devMiddleware);
// app.use(hotMiddleware);

// const server = require('http').Server(app);

// const withHotloader = require('express-engine-hotloader');
// app.engine('pug', withHotloader(server, pug.__express));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'pug');
// app.use(express.static(rootDir + '/dist'));
// //app.use('/', router);
// app.get('/', function (req, res) {
//     res.render('home', { title: 'Terms of use'});
// });

// server.listen(3000, () => console.log('Listening 3000'));



const fs = require('fs');
const path = require('path');
const pug = require('pug');
const express = require('express');

const app = express();
const rootDir = path.dirname(require.main.filename);
const server = require('http').Server(app);
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const config = require('../../webpack.config.js');
	config.devtool = 'source-map';
	config.entry.unshift('webpack-hot-middleware/client');
	config.plugins.push(new webpack.HotModuleReplacementPlugin());

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

	const withHotloader = require('express-engine-hotloader');
	app.engine('pug', withHotloader(server, pug.__express));
}

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(rootDir + '/dist'));
//app.use('/', router);
app.get('/', function (req, res) {
    res.render('home', { title: 'Terms of use'});
});

server.listen(3000, () => console.log('Listening 3000'));