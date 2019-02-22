const gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    csso         = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    babel        = require('gulp-babel'),
    cache        = require('gulp-cache'),
    fileinclude  = require('gulp-file-include'),
    notify       = require('gulp-notify'),
    path         = require('path'),
    plumber      = require('gulp-plumber'),
    config       = require('./config'),
    rename       = require('gulp-rename'),
    critical     = require('critical');
    imagemin     = require('gulp-imagemin');   



gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe (sass ())
        .pipe (autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe (gulp.dest('./css'))
        .pipe (browserSync.reload({stream: true}))
});


gulp.task('html', () =>
    gulp
        .src(path.join(config.root.dev, config.html.dev, './**/*.html'))
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: path.join(
                config.root.dev,
                config.html.dev,
                config.html.parts,
            ),
        }))
        .pipe(gulp.dest(path.join(config.html.dist)))
        .pipe(browserSync.reload({ stream: true })));




gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false

    });
});

gulp.task('imagemin', function() {
    gulp.src('./img/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(imagemin())
    .pipe(gulp.dest('./img'))
})


gulp.task('critical', function(cb) {
        critical.generate({
        inline: true,
        base: './',
        src: 'index.html',
        dest: 'index.html',
        minify: true,
    });
});


gulp.task('babel', () =>
    gulp.src('js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('js/dist'))
);



gulp.task('cssmin', function () {
    return gulp.src('./css/styles.css')
        .pipe(csso())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css/'));
});




gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./js/.*js', ['babel'], browserSync.reload);
    gulp.watch('./html/**/*.html', ['html']);
    gulp.watch('./js/*.js', browserSync.reload);
    gulp.watch('./css/*.css', ['cssmin']);
    gulp.watch('./css/styles.min.css', browserSync.reload);
    gulp.watch('./css/styles.min.css', ['critical']);
});
