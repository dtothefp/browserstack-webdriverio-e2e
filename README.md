#### Gulp Boilerplate Integration testing with Karma and E2E testing with webdriverio and BrowserStack

#### Setup
- ensure you are on `node v0.12` or later
- go to [Browserstack](https://www.browserstack.com) and create an accout
- go to [Browserstack Automate](https://www.browserstack.com/automate) and copy `username` and `key`
- in `.bash_profile` or `.zshrc`
```shell
export BROWSERSTACK_USERNAME='<username>'
export BROWSERSTACK_API='<key>'
```

#### Getting Started
```
npm -g uninstall gulp --save
npm -g i gulp#3.9 // ensure the version is 3.9
npm i
gulp // runs dev build (lints files, starts webpack-dev-server, opens webpage at localhost:3001) with livereload for JS
gulp -e prod // runs prod build => uglifies JS
gulp mocha // while server is running in separate tab, runs all tests
gulp mocha -f something-spec // runs the test for test/**/something-spec.js
gulp test // must have server NOT running, runs all tests
gulp selenium // run e2e tests from local selenium server => must have local server running
gulp selenium:tunnel // run e2e tests from BrowserStack selenium server using local IP => must have local server running
gulp selenium -e prod // run e2e tests from BrowserStack selenium server using hosted IP
```

## Testing Philosophies
![](https://www-static2.strongloop.com/wp-content/uploads/2015/03/975x703xpyramid.png.pagespeed.ic.Ozn480glOj.png)

#### TODO:
- add environmental specific eslint rules
- agree on useful eslint rules
- add Karma testing with Browserstack
- add React .jsx support
- probably lots of other stuff
