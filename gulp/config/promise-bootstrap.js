import babelPromise from 'babel-runtime/core-js/promise';
import bluebird from 'bluebird';

/**
 * Important to polyfill Promise for `fetch`
 */
export function init() {
  babelPromise.default = bluebird;
}
