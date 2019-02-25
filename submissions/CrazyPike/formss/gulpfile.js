const gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let imagemin = require('gulp-imagemin');

gulp.task('minify-css', () => {
    // Folder with files to minify
    return gulp.src('*.css')
    //The method pipe() allow you to chain multiple tasks together
    //I execute the task to minify the files
        .pipe(cleanCSS())
        //I define the destination of the minified files with the method dest
        .pipe(gulp.dest('dist'));
});

var clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('compress', function() {
   return gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});