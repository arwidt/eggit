
var gulp = require('gulp');
var connect = require('gulp-connect');
var nodemon = require('gulp-nodemon');

gulp.task('_server', function() {
    // connect.server({
    //     root: 'dist/',
    //     port: 3000,
    //     livereload: true
    // });

	nodemon({ script: './bin/www', ext: 'html js', ignore: ['ignored.js'] })
	.on('restart', function () {
		console.log('restarted!');
	});
	
});