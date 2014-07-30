var gulp = require('gulp');
var mjs = require('gulp-mjs');

var paths = {
    src: ['*.mjs'],
    dest: '.'
};

function build() {
    return gulp
      .src(paths.src)
      .pipe(mjs({debug: true}).on('error', onError))
      .pipe(gulp.dest(paths.dest));
}

function onError(err) {
  console.warn(err.stack || err.message || err.toString());
}

gulp.task('build', build);

gulp.task('default', ['build']);
