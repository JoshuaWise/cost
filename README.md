# cost
A CLI tool for checking the size of files after minifying and gzipping them. MIME types are checked to determine whether to minify and/or gzip the file. To mimic the behavior of most web servers, only CSS and JS files are minified, and the [compressible](https://www.npmjs.com/package/compressible) module is used to determine whether to gzip a file or not.

## Installation
```
$ sudo npm install -g cost
```

## Usage
Basic usage:
```
$ cost /path/to/file.js
>> 640 kB
```

Multiple files:
```
$ cost /path/to/file.js ../path/to/other/file.txt
>> /path/to/file.js
>> 640 kB (minified, gzipped)
>> ../path/to/other/file.txt
>> 2.3 MB (gzipped)
```

Remote files:
```
$ cost https://mydomain.com/myfile.png
>> 21 kB
```

## Options
```
--help, -?		- Display help information
--bytes, -b		- Always display in bytes (not kB, MB, etc.)
--simple, -s 	- Hide details about whether files were gzipped or minified
```

## Minifcation and Gzipping
When used on a local file, the file extension is used to determine the MIME type, which is used to decide whether to minify and/or gzip the file. When used on a remote file, the `Content-Type` header is checked to determine the MIME type, and the URL's file extension is used as a fallback.

This logic can be overwritten manually (see [Options](#options))

[uglify-js](https://github.com/mishoo/UglifyJS2) is used for JavaScript minifcation, and [clean-css](https://github.com/jakubpawlowicz/clean-css) is used for CSS minification.

## License
MIT License (https://github.com/JoshuaWise/cost/blob/master/LICENSE)
