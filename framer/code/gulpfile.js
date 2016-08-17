'use strict';

var gulp          = require('gulp'),
    sourcemaps    = require('gulp-sourcemaps'),
    concat        = require('gulp-concat'),
    filter        = require('gulp-filter'),
    plumber       = require('gulp-plumber'),
    fileinclude   = require('gulp-file-include'),
    rigger        = require('gulp-rigger'),
    coffee        = require('gulp-coffee'),
    mainBowerFiles = require('main-bower-files'),
    browserSync   = require('browser-sync'),
    del           = require('del'),
    path          = require('path'),
    sketch        = require('gulp-sketch'),
    streamqueue   = require('streamqueue'),

    input  = {
      'html':       'src/*.html',
      'coffeescript':'src/*.coffee',
      'framer':     'src/framer/**/*',
      'images':     'src/images/**/*',
      'sketch':     'src/*.sketch', /* for stuff you want to auto-export */
      'imported':   'src/imported/**/*' /* For stuff imported with the Framer Generator*/
      },
    output = {
      'html':       '../project/',
      'framer':     '../project/framer',
      'javascript': '../project/js/',
      'images':     '../project/images/',
      'imported':   '../project/imported'
    }
;

// error function for plumber
var onError = function (err) {
  browserSync.notify(err.message, 30000);
  this.emit('end');
};

// BrowserSync proxy
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
        baseDir: '../project/'
      },
      online: false
  });
});

// Compiling the coffee (the prototype made by designer)
gulp.task('compile-coffee', function () {
    gulp.src(input['coffeescript'])
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest(output['javascript']))
        .pipe(browserSync.stream());
});

gulp.task('copy', function(){
  gulp.src(input['imported'])
    .pipe(gulp.dest(output['imported']));
    gulp.src(input['images'])
      .pipe(gulp.dest(output['images']));
});

gulp.task('setup', function(){
  gulp.src(input['framer'])
    .pipe(gulp.dest(output['framer']));
  gulp.src(input['html'])
    .pipe(gulp.dest(output['html']));
});

gulp.task('sketch', function(){
  gulp.src(input['sketch'])
    .pipe(sketch({
      export: 'slices',
      format: 'png',
      saveForWeb: true,
      scales: 1.0,
      trimmed: false
    }))
    .pipe(gulp.dest(output['images']))
    .on('error', function (error) {
            console.error('' + error);
            console.error("You probably didn't install gulptool, see the readme")
        });
})

gulp.task('watch', function() {
  gulp.watch(input['coffeescript'], ['compile-coffee']);
  gulp.watch(input['imported'], ['copy']);
  gulp.watch(input['sketch'], ['sketch']);
});

gulp.task('default', ['setup', 'compile-coffee', 'copy', 'sketch', 'browser-sync', 'watch']);
