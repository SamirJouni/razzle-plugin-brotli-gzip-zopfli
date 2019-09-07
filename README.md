[![npm version](https://badge.fury.io/js/razzle-plugin-brotli-gzip-zopfli.svg)](https://badge.fury.io/js/razzle-plugin-brotli-gzip-zopfli)

# razzle-plugin-brotli-gzip-zopfli

A Razzle plugin that allows brotli, gzip, and zopfli(gzip) compression at build-time.

**How To Use:**

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

* filename
* test
* compressionOptions
* threshold
* minRatio
* deleteOriginalAssets
* deleteOriginalAssets
* cache


###### Zopfli

* filename
* test
* compressionOptions
* threshold
* minRatio
* deleteOriginalAssets
* deleteOriginalAssets
* cache

###### gzip

* filename
* test
* compressionOptions
* threshold
* minRatio
* deleteOriginalAssets
* deleteOriginalAssets
* cache

###### Note: By default, both brotli and zopfli are enabled, while gzip is disabled.

###### Note: To use both zopfli and gzip you will need to set the option gzipBoth to true. Then you will get a .gz file for gzip and a seperate .zopfli.gz file for zopfli.

**Default options look like this:**

```
{
	brotli: true,
	gzip: false,
	zopfli: true,
	gzipBoth: false,
	gzipSettings: {
		filename: "[path].gz[query]",
		algorithm: "gzip",
		test: /\.(js|css|html|svg|md)$/,
		compressionOptions: { level: 9 },
		threshold: 8192,
		minRatio: 0.8,
		deleteOriginalAssets: false,
		cache: false
	},
	brotliSettings: {
		filename: "[path].br[query]",
		algorithm: "brotliCompress",
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
		algorithm(input, compressionOptions, callback) {
			return zopfli.gzip(input, compressionOptions, callback);
		}
	}
};
```

**Get it on NPM:**

https://www.npmjs.com/package/razzle-plugin-brotli-gzip-zopfli

###### Note: This app is heavily inspired by [razzle-pulgin-compression](https://github.com/nimacsoft/razzle-plugin-compression)

###### Note: This app uses [compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin). Go there to find more options if the ones outlined in this readme aren't enough.
