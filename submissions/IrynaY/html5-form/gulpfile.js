const browserSync = require('browser-sync');
const del = require('del');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');

gulp.task('clean', () =>  Promise.resolve(del.sync('./build/**/*')));

gulp.task('browserSync', () => browserSync({server: {baseDir: './build'}, notify: false}));

gulp.task('img', () => gulp.src('./app/img/**/*').pipe(imagemin()).pipe(gulp.dest('./build/img/')));

gulp.task('html', () =>
  gulp.src('./app/index.html')
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({stream: true}))
);

gulp.task('sass', () =>
  gulp.src(['./app/style/**/*.scss'])
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(gulp.dest('./build/style'))
    .pipe(browserSync.reload({stream: true}))
);

gulp.task('watch', () => {
  gulp.watch(['./app/img/**/*'], gulp.series('img'));
  gulp.watch(['./app/index.html'], gulp.series('html'));
  gulp.watch(['./app/style/**/*.scss'], gulp.series('sass'));
});

exports.default = gulp.series(
  'clean', 'img', 'sass', 'html',
  gulp.parallel( 'watch', 'browserSync')
);
