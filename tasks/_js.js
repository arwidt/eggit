
var gulp = require('gulp');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require("gulp-jshint");

var connect = require('gulp-connect');
var browserify = require('browserify');
var transform = require('vinyl-transform');

var gutil = require('gulp-util');

var js_src = [
    './src/js/**/*.js',
    '!**/*.test.js'
    ];

gulp.task('_jshint', function() {
    gulp.src(js_src) 
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('_js', function () {

    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    gulp
    	.src(js_src)
        .pipe(browserified.on('error', gutil.log))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(connect.reload());

});

gulp.task('_libs', function() {

	// gulp
	// 	.src('./src/lib/**/*.js')
	// 	//.pipe(uglify())
	// 	.pipe(concat('lib.min.js'))
	// 	.pipe(gulp.dest('./dist/js/'))
	// 	.pipe(connect.reload());

});