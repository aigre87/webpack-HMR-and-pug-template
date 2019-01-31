const express = require('express');
const fs = require('fs');

const options = {
	pretty: false,
	exports: false,
	debug: false,
	compileDebug: false,
	cache: false,
	require: require,
	__dirname: __dirname,
	__filename: __filename
};
module.exports = (() => {
	const router = express.Router();

	router.get('/', (req, res) => res.render('home', options));
	
	return router;
})();
