# Babel

Facebook 推出的 ECMAScript 编译器 Babel.js 名字源于巴别塔（Tower of Babel）的故事，这个故事则起源于《圣经·旧约·创世记》（Book of Genesis）第11章：

> 大洪水过后，人类使用着同一种语言，当时人们联合起来兴建希望能通往天堂的高塔；为了阻止人类的计划，上帝让人类说不同的语言，使人类相互之间不能沟通，计划因此失败，人类自此各散东西。此故事试图为世上出现不同语言和种族提供解释。

<img src="./images/Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_Google_Art_Project.jpg" >

Babel.js 的愿景如传说中那座塔一样，使得我们可以直接按照最新的 ECMAScript 标准书写代码，然后由它来翻译为浏览器已普遍支持的 ECMAScript 5。

## 体验Babel

可以在 Babel 的官网（https://babeljs.io/repl/）中体验编译前后代码的差异。

例如输入这样的一段代码：

```
const arr = [1, 2, 3, 4];
const brr = arr.map(ele => ele * ele);
```

设置输入语言为 es2016，目标代码的运行环境为浏览器（> 2%, ie 11, safari > 9），那么 Babel 会将其编译为：

```
"use strict";

var arr = [1, 2, 3, 4];
var brr = arr.map(function (ele) {
  return ele * ele;
});
```

如果试图重新给常量 `arr` 赋值，那么 Babel 会在编译阶段进行报错，然后中断编译过程：

<pre style="color: red;">
<code>repl: "arr" is read-only
  1 | const arr = [1, 2, 3, 4];
  2 | const brr = arr.map(ele => ele * ele);
> 3 | arr = 2;
    | ^</code>
</pre>

## 基本使用

## 工作原理

