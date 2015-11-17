var gulp 		= require('gulp');
var browserify 	= require('gulp-browserify');
var rename 		= require("gulp-rename");
var concat 		= require('gulp-concat');
var sourcemaps 	= require('gulp-sourcemaps');
var plumber		= require('gulp-plumber');
var notify		= require('gulp-notify');
var gulpif 		= require('gulp-if');
var uglify		= require('gulp-uglify');

gulp.task('compile_js', function() {
	return gulp.src(['src/*.js', '!src/*.spec.js'])
	.pipe(plumber({
		errorHandler: notify.onError("Error: <%= error.message %>")
	}))
	.pipe(browserify({
		transform: ['babelify'],
		debug: true
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/'))
	.pipe(uglify())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('dist/'))
});