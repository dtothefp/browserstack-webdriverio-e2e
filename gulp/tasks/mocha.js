import {resolve, join} from 'path';

export default function(gulp, plugins, config) {
  var {testPaths, file} = config;
  var {mocha, exit} = plugins;
  let babelPath = resolve(__dirname, '..', 'config/babelhook');
  file = file || '*-spec';

  return (testType) => {
    var src;

    if(typeof testType !== 'function' && testType === 'phantom') {
      src = join(process.cwd(), 'test/e2e/*-phantom-spec.js');
    } else {
      src =  join(process.cwd(), 'test/unit/**/', `${file}.js`);
    }

    return gulp.src([
        src,
        '!' + join(process.cwd(), 'test/**/*-{selenium,karma}-spec.js')
      ])
      .pipe(mocha({
        timeout: 40000,
        require: [ babelPath ]
      }))
      .pipe(exit());
  };
}
