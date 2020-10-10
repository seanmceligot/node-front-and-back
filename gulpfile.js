
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const nodemon = require('gulp-nodemon');
const fs = require("fs");
const babelify = require("babelify");
//const source = require("vinyl-source-stream");

const paths = {
	'source': '.',
	'build': 'build'
}
//const exec = require('gulp-exec');
const CLIENT_SOURCE = [ 
  'common.js',
  'clientapp.js'
];

const SERVER_SOURCE = [ 
  'app.js',
  'serverapp.js'
];
var options = {
  continueOnError: false, // default = false, true means don't emit error event 
  pipeStdout: false, // default = false, true means stdout is written to file.contents 
  customTemplatingThing: "test" // content passed to gutil.template() 
};
const reportOptions = {
  err: true, // default = true, false means don't write err 
  stderr: true, // default = true, false means don't write stderr 
  stdout: true // default = true, false means don't write stdout 
}
SERVER_ESLINT_OPTION = { "configFile":"server.eslintrc.js" }
function task_server_lint(done) {
    gulp.src(SERVER_SOURCE)
        .pipe(eslint(SERVER_ESLINT_OPTION))
        .pipe(eslint.formatEach('stylish', process.stderr));
//        .pipe(eslint.failOnError());
    done()
}
CLIENT_ESLINT_OPTION = { "configFile":"client.eslintrc.js" }
function task_client_lint(done) {
    gulp.src(CLIENT_SOURCE)
        .pipe(eslint(CLIENT_ESLINT_OPTION));
        //.pipe(eslint.formatEach('stylish', process.stderr))
        //.pipe(eslint.failOnError());
    done()
}

function task_browserify(done) {
    if(!fs.existsSync(paths.build)) {
      fs.mkdirSync(paths.build);
    }   
		browserify("clientapp.js")
      .transform("babelify", {presets: ["@babel/preset-env"]})
      .bundle()
      .pipe(fs.createWriteStream("build/clientapp.js"))
		done()
}
gulp.task('default', gulp.series( 
    task_client_lint, 
    task_server_lint,
    task_browserify)
);

gulp.task('start', task_start)

function task_start (done) {
  nodemon({
  script: 'app.js' , 
  ignore: [
    'build/',
    'node_modules/'
  ],
  tasks: ['browserify'] });
  done()
}

