
var gulp = require('gulp');
var jade = require('gulp-jade');
var connect = require('gulp-connect');

var jade_src = './src/index.jade';

gulp.task('_jade', function() {

    gulp.src(jade_src)
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());

});

gulp.task('_jade:watch', function() {

	var watcher = gulp.watch(['./src/**/*.jade'], ['_jade']);
	watcher.on('change', function(event) {
		console.log("JADE: " + event.path + " was " + event.type + " reloading!");
	});

});
