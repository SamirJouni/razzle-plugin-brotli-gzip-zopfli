const defaultSettings = {
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

module.exports = defaultSettings;
