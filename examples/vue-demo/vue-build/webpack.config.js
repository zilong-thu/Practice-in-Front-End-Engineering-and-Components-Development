const fs                = require('fs');
const path              = require('path');
const VueLoaderPlugin   = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rimraf            = require('rimraf');
const mkdirp            = require('mkdirp');

const config = {
  mode: 'development',
  entry: {
    home: './src/pages/home/index.vue',
    explore: './src/pages/home/index.vue',
  },
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
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    // HMR shows correct file names in console on update.
    new webpack.NamedModulesPlugin(),
    // new ExtractTextPlugin('[name].[contenthash].css')
  ],
}

const entry = config.entry;
const pageEntryNames = Object.keys(entry);
let vueTemplateFile = fs.readFileSync('./src/entry-template.js').toString();

const CACHE_DIR_NAME = '.cache';
try {
  if (fs.statSync(CACHE_DIR_NAME)) {
    rimraf.sync(CACHE_DIR_NAME);
    console.log('临时目录已删除');
  }
  if (fs.statSync(config.output.path)) {
    rimraf.sync(config.output.path);
    console.log('构建目标目录已删除');
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

  config.entry[name] = newEntry;
  config.plugins.push(pluginItem);
});
console.log(config);
module.exports = config;
