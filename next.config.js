// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  distDir: 'build',
  pageExtensions: ['ts', 'tsx'],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    // Example using webpack option
    // config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
    // eslint-disable-next-line no-param-reassign
    config.node = {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    };
    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
