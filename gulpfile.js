var gulp = require('gulp');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var webpack = require('gulp-webpack');

gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    	overrideBrowserslist: [
    		'last 2 versions'
    	]
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function () {
	browserSync.init({
		server: './public',
		notify: false,
		open: true
	});
});

gulp.task('js-compile', function() {
  return gulp.src('./src/js/test.js')
    .pipe(webpack({
        watch: true,
        entry: {
            test: './src/js/test.js'
        },
        output: {
            filename: '[name].js'
        }
    }))
    .pipe(gulp.dest('./public/js/bundle.js'));
});

gulp.task('default', ['sass', 'browser-sync', 'js-compile'], function () {
	gulp.watch('./src/scss/**/*', ['sass']);
});