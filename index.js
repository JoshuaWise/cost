'use strict';
var zlib = require('zlib');

module.exports = function (input, minify, callback) {
	if (Buffer.isBuffer(input)) {input = '' + input;}
	if (typeof input !== 'string') {throw new TypeError('Input must be a string or buffer.');}
	if (typeof minify === 'function') {callback = minify; minify = null;}
	
	// Minify JS and CSS.
	if (minify) {
		switch (('' + minify).toLowerCase()) {
			case 'js':
				input = minifyJS(input);
				break;
			case 'css':
				input = minifyCSS(input);
				break;
			default:
				throw new Error('Unrecognized minification type: ' + minify);
		}
	}
	
	// Gzip and return size.
	if (typeof callback !== 'function') {
		return zlib.gzipSync(input, {level: 9}).length;
	}
	zlib.gzip(input, {level: 9}, function (err, buffer) {
		err ? callback(err, null)
			: callback(null, buffer.length);
	});
};

function minifyJS(input) {
	var UglifyJS = require("uglify-js");
	var result = UglifyJS.minify(input, {
		fromString: true,
		compress: {
			keep_fargs: true,
			unsafe: false
		},
		mangle: {
			keep_fnames: true,
			screw_ie8: true
		},
		output: {
			space_colon: false
		}
	});
	return result.code;
}

function minifyCSS(input) {
	return input;
}