const macros = require('babel-plugin-macros');

module.exports = function (config) {
  return {
    // ... other configurations ...

    plugins: [
      // ... other Babel plugins ...

      macros({
        resolveSymlinks: true, // or other macros options
      }),
    ],
    twin: {
      styled: "styled-components",
      config: "./src/tailwind.config.js",
      format: "auto"
    },
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        timers: require.resolve('timers-browserify'),
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        querystring: require.resolve('querystring-es3'),
      },
    },
  };
};



