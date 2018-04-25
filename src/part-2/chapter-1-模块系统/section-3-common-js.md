# CommonJS 模块系统

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

## CommonJS 模块系统的基本概念

模块系统是 CommonJS 规范的一部分。其主要定义了 `exports`、`module`、`require` 以及模块查找规则。

**模块查找规则**

简单来说，一个文件就是一个模块。

**exports**

**module**


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
```

**require**


## CommonJS 模块系统的问题

In May 2013, Isaac Z. Schlueter, the author of npm, the package manager for Node.js, said CommonJS is being made obsolete by Node.js, and is avoided by the core Node.js developers.<sup>[3]</sup>

## 参考资料

1. CommonJS官网, http://www.commonjs.org/
2. [What Server Side JavaScript needs](http://www.blueskyonmars.com/2009/01/29/what-server-side-javascript-needs/)
3. https://github.com/nodejs/node-v0.x-archive/issues/5132#issuecomment-15432598
