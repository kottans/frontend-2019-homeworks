const gulp = require('gulp');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

function style() {
    return gulp.src('app/sass/main.scss')
        .pipe(sass())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload({ start: true }))
}
function watch(){
    livereload.listen();
    gulp.watch('app/sass/', style)
}

function images() {
    return gulp
        .src("app/images/**/*")
        // .pipe(newer("./_site/assets/img"))
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [
                        {
                            removeViewBox: false,
                            collapseGroups: true
                        }
                    ]
                })
            ])
        )
        .pipe(gulp.dest("dist/images"));
}

gulp.task('sass',style);

gulp.task('watch',watch);

gulp.watch("app/images/**/*", images);

