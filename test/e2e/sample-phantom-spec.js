import {expect} from 'chai';
import path from 'path';
import Nightmare from 'nightmare';
import config from '../gulp/config';

describe('opening a webpage', () => {
  var {makeTestUrl, phantomPath, screenshot, email} = config();
  var url = makeTestUrl();

  it('should listen for the `window.callPhantom` event', (done) => {
    new Nightmare({
        phantomPath,
        webSecurity: false
      })
      .viewport(1024, 1000)
      .on('callback', (data) => {
        var {Title} = data;
        expect(Title).to.eql('Up');
        done();
      })
      .goto(url)
      .screenshot(screenshot({ imgName: 'phantom-test/home' }))
      .run((err) => {
        if(err) return done(err);
      });
  });

});

