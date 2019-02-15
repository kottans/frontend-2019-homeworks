const gulp = require('gulp');
const sass = require('gulp-sass');
// const nano = require('gulp-cssnano');
const watch = require('gulp-watch');
gulp.task('sass-compile', function() {
    return gulp.src('./scss/main.scss')
        .pipe(sass())
        // .pipe(nano())
        .pipe(gulp.dest('./css/'))
})

gulp.task('watch', function() {
    gulp.watch('./scss/main.scss', gulp.series('sass-compile'))
})
