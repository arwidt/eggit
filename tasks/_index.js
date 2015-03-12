
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var lib = require('bower-files')();
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var minifycss = require('gulp-minify-css');

gulp.task('_index', function() {

	gulp.src(lib.ext('js').files)
		.pipe(concat('lib.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js/'));

	gulp.src(lib.ext('css').files)
		.pipe(concat('lib.min.css'))
		.pipe(minifycss({keepBreaks:true}))
		.pipe(gulp.dest('./dist/css/'));

});



