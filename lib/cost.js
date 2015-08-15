'use strict';
var Promise = require('bluebird');

module.exports = function cost(path) {
	if (typeof path !== 'string') return Promise.reject(new TypeError('Argument must be a string.'));
	
	var dataPromise = /^https?:\/\/.+/i.test(path)
		? require('./get-from-remote-path')(path)
		: require('./get-from-local-path')(path);
	
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
