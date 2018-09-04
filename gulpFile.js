var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
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
        .pipe(minifyCss())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./public/dist/css/'))
        .pipe(livereload())

});

gulp.task('js', () => {

    return gulp.src(JS_PATH)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist/js/'))
        .pipe(rename('vendor.min.js'))
        .pipe(livereload())

});

gulp.task('watch', () => {
    require('./app.js');
    livereload.listen();
    gulp.watch([JS_PATH, CSS_PATH], ['js', 'css']);
});

