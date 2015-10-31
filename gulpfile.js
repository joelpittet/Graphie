/*!
 * gulp
 *
 * $ npm install gulp del gulp-sass gulp-sourcemaps gulp-css-globbing gulp-autoprefixer \
 *   gulp-minify-css gulp-jshint  gulp-uglify gulp-imagemin \
 *   gulp-notify gulp-cache  \
 *   --save-dev
 */

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md

// Load plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var globbing = require('gulp-css-globbing');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var svg2png = require('gulp-svg2png');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var del = require('del');


// Images.
gulp.task('images', function () {
  return gulp.src('img/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// SVG fallback PNGs.
gulp.task('svg2png', function () {
  gulp.src('svg/**/*.svg')
    .pipe(svg2png())
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('svg'));
});

// Gulp Sass.
gulp.task('sass', function() {

  var sass_options = {
    includePaths: [
      'bower_components/breakpoint-sass/stylesheets',
      'bower_components/normalize-scss',
      'bower_components/susy/sass'
    ],
    outputStyle: 'expanded',
    errLogToConsole: true
  };

  var autoprefixer_options = {
    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 9', 'ie 10'],
    cascade: true
  };

  gulp.src('sass/main.scss')
    .pipe(globbing({
        // Configure it to use SCSS files.
        extensions: ['.scss']
    }))
    // Initializes sourcemaps.
    .pipe(sourcemaps.init())
    .pipe(sass(sass_options).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixer_options))
    // Writes sourcemaps into the CSS file.
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Watch scss folder for changes.
gulp.task('watch', function() {
  // Watch .scss files.
  gulp.watch('sass/**/*.scss', ['sass']);
});

// Creating a default task.
gulp.task('default', ['sass', 'watch']);
