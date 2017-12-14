# UMD 模块系统

鉴于存在 CommonJS、AMD 等不同的模块系统，为了让代码能够同时支持它们，社区提出了一种统一模块定义（Universal Module Definition，UMD）来解决不兼容的问题。

一个常见的 UMD 模块声明实际上是一个立即执行函数表达式：

```javascript
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.Time = factory();
}(this, function () {
  'use strict';
}));
```

UMD 代表了这样的模块设计理念：无论是浏览器环境，还是


> The UMD pattern typically attempts to offer compatibility with the most popular script loaders of the day (e.g RequireJS amongst others). In many cases it uses AMD as a base, with special-casing added to handle CommonJS compatibility.
> 
> -- https://github.com/umdjs/umd

