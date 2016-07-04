/**
 * webpack config base from @AngularClass and modified for MEAN
 */

// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./webpack.prod');
    break;
  case 'test':
  case 'testing':
    module.exports = require('./webpack.test');
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./webpack.dev');
}
