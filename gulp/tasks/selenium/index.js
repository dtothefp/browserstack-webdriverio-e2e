import {join} from 'path';
import BrowserStackTunnel from 'browserstacktunnel-wrapper';
import selenium from 'selenium-standalone';
import install from './install';

export default function(gulp, plugins, config) {
  const babelPath = join(process.cwd(), 'gulp/config/babelhook');
  var {mocha, gutil} = plugins;
  var {PluginError} = gutil;
  var {ENV} = config;
  var isDev = ENV === 'DEV';

  function runMocha(cb) {
    return gulp.src([
      join(process.cwd(), 'test/e2e/local-selenium-spec.js')
    ])
    .pipe(mocha({
      timeout: 40000,
      require: [ babelPath ]
    }))
    .once('error', cb)
    .once('end', cb);
  }

  function killTunnel(instance, cb) {
    instance.stop(function(error) {
      if (error) {
        console.log(error);
      }
      cb();
    });
  }

  return (testType, cb) => {
    //switch the params is the test is not bound
    if(typeof testType === 'function') {
      cb = testType;
    }

    if(testType === 'tunnel' && isDev) {
      /**
       * gulp selenium:tunnel
       * Start a Browserstack tunnel to allow using local IP's for
       * Browserstack tests (Automate) and live viewing (Live)
       */
      process.env.isTunnel = true;
      let browserStackTunnel = new BrowserStackTunnel({
        key: process.env.BROWSERSTACK_API,
        hosts: [{
          name: 'localhost',
          port: 3000,
          sslFlag: 0
        }],
        v: true,
        //important to omit identifier
        //localIdentifier: 'my_tunnel', // optionally set the -localIdentifier option
        forcelocal: true
      });

      browserStackTunnel.on('started', () => {
        gutil.log(browserStackTunnel.stdoutData);
      });

      browserStackTunnel.start(function(error) {
        if (error) {
          gutil.log('[tunnel start]', error);
        } else {
          runMocha((param) => {
            killTunnel(browserStackTunnel, () => {
              if(param && param.message) {
                gutil.log(`Mocah Error: ${param.message}`);
              }
              process.exit();
              cb();
            });
          });
        }
      });
    } else if(isDev) {
      install(() => {
        selenium.start({
          spawnOptions: {
            stdio: 'ignore'
          }
        }, (err, child) => {
          if(err) {
            throw new PluginError({
              plugin: '[selenium]',
              message:  `${err.message} => ps aux | grep selenium and kill process id`
            });
          }

          runMocha(() => {
            child.kill();
            cb();
          });

        });
      });
    } else {
      runMocha(cb);
    }
  };
}
