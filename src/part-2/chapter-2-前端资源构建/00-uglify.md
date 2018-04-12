# 混淆技术

代码混淆（Obfuscated code）是将计算机程序的代码，转换成一种功能上等价，但是难于阅读和理解的形式的行为。JavaScript 混淆技术主要采取下面这些策略来混淆源代码：

1. 对函数作用域内的变量、函数名称进行替换，例如改写为单个字母
2. 去除换行、空格、制表符等多余空白符

这里我们以最常见的 Uglify.js 为例，介绍混淆技术的基本使用、关键技术原理等内容。

## 基本使用

安装：

```
npm i --save -g uglify-js
```

假如我们在 `in.js` 文件里有如下内容：

```javascript
(function (global) {
  var name = 'Hello';
  console.log(name);
})(window);
```

那么运行：

```
uglifyjs in.js -m -o out.js
```

可以在 `out.js` 里看到混淆处理的结果：

```javascript
(function(o){var l="Hello";console.log(l)})(window);
```

## 混淆技术原理

Uglify.js


## 参考资料

1. [UglifyJS 官网](http://lisperator.net/uglifyjs/)
