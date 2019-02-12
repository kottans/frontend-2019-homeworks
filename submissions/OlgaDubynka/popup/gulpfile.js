var gulp      	= require('gulp');
var scss        = require('gulp-sass');
var imagemin    = require('gulp-imagemin');
// var rename      = require('gulp-rename');
// var pngquant    = require('imagemin-pngquant');
// var cache		= require('gulp-cache');
// var uglify       = require('gulp-uglify');
// var csslint     = require('gulp-csslint');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
// var jade         = require('gulp-jade');

gulp.task('scss', function() {
   return gulp.src('src/scss/**/*.scss')
       .pipe(scss())
       .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false }))
       .pipe(gulp.dest('dist/css'))
       .pipe(browserSync.reload({stream: true}))
});

// gulp.task('build-jade', function () {
//     return gulp.src('src/**/*.jade')
//         .pipe(jade()) // pip to jade plugin
//         .pipe(gulp.dest('./dist/')); // tell gulp our output folder
// });

gulp.task('pages', function(){
    return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream: true}))
});

// simple variant for img
gulp.task('img', function() {
    gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

// gulp.task('img', function() {
//     gulp.src('src/img/**/*')
//         .pipe(cache(imagemin({
//             interlaced: true,
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngquant()]
//         })))
//         .pipe(gulp.dest('dist/img'))
// });

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false // delete notifications in browser-sync
	});
});

// to run this task enter 'gulp jade' in command line
// gulp.task('jade', function() {
//     return gulp.src('src/templates/**/*.jade')
//         .pipe(jade()) 
//         .pipe(gulp.dest('dist/development')); // path for compiled HTML files
// });

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        // .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

// gulp.task('scripts', function() {
//     return gulp.src('src/js/**/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'))
// });

gulp.task('default', function() {
    gulp.start('pages', 'scss', 'browserSync', 'img', 'scripts');
    gulp.watch('src/*.html', ['pages']);
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/js/**/*.js', ['scripts']);
});
