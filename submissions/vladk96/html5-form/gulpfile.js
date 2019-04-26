const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const uglifycss = require("gulp-uglifycss");
const rename = require("gulp-rename");
const livereload = require("gulp-livereload");

gulp.task("sass", () => {
  return gulp
    .src("src/scss/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(
      uglifycss({
        maxLineLen: 80,
        uglyComments: true
      })
    )
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload());
});

gulp.task("copyImages", () => {
  return gulp
    .src("src/images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(livereload());
});

gulp.task("copyHTML", () => {
  return gulp
    .src("src/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(livereload());
});

gulp.task("default", () => {
  livereload.listen();
  gulp.watch("src/*.html", gulp.series("copyHTML"));
  gulp.watch("src/images/**/*", gulp.series("copyImages"));
  gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
});
