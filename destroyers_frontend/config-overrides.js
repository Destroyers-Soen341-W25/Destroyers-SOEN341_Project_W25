const webpack = require("webpack");

module.exports = function override(config) {
    config.resolve.fallback = {
        "zlib": false,
        "querystring": false,
        "crypto": false,
        "fs": false,
        "net": false,
        "http": false,
        "path": require.resolve("path-browserify"),
        "url": require.resolve("url/"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/")
    };

    return config;
};
