# Web Components 概述

2011 年，Alex Russell 在 Fronteers 大会上首次提出“Web 组件”的概念。要知道，使用基于组件的 UI 库进行开发客户端应用，一直就是标准方法。而在 web UI 开发领域，原生的 HTML 组件功能非常有限。像 React/Vue 是借助于 JavaScript 、在有限的 HTML 标记下实现的组件化。Web Components 则有所不同，它期望能够在 DOM 层面实现组件化，开发者可以扩展 HTML 标记。

Web Components 是W3C正在向HTML和DOM规范添加的一套功能<sup>[1]</sup>，它允许在Web文档和Web应用程序中创建可重用的小部件或组件，开发者可以在更高的层次上组装自己的web应用程序。Web Components 规范实际上包括四大部分，它们可以单独或者组合使用。到目前为止，它们都仍然只是草稿阶段，没有成为标准。

四个子规范分别是：

+ Custom Elements  —  定义新HTML元素的API
+ Shadow DOM       —  封装的DOM和样式，配以组合化。是 Web Components 的核心
+ HTML Templates   —  允许文档包含惰性的DOM块
+ HTML Imports     —  将HTML文档导入其他文档的声明方法


## 浏览器支持进展

自2011年web组件概念提出后，各浏览器厂商就已经纷纷开始着手进行相关功能的开发了。比往年好的事情是，各厂商之间出现了较多的合作。

**Chrome**：谷歌在这件事上依然走在最前面，Chrome 几乎完全实现了所有的 Web Components 规范，也侧面反映出它对 Web Components 标准化进程是多么上心。四个子规范都在 Chrome 中得到了原生的支持，不必借助任何 polyfill 方案。

**Firefox** 实现了 HTML Templates，并且允许开发者模式下开启 Shadow DOM 和 Custom Elements。FireFox 对 HTML 导入有所顾虑，因为他们觉得这个功能与 ES6 的模块化有太多重叠之处，打算观望一阵子。Regardless of this, Wilson Page from Mozilla concluded in a June blog post that “we’re optimistic the end is near. All major vendors are on board, enthusiastic, and investing significant time to help resolve the remaining issues.”

**Safari（WebKit）**目前原生支持 HTML 模板、 Shadow DOM 以及自定义元素API。至于 HTML Imports，WebKit与 FireFox 观点一致，即认为模板导入应该交给 ES6 的模块系统来处理，因此他们目前没有着手支持此特性。

微软的 Edge 13 浏览器开始支持 HTML 模板。

## 框架

Google在2013年发布了一个基于Web组件的程序库“Polymer”<sup>[3]</sup>。

## 参考资料

1. https://fronteers.nl/congres/2011/sessions/web-components-and-model-driven-views-alex-russell
2. Web Components W3C 进展. https://www.w3.org/standards/techs/components#w3c_all
3. https://www.polymer-project.org/
4. https://vaadin.com/blog/web-components-in-production-use-are-we-there-yet-
