var gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  babel = require('babel-register');
var run = require('gulp-run');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;

gulp.task('install', function () {
  return run('npm install --also=dev || echo already installed').exec();
});

gulp.task('install-production', function () {
  return run('npm install').exec();
});

gulp.task('build', function () {
  return run('echo build success').exec();
});

// server task
gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: ['dist /'],
  }).on('restart', function () {
    console.log('restart server');
  });
});

// run tests task
gulp.task('test', async () => {
  return await gulp.src(['test/*.js']).pipe(
    mocha({
      compilers: babel,
      exit: true,
    })
  );
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
});
