var gulp = require('gulp');

require('./gulptasks/compile_js');

gulp.task('compile', [
	'compile_js'
]);