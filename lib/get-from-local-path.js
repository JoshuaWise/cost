'use strict';
var Promise = require('bluebird');
var readFile = require('fs').readFile;

module.exports = function (path) {
	return new Promise(function (resolve, reject) {
		readFile(path, function (err, buffer) {
			if (err) {
				var errorDetails = require('errno').errno[err.errno];
				reject(new Error(errorDetails ? errorDetails.description : err.message));
			} else {
				resolve(buffer);
			}
		});
	});
};
