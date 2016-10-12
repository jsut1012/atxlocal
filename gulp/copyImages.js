import gulp from 'gulp';
//import assistant from '@homeaway/base-gulp/lib/assistant';

/**
 * Copy image assets
 * Provides a task for copying images from a directory in your source tree
 * to an 'images' directory in the supplied base destination path.
 *
 * Usage:
 *   copyImages.register([IMAGE_FILES], DEST_DIR);
**/

const DEFAULT_BASE_DEST = 'public';

let task = {
    _registered: false,

    register(imageFiles, destDir) {
        destDir = destDir || DEFAULT_BASE_DEST;

        // Take the base destination path and append 'images'
        destDir = `${destDir}/images`;

        if (!this._registered) {
            // Note registration
            this._registered = true;

            // Clean up and prepare
            //assistant.prepare(destDir);

            gulp.task('copyImages', () => {
                gulp.src(imageFiles)
                    .pipe(gulp.dest(destDir));
            });
        }
    }
};

export default task;
