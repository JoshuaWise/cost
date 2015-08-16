'use strict';
var CleanCSS = require('clean-css');

module.exports = function (data) {
	var input = data.value;
	if (Buffer.isBuffer(input)) {input = '' + input;}
	if (typeof input !== 'string') {throw new TypeError('Input must be a string or buffer.');}
	
	var result = new CleanCSS({
		processImport: false,
		rebase: false,
		roundingPrecision: -1,
		advanced: true, // don't know if this is 100% safe
		aggressiveMerging: false, // don't know what this does
		restructuring: false // don't know what this does
	}).minify(input);
	
	if (result.errors[0]) {
		throw new Error(result.errors[0]);
	}
	
	data.value = result.styles;
	return data;
};
