'use strict';

module.exports = function (input) {
	if (Buffer.isBuffer(input)) {input = '' + input;}
	if (typeof input !== 'string') {throw new TypeError('Input must be a string or buffer.');}
	
	throw new Error('css minification is not implemented yet.');
};
