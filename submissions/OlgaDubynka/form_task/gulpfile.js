var gulp      	 = require('gulp');
var scss         = require('gulp-sass');
var imagemin     = require('gulp-imagemin');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', function() {
   return gulp.src('src/scss/**/*.scss')
       .pipe(scss())
       .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false }))
       .pipe(gulp.dest('dist/css'))
       .pipe(browserSync.reload({stream: true}))
});

gulp.task('pages', function(){
    return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('img', function() {
    gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false 
	});
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('default', function() {
    gulp.start('pages', 'scss', 'browserSync', 'img', 'scripts');
    gulp.watch('src/*.html', ['pages']);
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/js/**/*.js', ['scripts']);
});


