import gulp from 'gulp';
import http from 'http';
import url from 'url';
import path from 'path';
import express from 'express';
import eslint from 'gulp-eslint';

import buildCSS from './gulp/buildCSS';
import copyImages from './gulp/copyImages';
import watchAssets from './gulp/watchAssets';
import webpack from './gulp/webpack';

// -- Paths and file globs ---------
const HOME_DIR = 'public';
const SRC_DIR = HOME_DIR + '/app';
const DEST_DIR = `public/resources`;
const JS_FILES = `${SRC_DIR}/**/*.js`;
const LESS_FILES = `${SRC_DIR}/**/*.less`;
const IMAGE_FILES = `${SRC_DIR}/images/*`;

// Compile CSS from less files, apply autoprefixer and cssnano
buildCSS.register([LESS_FILES], DEST_DIR, null, [
    'Android >= 4',
    'Chrome >= 45',
    'Firefox >= 38',
    'Explorer >= 10',
    'iOS >= 7',
    'Safari >= 7'
]);

// Webpack tasks (dev and other envs)
webpack.register(SRC_DIR, DEST_DIR);

// Watch for css and images (watch for js handled in webpack)
watchAssets.register([LESS_FILES], [IMAGE_FILES]);

// Copy images
copyImages.register([IMAGE_FILES], `${DEST_DIR}`);

gulp.task('build', ['webpack', 'buildCSS', 'copyImages']);
gulp.task('watch', ['webpackWatch', 'watchAssets']);

// Eslint for style linting
gulp.task('lint', () => {
    return gulp.src([JS_FILES])
    .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('router', function(){
    var app = express();
    var port = process.env.PORT || 8080;

    // static assets
    app.use(express.static(HOME_DIR));

    // Routes
    app.get('/*', function(req, res) { 
        res.sendFile('index.html', {"root": HOME_DIR});
    });

    app.listen(port);
});

gulp.task('start', ['router', 'watch']);
