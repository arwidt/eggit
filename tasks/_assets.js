
var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('_assets', function() {

    gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist/assets/'))
        .pipe(connect.reload());

});