import {init} from '../gulp/config/promise-bootstrap';
import fetch from 'fetch';
import emit from './lib/shim/phantom-shim';
import moduleA, {dopeness} from './lib/module-a';
/**
 * Initialize Bluebird as es6 Promise lib
 */
init();

var {a, b} = dopeness;

console.log(moduleA());
console.log('A => %s, B => %s', a, b);

fetch('http://www.omdbapi.com/?t=up&y=&plot=short&r=json')
  .then(function(res) {
    console.log('FIRST PROMISE', typeof res.json === 'function');
    return res.json();
  }).then(function(json) {
    emit(json);
    let viewport = document.getElementById('viewport');
    viewport.innerHTML = json.Title;
    console.log('title', json.Title);
    console.log('RES PROMISE RESOLVED', json);
  })
  .catch((err) => {
    console.error('ERROR', err);
  });
