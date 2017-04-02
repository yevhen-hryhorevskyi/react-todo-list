var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    gulpSequence = require('gulp-sequence'),
    clean = require('gulp-clean'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-ruby-sass'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    notify = require("gulp-notify"),
    inject = require('gulp-inject'),
    webpack = require('gulp-webpack');

var buildUtils = require('./buildUtils');

var ROOT_DIR = './src',
    ROOT_SASS_DIR = ROOT_DIR + '/__sass';

var ROOT_TARGET_DIR = './target';

var isDev = false;

// Delete all files in target
gulp.task('clean', function () {
    return gulp.src(ROOT_TARGET_DIR, {read: false}).pipe(clean());
});

gulp.task('set-dev-configs', function () {
    isDev = true;
});

// Styles
gulp.task('build-styles', function () {
    return sass(ROOT_SASS_DIR + '/all-styles.scss', {style: 'expanded', sourcemap: isDev})
        .pipe(gulpif(isDev, rename({basename: 'app'})))
        .pipe(gulpif(!isDev, rename({basename: 'app-' + buildUtils.hashCode(new Date())})))
        .pipe(gulpif(isDev, sourcemaps.write('./maps')))
        .pipe(gulpif(!isDev, cssnano({zindex: false})))
        .pipe(gulp.dest(ROOT_TARGET_DIR))
        .pipe(notify({message: 'Styles task complete'}));
});

gulp.task('build-js', function () {
    return gulp.src(ROOT_DIR + '/main.js')
        .pipe(webpack(require('./webpack.prod.config.js')))
        .pipe(gulp.dest(ROOT_TARGET_DIR))
        .pipe(notify({message: 'JS are built'}));
});

var injectResources = function () {
    return gulp.src(ROOT_DIR + '/*html.tmpl')
        .pipe(inject(gulp.src(ROOT_TARGET_DIR + '/app*.css', {read: false}), {
            name: 'app',
            transform: buildUtils.rootPathInjectTransformer
        }))
        .pipe(inject(gulp.src(ROOT_TARGET_DIR + '/app*.js', {read: false}), {
            name: 'app',
            transform: buildUtils.rootPathInjectTransformer
        }))
        .pipe(rename({basename: 'index', extname: '.html'}))
        .pipe(gulp.dest(ROOT_TARGET_DIR));
}

gulp.task('inject-resources', injectResources);

// Watchers...
gulp.task('watch-handler', function () {
    gulp.watch(ROOT_DIR + '/*.html.tmpl', ['inject-resources']);
    gulp.watch(ROOT_DIR + '/**/*.scss', ['build-styles']);

    return gulp.src(ROOT_DIR + '/main.js')
        .pipe(webpack(require('./webpack.dev.config.js')))
        .pipe(gulp.dest(ROOT_TARGET_DIR))
        .pipe(notify(injectResources))
        .pipe(notify({message: 'JS are built'}));
});

gulp.task('build', gulpSequence('clean', 'build-styles', 'build-js', 'inject-resources'));
gulp.task('watch', gulpSequence('clean', 'set-dev-configs', 'build-styles', 'watch-handler'));
