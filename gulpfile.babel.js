import gulp from 'gulp';
import http from 'http';
import url from 'url';
import path from 'path';
import eslint from 'gulp-eslint';
// import shell from 'gulp-shell';

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

// -- Register Tasks --------------

// Eslint for style linting
gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src([JS_FILES])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});



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

// -- Compound Tasks -----------------------

// Build task for development env.
gulp.task('buildDev', ['webpackDev', 'buildCSS', 'copyImages']);

// Build for deployment/release (used by TeamCity)
gulp.task('build', ['webpack', 'buildCSS', 'copyImages']);

// Watch
// Unfortunately webpack does not have an option to just watch and not build, so
// our watch task here actually builds the JS assets as well. We could watch
// through gulp, but its too slow. Watching in webpack is much faster since it
// only builds the chunk that is dirty, not all the vendor files. Watching in
// webpack rebuilds changes in less than 1 sec, in gulp it would be around 8 secs.
gulp.task('watch', ['webpackWatch', 'watchAssets']);

gulp.task('router', function(){
    var express = require('express');
    var app     = express();
    var port    =   process.env.PORT || 8080;
    // static assets
    app.use(express.static(HOME_DIR));

    // Routes
    app.get('/', function(req, res) { 
        res.sendFile('index.html', {"root": HOME_DIR});
    });
    
    app.listen(port);
});

// Start task - Run jetty server and watch
// gulp.task('javaserver', shell.task(['mvn clean jetty:run']));
gulp.task('start', ['router', 'lint', 'watch']);
