const fs   = require('fs');
const path = require('path');
const glob = require('glob');
const gulp = require('gulp');
const fse  = require('fs-extra');
const webpack  = require('webpack');
const copydir  = require('copy-dir');
const cleanCSS = require('gulp-clean-css');
const uglify   = require('gulp-uglify');
const gulpLess = require('gulp-less');


const BUILD_ROOT = './build/';
const SRC_ROOT = './client';

gulp.task('css', () => {
  return gulp.src(`${SRC_ROOT}/**/*.css`)
    .pipe(gulpLess())
    .pipe(cleanCSS())
    .pipe(gulp.dest(BUILD_ROOT));
});


// 找到所有的 index.js 文件
function findAllJSEntryFiles() {
  const files = glob
    .sync('./client/**/index.js')
    .map(item => ({
      path: item,
      name: item.replace('./client/', '').replace('.js', ''),
    }));

  const pagesJsEntry = {};
  files.forEach(item => {
    // pagesJsEntry 形如 {
    //   'home/index': './client/home/index.js'
    // }
    pagesJsEntry[item.name] = item.path;
  });

  return pagesJsEntry;
}

gulp.task('js', () => {
  const conf = {
    entry: findAllJSEntryFiles(),
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, 'build'),
    }
  };

  webpack(conf, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log('-- error --');
      return;
    }

    // Done processing
    console.log('\nwebpack 构建完成 ✔\n');
  });
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
