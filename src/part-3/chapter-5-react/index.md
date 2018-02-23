# React 组件化开发

React 诞生于 2011 年，由 Facebook 的一位员工 Jordan Walke 发明。在 Facebook 的新闻流产品中使用了一段时间后，Instagram 也使用该框架进行了部分业务构建。2013 年 3 月，在美国 JS 开发者大会上，Facebook 将 React 的代码正式开源。React 只处理用户界面相关的逻辑，对应着 MVC（Model-View-Controller） 架构里的 V（View）。

## 起源

Jordan Walke 创造 React 的灵感来自 Facebook 的 PHP 框架 XHP<sup>[1]</sup>。XHP 扩展了 PHP 的语法，使得在 PHP 代码中可以直接使用 XML 字面量来表达 HTML 模板/元素等，也可以很方便地自定义可复用的 HTML 元素。Facebook 将其在 GitHub 上进行了开源。后来统一交给 HHVM 团队进行维护。

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

XHP 并非这种语法扩展的原创。E4X（ECMAScript for XML）可以说是在编程语言中使用 XML 的最早鼻祖，它在2004年进行了标准化，并且一度在各主流浏览器中得到了实现。不过，由于其规则过于复杂，在 JS 引擎中实现 E4X 功能经常出现问题，因此，这样的功能特性逐渐在浏览器中消亡。2014年，Mozilla 将 E4X 标准彻底废除<sup>[2]</sup>。

XHP 的这个特性实际上体现了服务器端开发对于可复用的自定义元素的诉求。这本应该是前端开发的范畴。后来，Facebook 的开发人员们也不遗余力，借助同样的语法扩展理念，推出了 JSX，以便在 JavaScript 中直接使用 XML 来声明或定义 HTML 元素。

## JSX

Douglas Crockford 在《JavaScript语言精粹》一书里，指出了 JavaScript 的诸多设计缺陷，整理出一个“优雅”的子集。E4X 虽然已经不复存在，但是有些好的特性依然影响着后来的开发者。React 的 JSX 就是这样的产物：它不再期望被各浏览器厂商进行原生实现，而只是规定了一些方便书写 HTML 元素或自定义元素的语法接口。

鉴于 JSX 的通用性，2014年9月，Facebook 的官方开发团队发布了一份 JSX 规范。该规范的开头如此声明：

> JSX 是基于 XML 风格对 ECMAScript 进行的语法扩展。它不打算被任何引擎或浏览器实现，**也不必被纳入到 ECMAScript 标准当中**。它应当通过各种预处理器（编译器，transpilers）转换为标准的 ECMAScript 代码。<sup>[3]</sup>

在 React 中，下面这样的 JSX 代码，

```
<div className="sidebar" />
```

将被翻译为标准的 ECMAScript 代码：

```
React.createElement(
  'div',
  {className: 'sidebar'},
  null
)
```

关于 JSX 与 HTML/XML 的关系，Facebook 的 JSX 规范里如此解释：

> 这个规范（指 JSX）并不打算去遵循任何 XML 或者 HTML 规范。JSX 是作为 ECMAScript 的一种特性来设计的。只是为了让大家便于上手，才设计得为 XML 语法风格。<sup>[3]</sup>


## 参考资料


1. [XHP: Introduction | HHVM](https://docs.hhvm.com/hack/XHP/introduction)
2. [ECMAScript for XML | wikipedia](https://en.wikipedia.org/wiki/ECMAScript_for_XML)
3. [Draft: JSX Specification](https://facebook.github.io/jsx/)
4. [WTF is JSX](https://jasonformat.com/wtf-is-jsx/)

