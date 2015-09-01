'use strict';
var Promise = require('bluebird');

module.exports = function cost(options) {
	// If argument is a string, interpret it as the path option.
	if (typeof options === 'string') {
		options = {path: options};
	} else if (typeof options !== 'object' || options === null) {
		return Promise.reject(new TypeError('You must specify a path.'));
	}
	
	// If a value is specified, the path cannot also be specified.
	if (typeof options.value === 'string') {
		if (typeof options.path === 'string') return Promise.reject(new TypeError('Cannot specify a path AND a value.'));
		var fromString = true;
		options.path = '[string]';
	}
	
	// Invalid paths are rejected.
	if (typeof options.path !== 'string') return Promise.reject(new TypeError('Argument must be a string.'));
	
	var dataPromise = fromString
		? require('./get-from-string')(options)
		: /^https?:\/\/.+/i.test(options.path)
			? require('./get-from-remote-path')(options)
			: require('./get-from-local-path')(options);
	
	return dataPromise
		.then(require('./minify-js'))
		.then(require('./minify-css'))
		.then(require('./bytes-after-gzip'));
};
