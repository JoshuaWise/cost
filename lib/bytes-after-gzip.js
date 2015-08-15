'use strict';
var zlib = require('zlib');
var Promise = require('bluebird');

module.exports = function (input) {
	return new Promise(function (resolve, reject) {
		if (Buffer.isBuffer(input)) {input = '' + input;}
		if (typeof input !== 'string') {throw new TypeError('Input must be a string or buffer.');}
		
		zlib.gzip(input, {level: 9}, function (err, buffer) {
			err ? reject(err)
				: resolve(buffer.length);
		});
	});
};
