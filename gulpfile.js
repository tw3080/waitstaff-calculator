var gulp = require('gulp');
var watch = require('gulp-watch');
var less = require('gulp-less');

gulp.task('watch', function() {
   // Watch less files
  watch('less/style.less', function() {
    gulp.start('less');
    });
 });

 gulp.task('less', function() {
    return gulp.src('less/style.less')
        .pipe(less())
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['watch']);
