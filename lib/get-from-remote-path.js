'use strict';
var Promise = require('bluebird');
var simpleGet = require('simple-get');

module.exports = function (path) {
	return new Promise(function (resolve, reject) {
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
				resolve(Buffer.concat(chunks));
			});
		});
	});
};

function knownErrors(err) {
	switch (err.code) {
		case 'ENOTFOUND': return new Error('address not found');
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
