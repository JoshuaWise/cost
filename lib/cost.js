'use strict';
var parseUrl = require('url').parse;
var Promise = require('bluebird');

module.exports = function cost(path) {
	if (typeof path !== 'string') return Promise.reject(new TypeError('Argument must be a string.'));
	var location = parseUrl(path);
	
	var dataPromise = (location.protocol && /^https?\b/i.test(location.protocol))
		? require('./get-from-remote-path')(location.href)
		: require('./get-from-local-path')(location.pathname);
	
	return dataPromise
		.then(minify)
		.then(require('./bytes-after-gzip'));
};

function minify(data) {
	try {
		return require('./minify-js')(data);
	} catch (err1) {
		try {
			return require('./minify-css')(data);
		} catch (err2) {
			return data;
		}
	}
}
