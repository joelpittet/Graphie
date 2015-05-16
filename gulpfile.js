// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps')
    globbing = require('gulp-css-globbing');


//     autoprefixer = require('gulp-autoprefixer'),
//     minifycss = require('gulp-minify-css'),
//     jshint = require('gulp-jshint'),
//     uglify = require('gulp-uglify'),
//     imagemin = require('gulp-imagemin'),
//     pngcrush = require('imagemin-pngcrush'),
//     svg2png = require('gulp-svg2png'),
//     rename = require('gulp-rename'),
//     clean = require('gulp-clean'),
//     concat = require('gulp-concat'),
//     notify = require('gulp-notify'),
//     cache = require('gulp-cache'),
//     iconfont = require('gulp-iconfont'),
//     iconfontCss = require('gulp-iconfont-css'),
//     shell = require('gulp-shell'),
//     consolidate = require('gulp-consolidate'),
//     livereload = require('gulp-livereload');


// Gulp Sass Task.
gulp.task('sass', function() {
  gulp.src('sass/main.scss')
    .pipe(globbing({
        // Configure it to use SCSS files.
        extensions: ['.scss']
    }))
    // Initializes sourcemaps
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        'bower_components/breakpoint-sass/stylesheets',
        'bower_components/normalize-scss',
        'bower_components/susy/sass',
      ],
      errLogToConsole: true
    }))
    // Writes sourcemaps into the CSS file.
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'));
});

// Watch scss folder for changes.
gulp.task('watch', function() {
  // Watch .scss files.
  gulp.watch('sass/**/*.scss', ['sass']);
});

// Creating a default task.
gulp.task('default', ['sass', 'watch']);
