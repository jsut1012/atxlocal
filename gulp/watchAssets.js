import gulp from 'gulp';

/**
 * Watch task for LESS files and Image directory changes
 *
 * Usage:
 *   watchAssets.register([LESS_FILES], [IMAGE_FILES]);
**/

let task = {
    _registered: false,

    register(cssFiles, imageFiles) {
        if (!this._registered) {
            // Note registration
            this._registered = true;

            gulp.task('watchAssets', () => {
                gulp.watch(cssFiles, ['buildCSS']);
                gulp.watch(imageFiles, ['copyImages']);
            });
        }
    }
};

export default task;
