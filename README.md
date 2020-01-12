[![npm version](https://badge.fury.io/js/razzle-plugin-brotli-gzip-zopfli.svg)](https://badge.fury.io/js/razzle-plugin-brotli-gzip-zopfli)

# razzle-plugin-brotli-gzip-zopfli

A razzle plugin that allows brotli, gzip, and zopfli(gzip) compression at build-time.

**How To Use:**

```
npm i --save-dev razzle-plugin-brotli-gzip-zopfli
```

then,

##### Basic Usage

Create a razzle.config.js at the root directory of your razzle project. Then paste this in the file.

```
// razzle.config.js

module.exports = {
  plugins: ['brotli-gzip-zopfli'],
};
```

##### More Options

    To get more options, do the following in your razzle.config.js file. Then add/remove/change options as needed.

```
// razzle.config.js

module.exports = {
  plugins: [
    {
      name: 'brotli-gzip-zopfli',
      options: {
				brotli: true,
				gzip: false,
				zopfli: true,
				gzipBoth: false,
				gzipSettings: {
					filename: "[path].gz[query]",
					test: /\.(js|css|html|svg|md)$/,
					compressionOptions: { level: 9 },
					threshold: 8192,
					minRatio: 0.8,
					deleteOriginalAssets: false,
					cache: false
				},
				brotliSettings: {
					filename: "[path].br[query]",
					test: /\.(js|css|html|svg|md)$/,
					compressionOptions: { level: 11 },
					threshold: 10240,
					minRatio: 0.8,
					deleteOriginalAssets: false,
					cache: false
				},
				zopfliSettings: {
					filename: "[path].gz[query]",
					test: /\.(js|css|html|svg|md)$/,
					threshold: 8192,
					minRatio: 0.8,
					deleteOriginalAssets: false,
					cache: false,
					compressionOptions: {
						numiterations: 15
		},
	}
}
    }
  ]
};
```

**You may also use the following options:**

###### Brotli

- filename: Type: String|Function Default: [path].br[query]. The target asset filename.
- compressionOptions: Type: Object Default: { level: 11 }. If you use custom function for the algorithm option, the default value is {}. The level option matches BROTLI_PARAM_QUALITY [for Brotli-based streams](https://nodejs.org/api/zlib.html#zlib_for_brotli_based_streams).
- threshold: Type: Number Default: 10240. Only assets bigger than this size are processed. In bytes.

###### Zopfli

- filename: Type: String|Function Default: [path].gz[query]. The target asset filename.
- compressionOptions: numiterations: 15, The number of iterations to use with compression. More iterations take longer, but compress better.
- threshold: Type: Number Default: 8192. Only assets bigger than this size are processed. In bytes.

###### gzip

- filename: Type: String|Function Default: [path].gz[query]. The target asset filename.
- compressionOptions: Type: Object Default: { level: 9 }. If you use custom function for the algorithm option, the default value is {}. Compression options. You can find all options here [zlib](https://nodejs.org/api/zlib.html#zlib_class_options).
- threshold: Type: Number Default: 8192. Only assets bigger than this size are processed. In bytes.

###### General

- test: Type: String|RegExp|Array<String|RegExp> Default: /\.(js|css|html|svg|md)\$/ . Test to match files against.
- include: Type: String|RegExp|Array<String|RegExp> Default: undefined. Files to include. example value: /\/includes/
- exclude: Type: String|RegExp|Array<String|RegExp> Default: undefined. Files to exclude. example value: /\/excludes/
- minRatio: Type: Number Default: 0.8. Only assets that compress better than this ratio are processed (minRatio = Compressed Size / Original Size). Example: you have image.png file with 1024b size, compressed version of file has 768b size, so minRatio equal 0.75. In other words assets will be processed when the Compressed Size / Original Size value less minRatio value. You can use 1 value to process all assets.
- deleteOriginalAssets Type: Boolean Default: false. Whether to delete the original assets or not.
- cache: Type: Boolean|String Default: false. Enable file caching. The default path to cache directory: node_modules/.cache/compression-webpack-plugin. You can also enable it by setting a path string as such: cache: 'path/to/cache',
- algorithm: Type: String|Function. The compression algorithm/function.If the input is a string, The algorithm is taken from [zlib](https://nodejs.org/api/zlib.html). If the input is function, then can specify a custom compression function. Use as such:

```
// String
 algorithm: 'gzip',

// Function
 algorithm(input, compressionOptions, callback) {
    return compressionFunction(input, compressionOptions, callback);
  },
```

###### Note: By default, both brotli and zopfli are enabled, while gzip is disabled. To use both zopfli and gzip you will need to set the option gzipBoth to true. Then you will get a .gz file for gzip and a seperate .zopfli.gz file for zopfli.

**Default options look like this:**

```
{
	brotli: true,
	gzip: false,
	zopfli: true,
	gzipBoth: false,
	gzipSettings: {
		filename: '[path].gz[query]',
		algorithm: 'gzip',
		test: /\.(js|css|html|svg|md)$/,
		compressionOptions: { level: 9 },
		threshold: 8192,
		minRatio: 0.8,
		deleteOriginalAssets: false,
		cache: false,
		exclude: /(?:(?:\.map))|(?:(?:server\.js))/,
	},
	brotliSettings: {
		filename: '[path].br[query]',
		algorithm: 'brotliCompress',
		test: /\.(js|css|html|svg|md)$/,
		compressionOptions: { level: 11 },
		threshold: 10240,
		minRatio: 0.8,
		deleteOriginalAssets: false,
		cache: false,
		exclude: /(?:(?:\.map))|(?:(?:server\.js))/,
	},
	zopfliSettings: {
		filename: '[path].gz[query]',
		test: /\.(js|css|html|svg|md)$/,
		threshold: 8192,
		minRatio: 0.8,
		deleteOriginalAssets: false,
		cache: false,
		exclude: /(?:(?:\.map))|(?:(?:server\.js))/,
		compressionOptions: {
			numiterations: 15
		},
		algorithm(input, compressionOptions, callback) {
			return zopfli(input, compressionOptions, callback);
		}
	}
};
```

**Get it on NPM:**

https://www.npmjs.com/package/razzle-plugin-brotli-gzip-zopfli

###### Note: This app is heavily inspired by [razzle-pulgin-compression](https://github.com/nimacsoft/razzle-plugin-compression)

###### Note: This app uses code from a stackoverflow answer by [bloodyKnuckles](https://stackoverflow.com/users/2743458/bloodyknuckles)

###### Note: This app uses [compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin). Go there to find more options if the ones outlined in this readme aren't enough.
