#### Gulp Boilerplate Integration testing with Karma and E2E testing with webdriverio and BrowserStack

#### Setup
- ensure you are on `node v0.12` or later
- go to [Browserstack](https://www.browserstack.com) and create an accout
- go to [Browserstack Automate](https://www.browserstack.com/automate) and copy `username` and `key`
- in `.bash_profile` or `.zshrc`
- when you first run `gulp selenium` you may be prompted to download the [JAVA Runtime](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html) *This may be an incorrect link, hopefully it will prompt you for what you need*
```shell
export BROWSERSTACK_USERNAME='<username>'
export BROWSERSTACK_API='<key>'
```

#### Getting Started
```shell
npm -g uninstall gulp --save
npm -g i gulp#3.9 // ensure the version is 3.9
npm i
gulp // runs dev build (lints files, starts webpack-dev-server, opens webpage at localhost:3001) with livereload for JS
gulp -e prod // runs prod build => uglifies JS
```

#### Gulp Tasks
```shell
gulp mocha // while server is running in separate tab, runs all tests
gulp mocha -f something-spec // runs the test for test/**/something-spec.js
gulp mocha:e2e // run e2e tests with *-phantom-spec.js filepath => must have local server running
gulp test // must have server NOT running, runs all tests
gulp selenium // run e2e tests from local selenium server => must have local server running
gulp selenium:tunnel // run e2e tests from BrowserStack selenium server using local IP => must have local server running
gulp selenium -e prod // run e2e tests from BrowserStack selenium server using hosted IP
gulp karma // run integration tests with Karma using Webapck pre-processor
gulp karma -e prod // run Karma integration tests on BrowserStack with the [karma-browserstack-launcher](https://github.com/karma-runner/karma-browserstack-launcher)
```

#### Cool Stuff
- [webdriverio](http://webdriver.io/) drives our selenium tests, promise or es6 generator API
- when running gulp selenium:tunnel can [Live](https://www.browserstack.com/start) view local site in various browsers on BrowserStack

## Testing Philosophies
![](https://www-static2.strongloop.com/wp-content/uploads/2015/03/975x703xpyramid.png.pagespeed.ic.Ozn480glOj.png)

#### TODO:
- add task strictly for opening BrowserStack tunnel for Live viewing
- add environmental specific eslint rules
- agree on useful eslint rules
- add React .jsx support
- probably lots of other stuff
