var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

var JS_PATH = 'public/js/**/*.js';
var CSS_PATH = 'public/css/**/*.css';

gulp.task('css', function() {

    return gulp.src(CSS_PATH)
        .pipe(plumber(function(err) {
            console.log('error');
            console.log(err);
        }))
        .pipe(plumber.stop())
        .pipe(minifyCss())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./public/dist/css/'))
        .pipe(livereload())

});

gulp.task('js', () => {

    return gulp.src(JS_PATH)
        .on('error', function(err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/dist/js/'))
        .pipe(rename('vendor.min.js'))
        .pipe(livereload())

});

gulp.task('sass', () => {
    return gulp.src('public/scss/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9']
        }))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/dist/scss/'))
        .pipe(livereload())
})

gulp.task('watch', () => {
    require('./app.js');
    livereload.listen();
    gulp.watch([JS_PATH, CSS_PATH, 'public/scss/styles.scss'], ['js', 'css', 'sass']);
});

