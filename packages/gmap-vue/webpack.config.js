const path = require('path');

const env = process.env.NODE_ENV;
global.console.info(`Build as NODE_ENV: ${env}`);

global.console.info(
  `Loading configuration from: ./config/webpack.${env}.config`
);
// eslint-disable-next-line import/no-dynamic-require -- this will change in a near future
const config = require(`./config/webpack.${env}.config`);

if (!Object.keys(config).length) {
  throw new Error(
    `any configuration was found on file: ./config/webpack.${env}.config`
  );
}

/**
 * Web config uses a global Vue and Lodash object.
 * */
const webConfig = {
  ...config,
  externals: {
    vue: 'Vue',
    '@googlemaps/markerclusterer': 'MarkerClusterer',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'gmap-vue.js',
    library: {
      name: 'GmapVue',
      type: 'umd',
      umdNamedDefine: true,
    },
  },
};

module.exports = [webConfig];
