'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const pug = require('gulp-pug');
const livereload = require('gulp-livereload');

gulp.task('convertSass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 10%']))
    .pipe(gulp.dest('dist/css/'))
    .pipe(livereload());
});

gulp.task('clean', function () {
  return gulp.src('dist/*', {read:false})
    .pipe(clean());
});

gulp.task('copyImages', function(){
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(livereload());
});

gulp.task('convertPug', function(){
  return gulp.src('src/**/*.pug')
    .pipe(pug({
      doctype: 'html',
      pretty: true,
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload());
});

gulp.task('default', function(){
  livereload.listen();
  gulp.watch('src/*.pug', gulp.series('convertPug'));
  gulp.watch('src/images/**/*', gulp.series('copyImages'));
  gulp.watch('src/scss/**/*.scss', gulp.series('convertSass'));
});
