var gulp 			= require('gulp');
var sass 			= require('gulp-sass');
var concat 			= require('gulp-concat');
var plumber 		= require('gulp-plumber');
var minifycss 		= require('gulp-minify-css');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var rename          = require('gulp-rename');
var connect 		= require('gulp-connect');

gulp.task('_scss', function(done) {

	gulp.src('./src/scss/main.scss')
		// .pipe(sourcemaps.init())
		.pipe(sass({style: 'compact', errLogToConsole: true}))
		.pipe(autoprefixer())
		// .pipe(sourcemaps.write())
		// .pipe(gulp.dest('./dist/css/'))
		.pipe(minifycss({
			keepSpecialComments: 0
		}))
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(connect.reload())
		.on('end', done);

});

gulp.task('_scss:watch', function() {

	var watcher = gulp.watch(['./src/**/*.scss'], ['_scss']);
	watcher.on('change', function(event) {
		console.log("SASS: " + event.path + " was " + event.type + " reloading!");
	});

});
