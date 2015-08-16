'use strict';
var zlib = require('zlib');
var Promise = require('bluebird');

module.exports = function (data) {
	return new Promise(function (resolve, reject) {
		var input = data.value;
		if (Buffer.isBuffer(input)) {input = '' + input;}
		if (typeof input !== 'string') {throw new TypeError('Input must be a string or buffer.');}
		
		if (data.gzip) {
			zlib.gzip(input, {level: 9}, function (err, buffer) {
				err ? reject(err)
					: data.value = buffer.length, resolve(data);
			});
		} else {
			data.value = Buffer.byteLength(input);
			resolve(data);
		}
	});
};
