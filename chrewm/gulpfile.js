'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

gulp.task('dictionary', function () {
  return require('fs').readFile('./dictionary.json', 'utf8', function(e, data) {
    if (e) {
      console.log('Error: ' + e);
      return false;
    }
    var dictionary = JSON.parse(data);
    Object.keys(dictionary).forEach(function(key){
      dictionary[key.toLowerCase()] = dictionary[key].toLowerCase();
    });
    require('fs').writeFile('./src/_dictionary.json', JSON.stringify(dictionary));
    return true;
  });
});

gulp.task('js', ['dictionary'], function(){
  return gulp.src('./src/main.js')
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.browserify())
    .on("error", $.notify.onError('Browserify failed…'))
    .on('error', $.util.log)
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({stream:true, once: true}));
})

gulp.task('watch', ['js', 'copy'], function(){
  gulp.watch(['./dictionary.json', './src/**/*'], ['js']);
  gulp.watch(['src/manifest.json'], ['copy']);
})

gulp.task('copy', function(){
  return gulp.src([
      'src/manifest.json',
      'src/icon.png'
    ])
    .pipe(gulp.dest('build'))
})

gulp.task('browser-sync', function() {
    var opts = {
      open: false,
      server: {
        baseDir: "./"
      }
    };
    browserSync.init(null, opts);
});

gulp.task('default', ['watch', 'browser-sync']);

gulp.task('build', ['copy', 'js']);