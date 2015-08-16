'use strict';

module.exports = function (data) {
	if (data.minify !== 'js') {return data;}
	
	var UglifyJS = require('uglify-js');
	var result = UglifyJS.minify(data.value, {
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
