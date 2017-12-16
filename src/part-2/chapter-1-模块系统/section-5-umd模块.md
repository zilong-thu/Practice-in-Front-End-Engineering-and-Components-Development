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




> UMD 模块试图对当前最流行的那些脚本加载器（例如 RequireJS）提供足够好的兼容性。很多情况下，它使用 AMD 为基础，并对特殊情况处理以提供 CommonJS 兼容性。
>
> -- 译自 https://github.com/umdjs/umd

