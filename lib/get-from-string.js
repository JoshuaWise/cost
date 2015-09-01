'use strict';
var Promise = require('bluebird');

module.exports = function (options) {
	return new Promise(function (resolve, reject) {
		resolve({
			path: options.path,
			value: options.value,
			minify: options.minify,
			gzip: options.gzip
		});
	});
};
