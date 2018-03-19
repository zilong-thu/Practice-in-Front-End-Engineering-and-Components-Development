const fs   = require('fs');
const path = require('path');
const glob = require('glob');
const gulp = require('gulp');
const fse  = require('fs-extra');
const copydir  = require('copy-dir');
const cleanCSS = require('gulp-clean-css');
const uglify   = require('gulp-uglify');

const BUILD_ROOT = './build/';
const SRC_ROOT = './client';

gulp.task('css', () => {
  return gulp.src(`${SRC_ROOT}/**/*.css`)
    .pipe(cleanCSS())
    .pipe(gulp.dest(BUILD_ROOT));
});

gulp.task('js', () => {
  return gulp.src(`${SRC_ROOT}/**/*.js`)
    .pipe(uglify())
    .pipe(gulp.dest(BUILD_ROOT));
});

gulp.task('copy', () => {
  const files = glob.sync(`${SRC_ROOT}/**/*.!(js|css)`);
  files.forEach(item => {
    fse.copySync(item, item.replace(SRC_ROOT, BUILD_ROOT));
  });
});

gulp.task('watch', () => {
  gulp.watch(['./client/**/*.css'], ['css']);
  gulp.watch(['./client/**/*.js'], ['js']);
  gulp.watch(['./client/**/*.!(js|css)'], ['copy']);
});

gulp.task('default', ['css', 'js', 'copy', 'watch']);
