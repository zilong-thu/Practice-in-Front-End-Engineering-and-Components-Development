const fs                = require('fs');
const path              = require('path');
const glob              = require('glob');
const VueLoaderPlugin   = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// rimraf 提供了类似 Linux 系统下的 rm 命令
const rimraf            = require('rimraf');
// mkdirp 用于创建文件目录
const mkdirp            = require('mkdirp');

/**
 * 第一步
 * 按照约定的格式，寻找页面入口文件
 */
const entryFiles = glob.sync('./src/pages/**/*/index.vue');
console.log('entryFiles: ', entryFiles);
const entry = {};
const entryHtmlPlugins = [];
entryFiles.forEach(item => {
  let key = item.replace('./src/pages/', '').replace('/index.vue', '').replace('/', '.');
  entry[key] = path.resolve(item);
});

/**
 * 第二步
 * 根据 vue 模板，生成可以被 webpack 使用的入口 js 文件
 */
const pageEntryNames = Object.keys(entry);
let vueTemplateFile = fs.readFileSync('./src/vue-template.js').toString();

const CACHE_DIR_NAME = '.cache';
try {
  if (fs.statSync(CACHE_DIR_NAME)) {
    rimraf.sync(CACHE_DIR_NAME);
    console.log('临时目录已删除');
  }
  if (fs.statSync(config.output.path)) {
    rimraf.sync(config.output.path);
    console.log('构建结果目录已删除');
  }
} catch(e) {}
mkdirp(CACHE_DIR_NAME);

// html 模板文件路径
const htmlTemplate = path.resolve('./src/index.html');

pageEntryNames.forEach(name => {
  let content = vueTemplateFile.replace('${path}', path.resolve(entry[name]));
  let newEntry = path.resolve(CACHE_DIR_NAME, './', name + '.js');
  fs.writeFileSync(newEntry, content);
  const pluginItem = new HtmlWebpackPlugin({
    // 输出时，要写入的文件名
    filename: `${name}.html`,
    // 读取的模板文件
    template: htmlTemplate,
    inject: true,
    chunks: [name],
  });

  entry[name] = newEntry;
  entryHtmlPlugins.push(pluginItem);
});

/**
 * 第三步
 * 声明配置对象，设置 output、文件加载器、插件等
 */
const config = {
  mode: 'development',
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ].concat(entryHtmlPlugins),
}

module.exports = config;
