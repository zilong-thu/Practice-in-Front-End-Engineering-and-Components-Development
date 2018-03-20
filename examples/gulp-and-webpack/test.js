const glob = require('glob');

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

console.log(findAllJSEntryFiles());
