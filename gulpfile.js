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
      argv        = require('yargs').argv, // .pipe(gulpif(argv.production, uglify()))
      gulp        = require('gulp'),
      gulpif      = require('gulp-if'),
      concat      = require('gulp-concat'),
      uglify      = require('gulp-uglify'),
      sourcemaps  = require('gulp-sourcemaps'),
      less        = require('gulp-less'),
      prefixer    = require('gulp-autoprefixer'),
      cssmin      = require('gulp-clean-css'),
      rename      = require('gulp-rename'),
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
        less:   'resources/assets/less/',
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
        app:    'app/**/*',
        config: 'config/**/*',
        routes: 'routes/**/*',
        langs:  'resources/lang/**/*',
        views:  'resources/views/**/*',
        js:     'resources/assets/js/**/*',
        css:    'resources/assets/less/**/*',
        img:    'resources/assets/img/**/*',
        fonts:  'resources/assets/fonts/**/*'
    }
};


/**
 * Build javascript
 */
gulp.task('js:build', function () {
    gulp.src([
        path.src.vendor + 'jquery/dist/jquery.js',
        path.src.vendor + 'bootstrap/dist/js/bootstrap.js'
    ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());
});

/**
 * Production: Build javascript
 */
gulp.task('js:prod', ['js:build'], function () {
    gulp.src([path.build.js + '**/*', '!'+path.build.js + '**/*.min.js'])
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.js));
});

/**
 * Build CSS pre-processor
 */
gulp.task('css:build', function () {
    gulp.src([
        path.src.less + 'vendor.less',
        path.src.less + 'template.less'
    ])
        .pipe(less())
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
});

/**
 * Build Template CSS pre-processor
 */
gulp.task('css:template', function () {
    gulp.src(path.src.less + 'template.less')
        .pipe(less())
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
});

/**
 * Production: Build CSS pre-processor
 */
gulp.task('css:prod', ['css:build'], function () {
    gulp.src([path.build.css + '**/*', '!'+path.build.css + '**/*.min.css'])
        // .pipe(sourcemaps.init())
        .pipe(cssmin())
        // .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css));
});

/**
 * Copy images to public directory
 */
gulp.task('img:copy', function () {
    gulp.src(path.src.img + '**/*')
        .pipe(gulp.dest(path.build.img))
});

/**
 * Copy images to public directory
 */
gulp.task('fonts:copy', function () {
    gulp.src(path.src.fonts + '**/*')
        .pipe(gulp.dest(path.build.fonts))
});

/**
 * Live-reload: Source file watcher
 */
gulp.task('watcher', function () {
    browserSync.init({
        host:   process.env.APP_URL.replace(/^\/\/|^.*?:\/\//, ''), // Hostname or IP for external access.
        port:   3000, // Use a specific port.
        proxy:  process.env.APP_URL, // Proxy to existing virtual host.
        tunnel: false, // Tunnel the server through a random Public URL.
        online: true, // Will not attempt to determine your network status, assumes you're ONLINE.
        open:   false, // Decide which URL to open automatically - false / local / external / tunnel
        notify: false // Don't show any notifications in the browser.
    });

    // Watch for files, run a task on change
    gulp.watch(path.src.less + 'template.less', ['css:template']);
    gulp.watch(path.src.js + '*.js', ['js:build']);

    // Watch for files, refresh on change
    gulp.watch(path.watch.app).on('change', browserSync.reload);
    gulp.watch(path.watch.config).on('change', browserSync.reload);
    gulp.watch(path.watch.routes).on('change', browserSync.reload);
    gulp.watch(path.watch.langs).on('change', browserSync.reload);
    gulp.watch(path.watch.views).on('change', browserSync.reload);
});


gulp.task('default', ['js:build', 'css:build', 'img:copy', 'fonts:copy']);
gulp.task('production', ['js:build', 'js:prod', 'css:build', 'css:prod']);
gulp.task('watch', ['default', 'watcher']);

