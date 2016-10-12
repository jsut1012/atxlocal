import gulp from 'gulp';
import less from 'gulp-less';
import concat from 'gulp-concat';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

/**
 * Build CSS assets
 * Provides a task for concatenating LESS files, compiling LESS to CSS, autoprefixing,
 * and compressing with cssnano. It can process files from one or multiple directories,
 * or from any level of a nested file structure.
 *
 * Usage:
 *   buildCSS.register([LESS_FILES], DEST_DIR, 'app.js', [
 *       'Android >= 4',
 *       'Chrome >= 45',
 *       'Firefox >= 38',
 *       'Explorer >= 10',
 *       'iOS >= 7',
 *       'Safari >= 7'
 *   ]);
**/

const DEFAULT_SRCS = ['src/**/*.less'];
const DEFAULT_BASE_DEST = 'public';
const DEFAULT_BROWSERS = ['last 2 versions'];
const DEFAULT_OUT_FILE = 'application.css';

let task = {
    _registered: false,

    register(srcs, destDir, outputFilename, browsers) {
        srcs = srcs || DEFAULT_SRCS;
        destDir = destDir || DEFAULT_BASE_DEST;
        outputFilename = outputFilename || DEFAULT_OUT_FILE;
        browsers = browsers || DEFAULT_BROWSERS;

        // Take the base destination path and append 'css'
        destDir = `${destDir}/css`;

        if (!this._registered) {
            // Note registration
            this._registered = true;

            // Clean up and prepare
            //assistant.prepare(destDir);

            gulp.task('buildCSS', () => {
                let processors = [
                    autoprefixer({browsers}),
                    cssnano({safe: true})
                ];
                return gulp.src(srcs)
                    .pipe(concat(outputFilename))
                    .pipe(less())
                    .pipe(postcss(processors))
                    .pipe(gulp.dest(destDir));
            });
        }
    }
};

export default task;
