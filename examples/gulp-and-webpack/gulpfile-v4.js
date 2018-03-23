const fs       = require('fs');
const path     = require('path');
const glob     = require('glob');
const gulp     = require('gulp');
const crypto   = require('crypto');
const fse      = require('fs-extra');
const webpack  = require('webpack');
const copydir  = require('copy-dir');
const cleanCSS = require('gulp-clean-css');
const uglify   = require('gulp-uglify');
const gulpLess = require('gulp-less');


const BUILD_ROOT = './build/';
const SRC_ROOT = './client';

/**
 * 根据文件的内容，计算其 md5 摘要
 * @param  {String} filename [文件的路径]
 * @return {String}          [文件内容的 MD5 摘要]
 */
function md5File(filename) {
  const content = fs.readFileSync(filename, {encoding: 'utf8'});
  return crypto
    .createHash('md5')
    .update(content, 'utf8')
    .digest('hex');
}

/**
 * 给定 glob 规则，删除所有匹配的文件
 * @param  {String} globPattern [glob 规则]
 */
function removeFiles(globPattern) {
  glob
    .sync(globPattern)
    .forEach(item => {
      fs.unlinkSync(item);
    });
}


/**
 * css 编译、压缩及摘要计算、HTML插入任务
 */
gulp.task('css', () => {
  removeFiles(`${SRC_ROOT}/**/index-*.css`);

  const stream = gulp.src(`${SRC_ROOT}/**/*.css`)
    .pipe(gulpLess())
    .pipe(cleanCSS())
    .pipe(gulp.dest(BUILD_ROOT));

  stream.on('error', (err) => {
    console.error(err.message);
  });

  stream.on('end', () => {
    const assets = [];

    glob
      .sync(`${BUILD_ROOT}/**/index.css`)
      .forEach(item => {
        const md5sum = md5File(item);
        const newName = item.replace('index.css', `index-${md5sum}.css`);
        fs.renameSync(item, newName);
        assets.push({
          chunkName: newName.replace(BUILD_ROOT, ''),
          name: item.replace(BUILD_ROOT, ''),
          htmlName: item.replace(BUILD_ROOT, '').replace('.css', '.html'),
        });
      });

    console.log('css assets: ', assets);

    assets.forEach(asset => {
      const cssName = asset.name;
      const htmlPath = BUILD_ROOT + asset.htmlName;
      const content = fs.readFileSync(htmlPath, {encoding: 'utf8'});
      const newContent = content.replace(cssName, asset.chunkName);
      fs.writeFileSync(htmlPath, newContent, 'utf8');
    });

    console.log('\n css 文件摘要计算及重命名完成 ✔');
  });
});


// 找到所有的 index.js 文件
function findAllJSEntryFiles() {
  const files = glob
    .sync(`${SRC_ROOT}/**/index.js`)
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
  removeFiles(`${SRC_ROOT}/**/index-*.js`);
  const entry = findAllJSEntryFiles();
  console.log('entry: ', entry, '\n');
  const conf = {
    entry: entry,
    output: {
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[name]-[chunkhash].js',
      path: path.resolve(__dirname, 'build'),
    }
  };

  webpack(conf, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log('-- error --');
      return;
    }

    // 替换模板中的脚本引用
    const assets = stats.toJson().assets;
    assets.forEach(asset => {
      const jsName = asset.chunkNames[0] + '.js';
      const htmlName = asset.chunkNames[0] + '.html';
      const htmlPath = BUILD_ROOT + htmlName;
      let content = fs.readFileSync(htmlPath, {encoding: 'utf8'});
      content = content.replace(jsName, asset.name);
      fs.writeFileSync(htmlPath, content, 'utf8');
    });
    console.log('\n替换模板中的 js 引用 ✔');

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
