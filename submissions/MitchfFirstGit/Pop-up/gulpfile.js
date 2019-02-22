const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const nano = require('gulp-cssnano');
gulp.task('sass-compile', function() {
    return gulp.src('./scss/main.scss')
        .pipe(sass())
        .pipe(nano())
        .pipe(gulp.dest('./css/'))
})

gulp.task('watch', function() {
    gulp.watch('./scss/main.scss', gulp.series('sass-compile'))
})
