const fs = require('fs');
const path = require('path');
const glob = require('glob');
const gulp = require('gulp');
const fse = require('fs-extra');
const webpack = require('webpack');


const BUILD_STATIC_ROOT = './build/client/pages/';

// 找到所有的 index.js 文件
function findAllJSEntryFiles() {
  const files = glob
    .sync('./client/pages/**/index.js')
    .map(item => ({
      path: item,
      name: item.replace('./client/pages/', '').replace('.js', ''),
    }));

  const clientEntryMap = {};
  files.forEach(item => {
    // clientEntryMap 形如 {
    //   'play/index.js': './client/pages/play/index.js'
    // }
    clientEntryMap[item.name] = item.path;
  });

  return clientEntryMap;
}

// 寻找所有 client 页面 HTML 模板入口文件
function findAllHtmlFiles() {
  const files = glob
    .sync('./client/pages/**/**.njk')
    .map(item => {
      const name = item.replace('./client/pages/', '');
      return {
        name: name,
        js: name.replace('.njk', '.js'),
        path: item,
      };
    });
  return files;
}


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

function removeFiles(globPattern) {
  glob
    .sync(globPattern)
    .forEach(item => {
      fs.unlinkSync(item);
    });
}


// 通过所有的页面 CSS 入口文件来进行编译
function compileCssFiles() {
  const stream = gulp
    .src(['./client/pages/**/index.css', './client/pages/**/index.less'])
    .pipe(gulpLess({
      plugins: [autoprefix]
    }))
    .pipe(gulp.dest('./build/client/pages'));

  stream.on('error', (err) => {
    console.error(err.message);
  });

  stream.on('end', () => {
    const assets = [];
    glob
      .sync('./build/client/pages/**/index.css')
      .forEach(item => {
        const md5sum = md5File(item);
        const newName = item.replace('index.css', `index-${md5sum}.css`);
        fs.renameSync(item, newName);
        assets.push({
          chunkName: newName.replace(BUILD_STATIC_ROOT, ''),
          name: item.replace(BUILD_STATIC_ROOT, ''),
          htmlName: item.replace(BUILD_STATIC_ROOT, '').replace('.css', '.njk'),
        });
      });

    assets.forEach(asset => {
      const cssName = asset.name;
      const njkPath = BUILD_STATIC_ROOT + asset.htmlName;
      let content = fs.readFileSync(njkPath, {encoding: 'utf8'});
      content = content.replace(cssName, asset.chunkName);
      fs.writeFileSync(njkPath, content, 'utf8');
    });

    console.log('\n css 文件摘要计算及重命名完成 ✔');
  });
}


/**
 * copyToStaticDir
 * 从 ./client/pages 目录，复制到 ./build/client/pages 目录下
 * @param  {Array | String} files [
 *   形如：
 *     './client/pages/play/index.njk',
 *     './client/pages/activity/detail/index.njk'
 * ]
 * @return {undefined}
 */
function copyToStaticDir(files) {
  let _files = [];
  if (Array.isArray(files)) {
    _files = files;
  } else {
    _files = [files];
  }

  _files.forEach(f => {
    fse.copySync(f, f.replace('goods-web', 'build'));
  });
}


gulp.task('build-client', function() {
  copyToStaticDir(findAllHtmlFiles().map(h => h.path));
  console.log('\n复制 *.njk 文件到 build 目录 ✔');

  copyImages();

  compileCssFiles();
  console.log('\nless 文件编译完成 ✔');

  /**
   * webpack client config
   */
  const ClientConfig = {
    entry: findAllJSEntryFiles(),
    output: {
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[name]-[chunkhash].js',
      path: path.resolve(__dirname, 'build/client/pages'),
      publicPath: '/wakaka/static/',
    },
    plugins: []
  };

  webpack(ClientConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      // 暂时不需要
    }

    // 替换模板中的脚本引用
    const assets = stats.toJson().assets;
    assets.forEach(asset => {
      const jsName = asset.chunkNames[0] + '.js';
      const htmlName = asset.chunkNames[0] + '.njk';
      const njkPath = BUILD_STATIC_ROOT + htmlName;
      let content = fs.readFileSync(njkPath, {encoding: 'utf8'});
      content = content.replace(jsName, asset.name);
      fs.writeFileSync(njkPath, content, 'utf8');
    });
    console.log('\n替换模板中的 js 引用 ✔');

    // Done processing
    console.log('\nwebpack 构建完成 ✔\n');
    console.timeEnd('build-client');
  });
});

gulp.task('watch-client', () => {
  gulp.watch(['./goods-web/client/pages/**/*'], ['build-client']);
});
