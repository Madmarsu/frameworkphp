/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | This file serves as a Task Manager for the whole project.
 |
 | To simplify our development workflow, we will declare our
 | previously required 3rd-party dependencies in package.json.
 |
 |
 */

/**
 * Require dependencies
 */
const dotenv      = require('dotenv').config(),
	  gulp        = require('gulp'),
	  concat      = require('gulp-concat'),
	  uglify      = require('gulp-uglify'),
	  sourcemaps  = require('gulp-sourcemaps'),
	  less        = require('gulp-less'),
	  prefixer    = require('gulp-autoprefixer'),
	  cssmin      = require('gulp-cssmin'),
	  imagemin    = require('gulp-imagemin'),
	  browserSync = require('browser-sync').create();

/**
 * Paths settings
 */
const path = {
	// Source and raw files
	src:   {
		views:  'resources/views/',
		js:     'resources/assets/js/',
		css:    'resources/assets/less/',
		img:    'resources/assets/images/',
		fonts:  'resources/assets/fonts/',
		vendor: 'vendor/bower_components/'
	},
	// Compiled and generated builds
	build: {
		js:    'public/assets/js/',
		css:   'public/assets/css/',
		img:   'public/assets/img/',
		fonts: 'public/assets/fonts/'
	},
	// Paths to be watched for a changes
	watch: {
		html:  'resources/views/**/*',
		js:    'resources/assets/js/**/*',
		css:   'resources/assets/less/**/*',
		img:   'resources/assets/img/**/*',
		fonts: 'resources/assets/fonts/**/*'
	}
};

/**
 * Build javascript
 */
//gulp.task('js:build', function () {
//	gulp.src(path.src.js)
//		.pipe(sourcemaps.init()) // initialize sourcemap
//		.pipe(uglify()) // compress js file
//		.pipe(sourcemaps.write()) // write sourcemap for compressed js
//		.pipe(gulp.dest(path.build.js)) // output compiled file
//		.pipe(browserSync.reload()); // command server to refresh
//});

gulp.task('js:build', function () {
	gulp.src([
		path.src.vendor + 'jquery/dist/jquery.js',
		path.src.vendor + 'bootstrap/dist/js/bootstrap.js',
	])
		.pipe(concat('appstrap.js'))
		.pipe(gulp.dest(path.build.js));
});
