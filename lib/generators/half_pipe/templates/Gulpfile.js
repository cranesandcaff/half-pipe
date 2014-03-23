var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    minifyCSS = require('gulp-minifycss')
    newer = require('gulp-changed');

var paths = {
  scripts: 'app/scripts',
  components: ['app/components'], //Manually add bower component files to this array 
  images: 'app/images',
  style: 'app/styles'
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('main.min.js'))
    .pipe(uglify())    
    .pipe(gulp.dest('app/assets/scripts/'));
});

gulp.task('vendor', function(){
  return gulp.src(paths.components)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('app/assets/vendor'))
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('app/assets/vendor'))
})

// Copy all static images
gulp.task('images', function() {
 return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

gulp.task('style',function(){
  return gulp.src(paths.style)
    .pipe(sass({style: 'expanded'}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('app/styles'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCSS())
    .pipe(gulp.dest('app/styles'))
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.scripts, ['vendor']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.style, ['style']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'vendor', 'images', 'style', 'watch']);

gulp.task('build', ['scripts', 'vendor', 'images', 'style']);