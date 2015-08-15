'use strict';
var CleanCSS = require('clean-css');

module.exports = function (input) {
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
	
	if (result.errors.length || result.warnings.length) {
		throw new Error('CSS minification failed.'); // This might catch ignorable warnings
	}
	
	return result.styles;
};
