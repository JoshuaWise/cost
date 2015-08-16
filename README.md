# cost
A CLI tool for checking the size of files after minifying and gzipping them. Mime-types are checked to determine whether to minify and/or gzip the file. To mimic the behavior of most web servers, only CSS and JS files are minified, and binary files such as images are not gzipped.

## Installation
```
$ npm install -g cost
```

## Usage
Basic usage:
```
$ cost /path/to/file.js
>> 640 kB
```

Multiple files:
```
$ cost /path/to/file.js ../path/to/other/file.css
>> /path/to/file.js
>> 640 kB
>> ../path/to/other/file.css
>> 2.3 MB
```

Remote files:
```
$ cost https://mydomain.com/myfile.js
>> 21 kB
```

## Options
```
--help, -?		- Display help information
--bytes, -b		- Always display in bytes (not kB, MB, etc.)
--simple, -s 	- Hide details about whether files were gzipped or minified
```

## License
MIT License (https://github.com/JoshuaWise/cost/blob/master/LICENSE)
