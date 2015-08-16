'use strict';

module.exports = function (data) {
	if (data.minify !== 'css') {return data;}
	
	var CleanCSS = require('clean-css');
	var result = new CleanCSS({
		processImport: false,
		rebase: false,
		roundingPrecision: -1,
		advanced: true, // don't know if this is 100% safe
		aggressiveMerging: false, // don't know what this does
		restructuring: false // don't know what this does
	}).minify(data.value);
	
	if (result.errors[0]) {
		throw new Error(result.errors[0]);
	}
	
	data.value = result.styles;
	return data;
};
