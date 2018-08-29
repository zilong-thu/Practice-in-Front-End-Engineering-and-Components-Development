# CommonJS 模块系统与 Node.js

## 简史

JavaScript 是一门非常强大的面向对象语言，拥有多个执行最快的动态语言解释器。官方的 JavaScript 标准定义了许多便于开发浏览器应用的对象 API。JavaScript 是如此灵活而强大，很多人期望可以用它做更多的事情，但是当时的这个官方 JavaScript 标准未能给出明确的解决方案。

2009 年 1 月，来自 Mozilla 的工程师 Kevin Dangoor 在一篇题为 What Server Side JavaScript needs <sup>[2]</sup> 的博客文章里提到，他已经在 Google Groups 上面创建了名为 ServerJS 的讨论区，希望大家就 JavaScript 的模块系统、文件系统、包管理系统等对于打造良好的开发者生态非常重要的系统的代码、API设计等进行讨论。这个讨论区很火热，8天内就有 224 人发表了 653 条消息。ServerJS 规范的发展也非常迅速，2009年3月，推出了 CommonJS API 0.1，同年 8 月，这个组织正式改名为 CommonJS，以表示其对通用性的期望。

长远来看，CommonJS 希望自己能够建立起像 Python、Ruby 和 Java 那样丰富的标准库。使用兼容 CommonJS 的系统，开发者可以写出这些类型的应用<sup>[1]</sup>：

+ 服务器端 JavaScript 应用
+ 命令行工具
+ 桌面级的 GUI 应用
+ 混合式应用程序（例如 Titanium、Adobe AIR）

CommonJS 本身包括但不限于下面的内容：

+ Modules
+ Packages
+ Promises/B
+ Promises/C
+ Binary
+ Encodings
+ Filesystem

## Node.js 模块系统的基本概念

模块系统是 CommonJS 规范的一部分，其主要定义了 `exports`、`module`、`require` 以及模块查找规则。Node.js 基本上按照 CommonJS 规范实现了模块系统，不过还是略有差异，因此是一种变体。下面我们来具体看一看。

### 模块查找规则

简单来说，一个文件就是一个模块。例如，`circle.js`：

```javascript
const { PI } = Math;
// 面积
exports.area = (r) => PI * r ** 2;
// 周长
exports.circumference = (r) => 2 * PI * r;
```

使用上面的模块：

```javascript
const circle = require('./circle.js');
console.log(`半径为4的圆的面积 = ${circle.area(4)}`);
```

### 模块作用域

一个模块文件会形成自己的作用域，这个模块作用域下有几个默认的常量和变量：

**__dirname、__filename**

`__dirname` 返回模块文件所在文件目录的绝对路径。

`__filename` 返回模块文件在操作系统里的绝对路径。

以 `/Users/wzl/commonjs-demo/index.js` 文件为例：

```javascript
// /Users/wzl/commonjs-demo/index.js
const path = require('path');

path.dirname(__filename) === __dirname;  // 返回 true

console.log(__filename);
// 输出： /Users/wzl/examples/demo-modules/commonjs/index.js
console.log(__dirname);
// 输出： /Users/wzl/examples/demo-modules/commonjs
```

**module**

以 `/Users/wzl/commonjs-demo/utils.js` 为例，我们在里面声明一个简单的单例对象，并导出：

```javascript
/**
 * util.js
 */
var util = {
  formatNum: function (num, m){
    return Number(num).toFixed(m);
  }
};
module.exprots = util;
console.log(module);
```

在该文件目录下执行 `node util.js`，可以得到（部分为伪代码）：

```javascript
Module {
  id: '.',
  exports: { formatNum: [Function: formatNum] },
  parent: null,
  filename: '/Users/wzl/commonjs-demo/util.js',
  loaded: false,
  children: [],
  paths: [
    '/Users/wzl/commonjs-demo/node_modules',
    '/Users/wzl/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
}
```

+ `module.exports` 是这个模块对外输出的对象，可以被其他模块通过 `require()` 语句获取到
+ `module.children` 是这个模块依赖的子模块列表，每一项都是一个 Module 对象
+ `module.paths` 模块的查找路径
+ `module.parent` 第一次加载本模块的模块

**exports**

`exports` 是一个变量名，指向了 `module.exports`，当初设计它的目的只是为了方便、少些点代码而已。它相当于：

```javascript
var exports = module.exports;

exports.foo = ...
```

模块最终对外输出的始终是 `module.exports`。这意味着对 `exports` 重新赋值并不会影响真正输出的对象。我们来看个例子，修改上面的 `/Users/wzl/commonjs-demo/utils.js` 如下：

```javascript
var util = {
  formatNum: function (num, m){
    return Number(num).toFixed(m);
  }
};
exports = util;
console.log(module);
```

从下面的输出结果，可以看到 `module.exports` 是个空对象 `{}`。如果该模块被其他模块引用，则只能得到一个对象 `{}`。

```javascript
Module {
  id: '.',
  exports: {},
  parent: null,
  filename: '/Users/wzl/commonjs-demo/util.js',
  loaded: false,
  children: [],
  paths:[省略...]
}
```

**require**

`require` 是个函数，用于加载模块。

### 模块包装

Node.js 在解析与执行每个模块之前，会先加上一层包装，类似于：

```javascript
(function(exports, require, module, __filename, __dirname) {
// 模块代码...
});
```

所以，模块作用域实际上是一个函数作用域；而 `__dirname`、`__filename`、`require`、`module` 等模块常量/变量都是外部传入的参数。

## CommonJS 模块系统的问题

In May 2013, Isaac Z. Schlueter, the author of npm, the package manager for Node.js, said CommonJS is being made obsolete by Node.js, and is avoided by the core Node.js developers.<sup>[3]</sup>

## 参考资料

1. CommonJS官网, http://www.commonjs.org/
2. [What Server Side JavaScript needs](http://www.blueskyonmars.com/2009/01/29/what-server-side-javascript-needs/)
3. https://github.com/nodejs/node-v0.x-archive/issues/5132#issuecomment-15432598
