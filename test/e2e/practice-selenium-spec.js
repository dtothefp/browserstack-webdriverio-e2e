import {merge} from 'lodash';
import webdriverio from 'webdriverio';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

var options = {
  desiredCapabilities: {
    browserName: 'chrome'
    //'browserstack.local' : 'true',
    //'browserstack.debug': 'true'
  }
};

var prodConfig = {
  host: 'hub.browserstack.com',
  port: 80,
  user: 'davidfoxpowell1',
  key: 'NjCHjZZp3bmzaDqz6DST',
  loglevel: 'silent'
};

if(!process.env.DEV) {
  merge(options, prodConfig);
}
//const options = {
//desiredCapabilities: {
//browserName: 'chrome'
//}
//};
var client = webdriverio.remote(options);

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = client.transferPromiseness;

describe('Open Google.com', () => {

  before(() => {
    return client
    .init()
    .url('http://www.google.com');
  });

  it('check that the <title> is `Google`', () => {
    return client.getTitle().should.become('Google');
  });

  it('check that the #viewport element is on the page', () => {
    return client.isVisible('#viewport').should.eventually.be.true;
  });

  after(() => {
    return client.end();
  });

});

describe('Open Example.com', () => {

  before(() => {
    return client
    .init()
    .url('http://www.example.com');
  });

  it('check that the <title> is `Example Domain`', () => {
    return client.getTitle().should.become('Example Domain');
  });

  after(() => {
    return client.end();
  });

});
