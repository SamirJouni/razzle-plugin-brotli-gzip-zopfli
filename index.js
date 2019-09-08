const CompressionPlugin = require("compression-webpack-plugin");
const zopfli = require("@gfx/zopfli");
const defaultSettings = require("./defaults/defaultSettings");
const constructUpdatedObject = require("./src/constructUpdatedObject");

const inject = (
	immutableConfig,
	{ target, dev },
	webpack,
	customSettings = {}
) => {
	const isProd = dev === false;
	const isWeb = target === "web";
	const config = Object.assign({}, immutableConfig);

	if (isWeb && isProd) {
		const settings = constructUpdatedObject(defaultSettings, customSettings);

		const plugins = [];
		let {
			gzip,
			brotli,
			zopfli,
			gzipBoth,
			gzipSettings,
			brotliSettings,
			zopfliSettings
		} = settings;

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
