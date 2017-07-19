const pify = require('pify');
const glob = require('glob');
const path = require('path');


function getEntryObj() {
  /**
   * files: [
   *   './client/pages/home/index.js',
   *   './client/pages/explore/index.js'
   * ]
   */
  const files = glob.sync('./client/pages/**/index.js');

  /**
   * {
   *   'home/index': './client/pages/home/index.js'
   * }
   */
  const entryObj = {};

  const reg = /\.\/client\/(pages\/.+)\.js/;

  files.forEach(file => {
    let res = reg.exec(file);
    if (res && res[1]) {
      let key = res[1];
      let val = file;
      entryObj[key] = val;
    }
  });

  return entryObj;
}


module.exports = {
  entry: getEntryObj(),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
  }
};
