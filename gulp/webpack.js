import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';

const DEFAULT_BASE_DEST = 'public';

function createConfig(srcDir, destDir, isDevelopment, watch = false) {
    const entry = {
        application: `./${srcDir}/main.js`,
        vendor: [
            'jquery',
            'lodash',
            'backbone',
            'backbone.layoutmanager',
            'jquery-ui/ui/datepicker.js'
        ]
    };

    const output = {
        path: destDir,
        filename: '[name].js'
    };

    const loaders = [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.hbs$/,
            loader: 'handlebars-loader',
            exclude: /node_modules/,
            query: {
                knownHelpers: ['formatDate', 'formatTime', 'formatRelative', 'formatNumber', 'formatMessage', 'intlGet', '#intl']
            }
        },
        {
            test: /\.coffee$/,
            loader: 'coffee-loader'
        },
        {
            test: /\.js$/,
            loader: 'eslint-loader?{emitWarning:true, quiet:true}',
            exclude: /node_modules/
        },
        {test: require.resolve('jquery'), loader: 'expose?$'},
        {test: require.resolve('jquery'), loader: 'expose?jQuery'},
        {test: require.resolve('lodash'), loader: 'expose?_'},
        {test: require.resolve('backbone'), loader: 'expose?Backbone'}
    ];

    const resolve = {
        extensions: ['', '.js', '.jsx', '.coffee'],
        modulesDirectories: ['public/app', 'node_modules'],
        alias: {'handlebars': 'handlebars/runtime.js'}
    };

    const node = {
        fs: 'empty'
    };

    const windowGlobals = {
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        '_': 'lodash',
        'Backbone': 'backbone'
    };

    // Environment specific
    let plugins, sourceMap;

    if (isDevelopment) {
        plugins = [
            new webpack.ProvidePlugin(windowGlobals),
            new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
        ];

        sourceMap = 'eval-cheap-module-source-map';
    }
    else {
        plugins = [
            new webpack.DefinePlugin({
                'process.env': {
                    // This has effect on the react lib size
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.ProvidePlugin(windowGlobals),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                output: {comments: false},
                compress: {warnings: false}
            }),
            new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
        ];

        sourceMap = 'none';
    }

    return {
        entry,
        output,
        module: {loaders},
        node,
        resolve,
        plugins,
        devtool: sourceMap,
        watch
    };
}

// -- Handle build results --------------------

function onBuild(error, stats) {
    // Config error
    if (error) {
        throw new gutil.PluginError('webpack', error);
    }

    // JS syntax errors
    const jsonStats = stats.toJson();
    let beep = false;

    if (jsonStats.errors.length > 0) {
        for (let i = 0; i < jsonStats.errors.length; i++) {
            gutil.log(stats.toJson().errors[i]);
        }
        beep = true;
    }

    // Warnings (includes eslint errors)
    if (jsonStats.warnings.length > 0) {
        for (let j = 0; j < jsonStats.warnings.length; j++) {
            gutil.log(stats.toJson().warnings[j]);
        }
        beep = true;
    }

    // Only want to beep once
    if (beep) {
        gutil.beep();
    }

    // log the successfully updated asset(s)
    Object.keys(stats.compilation.assets).forEach((key) => {
        if (stats.compilation.assets[key].emitted) {
            gutil.log('Webpack:', gutil.colors.green(key));
        }
    });
}

// -- Gulp task configuration -----------------

let task = {
    _registered: false,
    register(srcDir, destDir) {
        destDir = destDir || DEFAULT_BASE_DEST;

        // Take the base destination path and append 'js'
        destDir = `${destDir}/js`;

        if (!this._registered) {
            // Note registration
            this._registered = true;

            // Clean up and prepare
            //assistant.prepare(destDir);

            // Task for all environments except dev (uglify, dedup, and eliminate source maps for rubicon)
            gulp.task('webpack', () => {
                webpack(createConfig(srcDir, destDir, false), onBuild);
            });

            // Task for dev environment
            gulp.task('webpackDev', () => {
                webpack(createConfig(srcDir, destDir, true), onBuild);
            });

            // Run weback in "watch" mode
            gulp.task('webpackWatch', () => {
                webpack(createConfig(srcDir, destDir, true, true), onBuild);
            });
        }
    }
};

export default task;
