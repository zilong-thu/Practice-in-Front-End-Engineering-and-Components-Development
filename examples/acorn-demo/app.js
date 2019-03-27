const fs         = require('fs');
const {Parser}   = require('acorn');
const walk       = require('acorn-walk');
const escodegen  = require('escodegen');

console.log(JSON.stringify(Parser.parse('const a = 1;')));

// 读取 util.js 里的文件内容
const fileContent = fs.readFileSync('./util.js');
// 生成抽象语法树
const ast = Parser.parse(fileContent, {
  // 注意这里指定了源内容的类型为 module，即模块
  sourceType: 'module'
});


// 定义访问者函数
const visitors = {
  // 会在每次遇到一个 type 为 ExportNamedDeclaration 的节点时执行此函数
  ExportNamedDeclaration(node) {
    if (node.declaration.type === 'FunctionDeclaration') {
      console.log(`找到了一个 export 函数的语句，函数名称是：${node.declaration.id.name}`);
      node.declaration.id.name = '$' + node.declaration.id.name;
    }
  }
};
// 遍历抽象语法树
walk.simple(ast, visitors);

fs.writeFileSync('util-new.js', escodegen.generate(ast, {
  format: {
    // 指定输出代码的缩进为两个空格
    indent: {
      style: '  ',
    }
  }
}));
