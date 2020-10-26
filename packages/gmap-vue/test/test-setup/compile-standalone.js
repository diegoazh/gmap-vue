import webpack from 'webpack';
import * as shell from 'shelljs';
import path from 'path';

const webpackConfig = require('../../webpack.config.js')[0];

export default new Promise((resolve, reject) => {
  webpack(
    {
      ...webpackConfig,
      mode: 'development',
    },
    (err) => {
      if (!err) {
        shell.cp(
          path.resolve(__dirname, '../../dist/gmap-vue.js'),
          path.resolve(__dirname, '../../examples/gmap-vue.js')
        );
        resolve();
      } else {
        reject(err);
      }
    }
  );
});
