var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var jshint = require("gulp-jshint");
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var recess = require('gulp-recess');

// URLS
var js_src = './src/js/**/*.js';
var css_src = './src/css/**/*.+(less|css)';
var less_src = './src/css/style.less';
var html_src = './src/**/*.html';
var jade_src = './src/index.jade';

gulp.task('jshint', function() {
	gulp.src(js_src) 
		.pipe(jshint())
		.pipe(jshint.reporter());
});

gulp.task('js', function() {
	gulp.src(js_src)
		.pipe(uglify())
		.pipe(concat('eggit.min.js'))
		.pipe(gulp.dest('public/js/'));

	gulp.src(['./node_modules/jquery/dist/jquery.min.js',
				'./node_modules/jquery.transit/jquery.transit.js',
				'./node_modules/underscore/underscore-min.js',
				'./node_modules/bootstrap/dist/js/bootstrap.min.js',
				'./node_modules/backbone/backbone-min.js',
				'./node_modules/snapsvg/dist/snap.svg-min.js'])
		.pipe(concat('eggit.lib.js'))
		.pipe(gulp.dest('public/js/'));

	gulp.src(['./node_modules/backbone/backbone-min.map'])
		.pipe(gulp.dest('public/js/'))
		.pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src([less_src])
		.pipe(less())
		.pipe(minifycss({keepBreaks:true}))
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('public/css/'))
		.pipe(connect.reload());

	gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css')
		.pipe(concat('bootstrap.min.css'))
		.pipe(gulp.dest('public/css/'));
});

gulp.task('html', function() {
	gulp.src(jade_src)
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest('public/'))
		.pipe(connect.reload());

	gulp.src(html_src)
		.pipe(gulp.dest('public/'))
		.pipe(connect.reload());
});

gulp.task('gfx', function() {
	gulp.src('src/**/*.+(png|gif|jpg|svg)')
		.pipe(rename({dirname: ''}))
		.pipe(gulp.dest('public/gfx/'))
		.pipe(connect.reload());
});

gulp.task('server', function() {
	connect.server({
		root: 'public',
		port: 3000,
		livereload: true
	});
});

// MAIN TASKS
gulp.task('default', ['jshint', 'js', 'css', 'html', 'gfx'], function() {
	//console.log("COMPLETE");
});

gulp.task('watch', ['default', 'server'], function() {
	gulp.watch(css_src, ['css']);
	gulp.watch(html_src, ['html', 'gfx']);
	gulp.watch('src/**/*.jade', ['html']);
	gulp.watch('src/**/*.js', ['jshint', 'js']);
	gulp.watch('src/**/*.+(png|gif|jpg|svg)', ['gfx']);
});