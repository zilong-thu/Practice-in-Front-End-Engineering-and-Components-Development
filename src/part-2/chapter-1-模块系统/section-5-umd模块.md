# UMD 模块系统

鉴于存在 CommonJS、AMD 等不同的模块系统，为了让代码能够同时支持它们，社区提出了一种统一模块定义（Universal Module Definition，UMD）来解决不兼容的问题。

## 示例

一个常见的 UMD 模块声明实际上是一个立即执行函数表达式。模块的主体在一个工厂方法里面，其返回值作为模块最终暴露的对象。例如下面的模块暴露了一个构造函数 `Time`：

```javascript
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.Time = factory();
}(this, function () {
  // 模块工厂方法开始
  'use strict';
  var _private = '';

  function Time(param) {
    this._date = new Date(param);
  }

  return Time;
  // 模块工厂方法结束
}));
```

## 分析

通常，如果一个变量在取右值时未定义，会发生引用错误（Reference Error），例如

```
// 标识符 an_undefined_token 不在当前作用域链上
console.log(an_undefined_token);

// 会报如下错误
// Uncaught ReferenceError: an_undefined_token is not defined
```

但是 `typeof` 运算符有所不同，`typeof an_undefined_token` 并不会报任何错，而是输出 `undefined`。利用 JS 的这个运算符，我们可以在脚本加载后立即执行模块头部代码，利用特性检测来判断环境中存在的是哪种模块系统。

- 如果`exports`是个对象
- 



> UMD 模块试图对当前最流行的那些脚本加载器（例如 RequireJS）提供足够好的兼容性。很多情况下，它使用 AMD 为基础，并对特殊情况处理以提供 CommonJS 兼容性。
>
> -- 译自 https://github.com/umdjs/umd

