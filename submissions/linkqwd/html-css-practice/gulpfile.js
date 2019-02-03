const gulp   = require('gulp'), // Подключаем Gulp
sass         = require('gulp-sass'), //Подключаем sass пакет,
browserSync  = require('browser-sync'), // Подключаем Browser Sync
concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
cleanCss     = require('gulp-clean-css'), // Подключаем пакет для минификации CSS
gcmq         = require('gulp-group-css-media-queries'), // Подключаем для группировки медиа-запросов
del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

var files = {
	js: {
		main: 'src/js/main.js',
		jquery: 'src/libs/jquery/dist/jquery.js'
	}
}

gulp.task('default', ['watch']);

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
	gulp.watch('src/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('src/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('s../img/v1_051523630.png*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'src/' // Директория для сервера - src
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('sass', function() {
	return gulp.src('src/sass/styles.scss')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем sass в CSS посредством gulp-sass
	.pipe(gulp.dest('src/css/')) // Выгружаем результата в папку src/css
	.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
			files.js.jquery // Берем jQuery
		])
		.pipe(concat('libs.js')) // Собираем в новом файле libs.min.js
		.pipe(gulp.dest('src/js/')); // Выгружаем в папку src/js
});

gulp.task('js-minify', function() {
	return gulp.src([ // Берем все необходимые библиотеки
			files.js.jquery, // Берем jQuery
			files.js.main // Берем main.js
		])
		.pipe(concat('scripts.min.js')) // Собираем в новом файле scripts.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('dist/js/')); // Выгружаем в папку src/js
});

gulp.task('css-minify', ['sass'], function() {
	return gulp.src('src/css/styles.css') // Выбираем файл для минификации
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gcmq()) // Группировка медиа-запросов
		.pipe(cleanCss()) // Сжимаем
		.pipe(gulp.dest('dist/css/'));
});

gulp.task('img', function() {
	return gulp.src('src/img/*')
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
	.pipe(gulp.dest('dist/img/'))
});

gulp.task('files-minify', ['css-minify', 'img', 'js-minify']); 

/* Build for production */

gulp.task('build', ['clean', 'files-minify'], function() {
	gulp.src('src/fonts/**/*') // Переносим шрифты в dist
	.pipe(gulp.dest('dist/fonts/'));

	gulp.src('src/*.html') // Переносим HTML в dist
	.pipe(gulp.dest('dist/'));
});

gulp.task('clean', function() {
	return del.sync('dist/'); // Удаляем папку dist перед сборкой
});

/* docs for github pages */

gulp.task('docs', function() {
	gulp.src('dist/**/*').pipe(gulp.dest("./docs"));
});