# cost
A CLI tool for checking the size of files after minifying and gzipping them. MIME types are checked to determine whether to minify and/or gzip the file. To mimic the behavior of most web servers, only CSS and JS files are minified, and the [compressible](https://www.npmjs.com/package/compressible) module is used to determine whether to gzip a file or not.

## Installation
```
$ sudo npm install -g cost
```

## Usage
Basic usage:
```
$ cost /path/to/file.jpg
>> 640 kB
```

Multiple files:
```
$ cost /path/to/file.js ../path/to/other/file.png
>> /path/to/file.js
>> 640 kB (minified, gzipped)
>> ../path/to/other/file.png
>> 2.3 MB
```

Remote files:
```
$ cost https://mydomain.com/myfile.txt
>> 21 kB (gzipped)
```

Standard input:
```
$ echo hello world | cost
>> 12 B
```

## Options
```
--help, -?        Display help information
--bytes, -b       Always display size in bytes (not kB, MB, etc.)
--simple, -s      Hide details about whether files were gzipped or minified
--raw, -r         Don't minify or gzip any files
```

Forcefully cause gzip/minify:
```
$ cost :css:/path/to/file
>> xxx kB (minified)

$ cost :gzip:/path/to/file
>> xxx kB (gzipped)

$ cost :js,gzip:/path/to/file
>> xxx kB (minified, gzipped)
```

Forcefully **skip** gzipping/minification:
```
$ cost :max:/path/to/file.js
>> xxx kB (gzipped)

$ cost :unzip:/path/to/file.js
>> xxx kB (minified)

$ cost :max,unzip:/path/to/file.js
>> xxx kB
```

You can do this with stdin too:
```
$ echo hello world | cost :js:
>> ERROR: Unexpected token: name (world)
```

These per-file options supercede the standard options.
For example, the following operation **will** do minification, but **not** gzipping:
```
$ cost --raw :js:/path/to/file
```


## Useful Information
When used on a local file, the file extension is used to determine the MIME type, which is used to decide whether to minify and/or gzip the file. When used on a remote file, the `Content-Type` header is checked to determine the MIME type, and the URL's file extension is used as a fallback.

This logic can be overwritten manually (see [Options](#options)).

[uglify-js](https://github.com/mishoo/UglifyJS2) is used for JavaScript minifcation, and [clean-css](https://github.com/jakubpawlowicz/clean-css) is used for CSS minification.

The CSS minifiction does **NOT** follow @import directives.

## Programmatic Usage
The main module uses promises ([A+](https://promisesaplus.com/)).
```javascript
var cost = require('cost');

cost('/path/to/file.js')
	.then(function (result) {
		console.log(result.value + ' bytes');
		// >> 62 bytes
		
		if (result.gzip) {
			console.log('file was gzipped')
		}
		
		if (result.minify) {
			console.log('file was %s minified', result.minify);
			// >> file was js minified
		}
	})
	.catch(function (err) {
		console.log(err.message);
	});
	
	
cost({
	path: '/path/to/file.js',
	minify: false, // could be 'js', 'css', or false
	gzip: true
}).then(handleResult).catch(handleErrors);


// You can pass a string instead of a path.
// But when you do, minification and gzipping will not happen unless
// specified by you, because automatic MIME type detection cannot occur.
cost({
	value: myCssString,
	minify: 'css',
	gzip: true
}).then(handleResult).catch(handleErrors);
```

## License
MIT License (https://github.com/JoshuaWise/cost/blob/master/LICENSE)
