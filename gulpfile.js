var gulp  = require('gulp'),
    mocha = require('gulp-mocha');

var modules = ['crm', 'invoice', 'support'];

gulp.task('test', function () {
  return gulp.src(['./test/**/*.js'], { read: false })
    .pipe(mocha({ reporter: 'dot' }));
});

modules.forEach(function (module) {
  gulp.task('test:' + module, function () {
    return gulp.src(['./test/'+ module + '.js'], { read: false })
      .pipe(mocha({ reporter: 'dot' }));
  });
});

gulp.task('default', function () {
  modules.forEach(function (module) {
    gulp.watch(['./lib/' + module + '.js', './test/' + module + '.js'], ['test:' + module]);
  });
});
