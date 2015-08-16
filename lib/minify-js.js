'use strict';
var UglifyJS = require('uglify-js');

module.exports = function (data) {
	var input = data.value;
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
	
	data.value = result.code;
	return data;
};
