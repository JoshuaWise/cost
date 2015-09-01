'use strict';
var Promise = require('bluebird');
var simpleGet = require('simple-get');
var mime = require('file-mime');
var compressible = require('compressible');
var extname = require('path').extname;
var parseUrl = require('url').parse;

module.exports = function (options) {
	return new Promise(function (resolve, reject) {
		var path = options.path;
		simpleGet(path, function (err, res) {
			if (err) {
				return reject(knownErrors(err));
			}
			if (res.statusCode >= 400) {
				return reject(new HTTPError(res));
			}
			
			var chunks = [];
			res.on('data', function (chunk) {
				chunks.push(chunk);
			});
			res.on('end', function () {
				var contentType = res.headers['content-type'];
				var ext = extname(parseUrl(path).pathname).toLowerCase().replace(/^\./, '');
				resolve({
					path: path,
					value: '' + Buffer.concat(chunks),
					minify: options.minify != null ? options.minify : shouldMinify(contentType, ext),
					gzip: options.gzip != null ? options.gzip : shouldGzip(contentType, ext)
				});
			});
		});
	});
};

function shouldMinify(contentType, ext) {
	if (contentType) {
		var match = /^\s*([^;\s]*)(?:;|\s|$)/.exec(contentType);
		if (match && match[1]) {
			var extFromMime = mime.extension(match[1]);
		}
	}
	return	(extFromMime === 'js' || extFromMime === 'css') ? extFromMime :
			(ext === 'js' || ext === 'css') ? ext :
			false;
}

function shouldGzip(contentType, ext) {
	return !!(compressible(contentType) || compressible(mime.lookup(ext)));
}

function knownErrors(err) {
	switch (err.code) {
		case 'ENOTFOUND': return new Error('address does not exist');
		case 'ECONNREFUSED': return new Error('connection refused');
	}
	return err;
}

function HTTPError(res) {
	Error.captureStackTrace(this, HTTPError);
	this.name = 'HTTPError';
	this.message = res.statusMessage;
	this.statusCode = res.statusCode;
}
require('util').inherits(HTTPError, Error);
