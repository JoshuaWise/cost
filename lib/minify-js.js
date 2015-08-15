'use strict';
var UglifyJS = require("uglify-js");

module.exports = function (input) {
	if (Buffer.isBuffer(input)) {input = '' + input;}
	if (typeof input !== 'string') {throw new TypeError('Input must be a string or buffer.');}
	
	var result = UglifyJS.minify(input, {
		fromString: true,
		compress: {
			unsafe: false
		},
		mangle: {
			keep_fnames: true,
			screw_ie8: true
		}
	});
	return result.code;
};
