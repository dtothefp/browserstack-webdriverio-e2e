import {merge} from 'lodash';
import webpack from 'webpack';
import {join} from 'path';
const testPath = join(__dirname, 'test-config.js');
var preprocessors = {};
preprocessors[testPath] = [ 'webpack', 'sourcemap' ];

var karmaConfig = {
  browsers: [ 'Chrome' ],
  singleRun: true,
  frameworks: [ 'mocha' ],
  files: [
    testPath
  ],
  preprocessors,
  reporters: [ 'dots' ],
  webpack: {
    devtool: 'inline-source-map',
    module: {
      loaders: [
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
      ]
    }
  },
  webpackServer: {
    noInfo: true
  }
};

var devConfig = {
  browsers: [ 'Chrome' ]
};

var prodConfig = {
  // global config of your BrowserStack account
  browserStack: {
    username: process.env.BROWSERSTACK_USERNAME,
    accessKey: process.env.BROWSERSTACK_API
  },

  // define browsers
  customLaunchers: {
    bs_firefox_mac: {
      base: 'BrowserStack',
      browser: 'firefox',
      browser_version: '21.0',
      os: 'OS X',
      os_version: 'Mountain Lion'
    },
    bs_ie_windows: {
      base: 'BrowserStack',
      'browser' : 'ie',
      'browser_version' : '11.0',
      'os' : 'Windows',
      'os_version' : '8.1'
    },
    bs_op_windows: {
      base: 'BrowserStack',
      'browser' : 'opera',
      'browser_version' : '12.15',
      'os' : 'Windows',
      'os_version' : 'XP'
    },
    bs_iphone5: {
      base: 'BrowserStack',
      'browserName' : 'iPhone',
      'device' : 'iPhone 5',
      os: 'ios',
      os_version: '6.0'
    }

  },

  browsers: ['bs_firefox_mac', /*'bs_iphone5',*/ 'bs_ie_windows', 'bs_op_windows']
};

export default function (config) {
  let isDev = process.env.DEV;
  if(isDev) {
    merge(karmaConfig, devConfig);
  } else {
    merge(karmaConfig, prodConfig);
  }

  config.set(karmaConfig);
}
