const gulp = require('gulp');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

gulp.task('css', () => {
  return gulp.src('src/stylus/screen.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
});

gulp.task('html', () => {
  return gulp.src('src/views/index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('serve', ['css'], () =>{
  browserSync.init({
    server: 'dist/'
  });

  gulp.watch('src/stylus/screen.styl',['css']);
  gulp.watch('src/views/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['css','html','serve']);