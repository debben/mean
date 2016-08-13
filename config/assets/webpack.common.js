/**
 * @author: @AngularClass
 */

const webpack = require('webpack');

// client folders
const config = require('../config');
const path = require('path');
const clientPaths = config.folders.client.map(function (staticPath) {
  var p = path.resolve('./' + staticPath);
  console.log(p);
  return p; // path.resolve('./' + staticPath);
});

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlElementsPlugin = require('./html-elements-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/*
 * Webpack Constants
 */
const METADATA = {
  title: 'MEAN application starter - with webpack',
  baseUrl: '/',
  isDevServer: false
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

  /*
   * Static metadata for index.html
   *
   * See: (custom attribute)
   */
  metadata: METADATA,

  /*
   * Cache generated modules and chunks to improve performance for multiple incremental builds.
   * This is enabled by default in watch mode.
   * You can pass false to disable it.
   *
   * See: http://webpack.github.io/docs/configuration.html#cache
   */
   // cache: false,

  /*
   * The entry point for the bundle
   * Our Angular.js app
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {
    'initial': './node_modules/ng2-admin/src/app/theme/initial.scss',
    'polyfills': './modules/core/client/polyfills.browser.ts',
    'vendor': './modules/core/client/vendor.browser.ts',
    'main': './modules/core/client/main.browser.ts'
  },

  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {

    /*
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['', '.ts', '.js', '.css', '.scss', '.json'],

    root: './modules',

    // remove other default values
    modulesDirectories: ['node_modules'],

    alias: {
      // legacy imports pre-rc releases
    }
  },

  /*
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {

    /*
     * An array of applied pre and post loaders.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
     */
    preLoaders: [

      /*
       * Tslint loader support for *.ts files
       *
       * See: https://github.com/wbuchwalter/tslint-loader
       */
      // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },

      /*
       * Source map loader support for *.js files
       * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
       *
       * See: https://github.com/webpack/source-map-loader
       */
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          path.resolve('./', 'node_modules/rxjs'),
          path.resolve('./', 'node_modules/@angular'),
          // path.resolve('./', 'node_modules/@ngrx'),
          // path.resolve('./', 'node_modules/ng2-bootstrap'),
          path.resolve('./', 'node_modules/ng2-branchy')
        ]
      }

    ],

    /*
     * An array of automatically applied loaders.
     *
     * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
     * This means they are not resolved relative to the configuration file.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-loaders
     */
    loaders: [

      /*
       * Typescript loader support for .ts and Angular 2 async routes via .async.ts
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       */
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      /*
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      /*
       * Raw loader support for *.css files
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.css$/,
        loader: 'raw-loader'
      },

      {
        test: /\.scss$/,
        loaders: ['raw-loader', 'sass-loader']
      },

      {
        test: /initial\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      },

      {
        test: /\.woff(2)?(\?v=.+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },

      {
        test: /\.(ttf|eot|svg)(\?v=.+)?$/, loader: 'file-loader'
      },

      {
        test: /bootstrap\/dist\/js\/umd\//,
        loader: 'imports?jQuery=jquery'
      },

      /* Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      ...clientPaths.map((clientPath)=>{
        console.log(`configuring webpack for path ${clientPath}`);
        //  let root = path.resolve('./', 'modules');
        return {
          test: new RegExp(clientPath + '.+\.html$'),
          loader: `html?interpolate=require&root=${clientPath}`
        };
      }),
      {
        test: /\.html$/,
        loader: `raw-loader`,
        exclude: [...clientPaths, path.resolve('modules/core/server/views/index.server.view.html')]
      },

      /*
       * png images
       */
      {
        test: /\.png$/,
        loader: "file-loader?name=[path][name].[ext]?[hash]"
      }
    ]

  },

  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    new ExtractTextPlugin('initial.css', {
      allChunks: true
    }),

  /*
     * Plugin: ForkCheckerPlugin
     * Description: Do type checking in a separate process, so webpack don't need to wait.
     *
     * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
     */
    new ForkCheckerPlugin(),

    /*
     * Plugin: OccurenceOrderPlugin
   * Description: Varies the distribution of the ids to get the smallest id length
     * for often used ids.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
     * See: https://github.com/webpack/docs/wiki/optimization#minimize
     */
    new webpack.optimize.OccurenceOrderPlugin(true),

    /*
     * Plugin: CommonsChunkPlugin
     * Description: Shares common code between the pages.
     * It identifies common modules and put them into a commons chunk.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
     * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    /*
     * Plugin: CopyWebpackPlugin
     * Description: Copy files and directories in webpack.
     *
     * Copies project static assets.
     *
     * See: https://www.npmjs.com/package/copy-webpack-plugin
     */
    new CopyWebpackPlugin(config.folders.client.map(function(staticPath) {
      return {
        from: path.resolve('./' + staticPath + '/img'),
        to: `assets/${staticPath}/img`
      };
    }).concat([
      {
        from: path.resolve('./', 'node_modules/ng2-admin/src/assets/img'),
        to: 'assets/img'
      }
    ])),


    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      'Tether': 'tether',
      'window.Tether': 'tether'
    }),

    /*
     * Plugin: HtmlHeadConfigPlugin
     * Description: Generate html tags based on javascript maps.
     *
     * If a publicPath is set in the webpack output configuration, it will be automatically added to
     * href attributes, you can disable that by adding a "=href": false property.
     * You can also enable it to other attribute by settings "=attName": true.
     *
     * The configuration supplied is map between a location (key) and an element definition object (value)
     * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
     *
     * Example:
     *  Adding this plugin configuration
     *  new HtmlElementsPlugin({
     *    headTags: { ... }
     *  })
     *
     *  Means we can use it in the template like this:
     *  <%= webpackConfig.htmlElements.headTags %>
     *
     * Dependencies: HtmlWebpackPlugin
     */
    new HtmlElementsPlugin({
      headTags: require('./head-config.common')
    })
  ],

  /*
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};
