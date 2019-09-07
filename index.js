const CompressionPlugin = require("compression-webpack-plugin");
const zopfli = require("@gfx/zopfli");

const defaultOptions = {
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

const inject = (
	immutableConfig,
	{ target, dev },
	webpack,
	customOptions = {}
) => {
	const isProd = dev === false;
	const isWeb = target === "web";
  const config = Object.assign({}, immutableConfig);

	if (isWeb && isProd) {
		const options = Object.assign({}, defaultOptions, customOptions);

		const plugins = [];
		let {
			gzip,
			brotli,
			zopfli,
			gzipBoth,
			gzipSettings,
			brotliSettings,
			zopfliSettings
		} = options;

		if (gzipBoth && gzip && zopfli) {
			zopfliSettings.filename = "[path].zopfli.gz[query]";
		} else if (!gzipBoth && gzip && zopfli) {
			gzip = false;
		}

		if (gzip) {
			plugins.push(new CompressionPlugin(gzipSettings));
		}

		if (brotli) {
			plugins.push(new CompressionPlugin(brotliSettings));
		}

		if (zopfli) {
			plugins.push(new CompressionPlugin(zopfliSettings));
		}

		config.plugins.push(...plugins);
	}

	return config;
};

module.exports = inject;
