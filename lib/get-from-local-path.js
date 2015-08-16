'use strict';
var Promise = require('bluebird');
var mime = require('file-mime');
var compressible = require('compressible');
var extname = require('path').extname;
var readFile = require('fs').readFile;

module.exports = function (path) {
	return new Promise(function (resolve, reject) {
		readFile(path, function (err, buffer) {
			if (err) {
				var errorDetails = require('errno').errno[err.errno];
				reject(new Error(errorDetails ? errorDetails.description : err.message));
			} else {
				var ext = extname(path).toLowerCase().replace(/^\./, '');
				resolve({
					path: path,
					value: buffer,
					minify: shouldMinify(ext),
					gzip: shouldGzip(ext)
				});
			}
		});
	});
};

function shouldMinify(ext) {
	return (ext === 'js' || ext === 'css') ? ext : null;
}

function shouldGzip(ext) {
	return !!compressible(mime.lookup(ext));
}
