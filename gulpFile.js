var gulp = require('gulp');
var ugliy = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

gulp.task('css', function() {

    return gulp.src('public/css/**/*.css')
        .pipe(minifyCss())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./public/dist/css/'))

});

