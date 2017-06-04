/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix is a configuration layer on top of Webpack.
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 | @docs https://laravel.com/docs/5.4/mix
 |
 */

/**
 * ===== Require dependencies =====
 */
// Require main dependency
const {mix} = require('laravel-mix');
// Require additional plugins
let ImageminPlugin = require('imagemin-webpack-plugin').default;
let BrowserSyncPlugin = require('browser-sync-webpack-plugin');

/**
 * ===== Webpack's plugins configuration =====
 */

mix.webpackConfig({
    plugins: [
        // Image compressing
        new ImageminPlugin({
            pngquant: {
                quality: '50-60'
            },
            test: /\.(jpe?g|png|gif|svg)$/i,
        }),
        // Automated browser sync on file changes
        new BrowserSyncPlugin({
            open: 'external',
            host: process.env.APP_URL,
            proxy: process.env.APP_URL,
            files: [
                'resources/views/**/*.php',
                'app/**/*.php',
                'routes/**/*.php'
            ]
        })
    ]
});
mix.options({
    // Turn off URL Processing in raw CSS files
    processCssUrls: false,
});

// Activate sourceMap for development needs
mix.sourceMaps();

// Set public assets path
mix.setPublicPath('public/assets/');

/**
 *  ===== Webpack's workflow =====
 */

// Copy raw image files to public
mix.copy('resources/assets/images', 'public/assets/images');

// Compile raw javascript file to public
mix.js('resources/assets/js/app.js', 'js');

// Compile raw stylesheet file to public
mix.sass('resources/assets/sass/app.scss', 'css');
