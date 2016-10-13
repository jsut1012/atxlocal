import gulp from 'gulp';
import eslint from 'gulp-eslint';

let task = {
    _registered: false,

    register: function(srcs) {
        if (!this._registered) {
            // Note registration
            this._registered = true;

            return gulp.src([srcs])
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
        }
    }
};

export default task;
