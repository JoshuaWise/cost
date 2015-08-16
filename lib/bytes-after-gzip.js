'use strict';
var Promise = require('bluebird');

module.exports = function (data) {
	return new Promise(function (resolve, reject) {
		if (data.gzip) {
			require('zlib').gzip(data.value, {level: 9}, function (err, buffer) {
				err ? reject(err)
					: data.value = buffer.length, resolve(data);
			});
		} else {
			data.value = Buffer.byteLength(data.value);
			resolve(data);
		}
	});
};
