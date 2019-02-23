const { src, dest } = require('gulp');
const stylus = require('gulp-stylus');
const watch = require('gulp-watch');

function watchCSS(cb) {
	return watch('source/stylus/*', { ignoreInitial: false })
		.pipe(stylus())
		.pipe(dest('css'));
}

exports.watchCSS = watchCSS;
exports.default = watchCSS;
