"use strict";

var CompressionPlugin = require("compression-webpack-plugin"),
    zopfli = require("@gfx/zopfli"),
    defaultOptions = {
  brotli: !0,
  gzip: !1,
  zopfli: !0,
  gzipBoth: !1,
  gzipSettings: {
    filename: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.(js|css|html|svg|md)$/,
    compressionOptions: {
      level: 9
    },
    threshold: 8192,
    minRatio: .8,
    deleteOriginalAssets: !1,
    cache: !1
  },
  brotliSettings: {
    filename: "[path].br[query]",
    algorithm: "brotliCompress",
    test: /\.(js|css|html|svg|md)$/,
    compressionOptions: {
      level: 11
    },
    threshold: 10240,
    minRatio: .8,
    deleteOriginalAssets: !1,
    cache: !1
  },
  zopfliSettings: {
    filename: "[path].gz[query]",
    test: /\.(js|css|html|svg|md)$/,
    threshold: 8192,
    minRatio: .8,
    deleteOriginalAssets: !1,
    cache: !1,
    compressionOptions: {
      numiterations: 15
    },
    algorithm: function algorithm(e, i, s) {
      return zopfli.gzip(e, i, s);
    }
  }
},
    inject = function inject(e, _ref, t) {
  var i = _ref.target,
      s = _ref.dev;
  var o = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var n = !1 === s,
      l = "web" === i,
      p = Object.assign({}, e);

  if (l && n) {
    var _p$plugins;

    var _e = Object.assign({}, defaultOptions, o),
        _i = [];

    var _s = _e.gzip,
        _t = _e.brotli,
        _n = _e.zopfli,
        _l = _e.gzipBoth,
        r = _e.gzipSettings,
        g = _e.brotliSettings,
        a = _e.zopfliSettings;
    _l && _s && _n ? a.filename = "[path].zopfli.gz[query]" : !_l && _s && _n && (_s = !1), _s && _i.push(new CompressionPlugin(r)), _t && _i.push(new CompressionPlugin(g)), _n && _i.push(new CompressionPlugin(a)), (_p$plugins = p.plugins).push.apply(_p$plugins, _i);
  }

  return p;
};

module.exports = inject;