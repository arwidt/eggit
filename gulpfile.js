
var gulp = require('gulp');
var require_dir = require('require-dir');
var dir = require_dir('./tasks');

gulp.task('dist', ['_js', '_libs', '_less', '_jade', '_assets', '_index'], function() {
	console.log("BUILD COMPLETE");
});

gulp.task('start', ['_js', '_libs', '_less', '_jade', '_assets', '_index', '_server'], function() {
	
	gulp.watch(['./src/**/*', '!./src/lib/**/*', '!./src/assets/**/*'], ['_semantic', '_js', '_libs', '_less', '_jade', '_assets', '_index']);

	// gulp.watch(css_src, ['css']);
	// gulp.watch(html_src, ['html', 'gfx']);
	// gulp.watch('src/**/*.jade', ['html']);
	// gulp.watch('src/**/*.js', ['js']); //'jshint', 
	// gulp.watch('src/**/*.+(png|gif|jpg|svg)', ['gfx']);

});