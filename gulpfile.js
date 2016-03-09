
var gulp = require('gulp');
var require_dir = require('require-dir');
var del = require('del');
var runsequence = require('run-sequence');
var dir = require_dir('./tasks');

gulp.task('clear', function() {

	del.sync(['dist/']);

});

gulp.task('watch', function(callback) {

	runsequence(
		'_js',
		'_jade',
		'_scss',
		'_js:watch',
		'_jade:watch',
		'_scss:watch',
		'_server:frontend',
		callback);

});
