'use strict';

module.exports = function (data) {
	if (data.minify !== 'css') {return data;}
	
	var CleanCSS = require('clean-css');
	var result = new CleanCSS({
		processImport: false,
		rebase: false,
		roundingPrecision: 5,
		advanced: true,
		aggressiveMerging: false,
		restructuring: false,
		shorthandCompacting: false
	}).minify(data.value);
	
	if (result.errors[0]) {
		throw new Error(result.errors[0]);
	}
	
	data.value = result.styles;
	return data;
};
