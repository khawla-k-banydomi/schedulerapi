var gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  babel = require('babel-register');
var run = require('gulp-run');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec

// test task
gulp.task('test', async () => {
  return await console.log('Gulp Tasks are working!!');
});

// server task
gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: ['dist /']
  })
    .on('restart', function () {
      console.log('restart server');
    })
});

// run tests task
gulp.task('task', async () => {
  return await gulp.src(['test/*.js'])
    .pipe(mocha({
      compilers: babel
    }));
});


// watch server
gulp.task('watch', function () {
  gulp.watch('app/**/*.js', ['bundle-watch']);
  gulp.watch(paths.copyFromAppDir, { cwd: 'app' }, ['copy-watch']);
  gulp.watch('app/**/*.less', ['less-watch']);
});

// start node server
gulp.task('start', function (cb) {
  exec('node app.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

exports.default = test;
