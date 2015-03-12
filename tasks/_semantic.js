
var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');

gulp.task('_semantic', function() {

	gulp
		.src('node_modules/semantic-ui/dist/semantic.min.js')
		.pipe(gulp.dest('./src/lib/'));

	gulp
		.src('node_modules/semantic-ui/dist/semantic.min.css')
		.pipe(gulp.dest('./src/lib/'));

	gulp
		.src('node_modules/semantic-ui/dist/themes/default/assets/**/*')
		.pipe(gulp.dest('./src/assets/'));

});