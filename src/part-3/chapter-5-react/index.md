# React 组件化开发

## 起源

React 发源自 Facebook 的 PHP 框架 XHP。XHP 扩展了 PHP 的语法，使得在 PHP 代码中可以直接使用 XML 字面量来表达 HTML 模板/元素等，也可以很方便地自定义可复用的 HTML 元素。Facebook 将其在 GitHub 上进行了开源。后来统一交给 HHVM 团队进行维护。

使用传统的 PHP 语法，一个简单的页面可能是这样子：

```
<?php
$href = 'http://www.facebook.com';
echo "<a href=$href>Facebook</a>";
```

但是如果借助 XHP 扩展，页面可以这样写：

```
<?php
$href = 'http://www.facebook.com';
echo <a href={$href}>Facebook</a>;
```

区别主要有两点：

+ 输出 HTML 片段时，不使用字符串，而是直接使用 XML
+ HTML 片段里的变量，使用大括号`{}`进行引用

XHP 并非这种语法扩展的原创。E4X（ECMAScript for XML）可以说是在编程语言中使用 XML 的最早鼻祖，它在2004年进行了标准化，并且一度在各主流浏览器中得到了实现。不过，由于其规则过于复杂，在 JS 引擎中实现 E4X 功能经常出现问题，因此，这样的功能特性逐渐在浏览器中消亡。2014年，Mozilla 将 E4X 标准彻底废除。

XHP 的这个特性实际上体现了服务器端开发对于可复用的自定义元素的诉求。这本应该是前端开发的范畴。后来，Facebook 的开发人员们也不遗余力，借助同样的语法扩展理念，推出了 JSX，以便在 JavaScript 中直接使用 XML 来声明或定义 HTML 元素。

## JSX

Douglas Crockford 在《JavaScript语言精粹》一书里，指出了 JavaScript 的诸多设计缺陷，整理出一个“优雅”的子集。E4X 虽然已经不复存在，但是有些好的特性依然影响着后来的开发者。React 的 JSX 就是这样的产物：它不再期望被各浏览器厂商进行原生实现，而只是规定了一些方便书写 HTML 元素或自定义元素的语法接口。

> JSX is an XML-like syntax extension to ECMAScript without any defined semantics. It's NOT intended to be implemented by engines or browsers. It's NOT a proposal to incorporate JSX into the ECMAScript spec itself. It's intended to be used by various preprocessors (transpilers) to transform these tokens into standard ECMAScript.

## 参考资料


+ [XHP: Introduction | HHVM](https://docs.hhvm.com/hack/XHP/introduction)
+ [ECMAScript for XML | wikipedia](https://en.wikipedia.org/wiki/ECMAScript_for_XML)
+ [Draft: JSX Specification](https://facebook.github.io/jsx/)

