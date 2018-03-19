const fs   = require('fs');
const path = require('path');
const glob = require('glob');
const gulp = require('gulp');
const copydir = require('copy-dir');


const BUILD_ROOT = './build/';
const SRC_ROOT = './client';

gulp.task('build-client', function() {
  console.time('build-client');
  copydir.sync(SRC_ROOT, BUILD_ROOT);
  console.timeEnd('build-client');
});

gulp.task('watch', () => {
  gulp.watch(['./client/**/*'], ['build-client']);
});

gulp.task('default', ['build-client', 'watch']);
