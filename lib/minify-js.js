'use strict';

module.exports = function (data) {
	if (data.minify !== 'js') {return data;}
	
	var UglifyJS = require('uglify-js');
	var result = UglifyJS.minify(data.value, {
		fromString: true,
		compress: {
			unsafe: false,
			screw_ie8: true
		},
		mangle: {
			keep_fnames: true,
			screw_ie8: true
		},
		output: {
			comments: /@license|@preserve|^!/i
		}
	});
	
	data.value = result.code;
	return data;
};
