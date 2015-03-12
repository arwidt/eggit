var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var connect = require('gulp-connect');

var less_src = './src/css/style.less';

gulp.task('_less', function() {

	gulp
		.src(less_src)
		.pipe(less())
		//.pipe(minifycss({keepBreaks:true}))
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('dist/css/'))
		.pipe(connect.reload());

	// gulp
	// 	.src('./src/lib/*.css')
	// 	.pipe(concat('lib.min.css'))
	// 	.pipe(gulp.dest('./dist/css/'))
	// 	.pipe(connect.reload());

});