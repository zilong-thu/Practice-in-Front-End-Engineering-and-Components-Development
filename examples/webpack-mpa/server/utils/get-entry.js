const path = require('path');
const glob = require('glob');


module.exports = function getWebpackEntryObj() {
  /**
   * files: [
   *   './client/pages/home/index.js',
   *   './client/pages/explore/index.js'
   * ]
   */
  const files = glob.sync(path.resolve(__dirname, '../../client/pages/**/index.jsx'));
  /**
   * {
   *   'home/index': './client/pages/home/index.js'
   * }
   */
  const entryObj = {};

  const reg = /\/client\/(pages\/.+)\.jsx/;

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
