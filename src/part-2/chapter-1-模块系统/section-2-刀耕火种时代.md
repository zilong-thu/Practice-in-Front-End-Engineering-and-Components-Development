# 刀耕火种时代

HTML `<script>` 元素用于嵌入或引用可执行脚本。互联网早期，页面比较简单，使用内嵌的方式或者引用单个 JavaScript 文件就可以满足业务需求。如果功能变得复杂，单个 JavaScript 文件行数变得很多，那么可以将 JavaScript 分为多个文件，并且需要小心翼翼地处理各个 `<script>` 标签的书写顺序。

这个时期针对 JavaScript 源码的组织，谈不上模块化。即便采用了文件拼接（concat）这样的处理技术，其先后顺序也需要人工维护。典型的例子是 Backbone.js 在官网上提供的代码示例<sup>[1]</sup>：

```
<head>
  <title>Backbone.js Todos</title>
  <link rel="stylesheet" href="todos.css"/>
</head>
<body>
  <div>HTML代码...</div>
  <script src="../../test/vendor/json2.js"></script>
  <script src="../../test/vendor/jquery.js"></script>
  <script src="../../test/vendor/underscore.js"></script>
  <script src="../../backbone.js"></script>
  <script src="../backbone.localStorage.js"></script>
  <script src="todos.js"></script>
  <!-- 其他代码 -->
</body>
```

## 参考资料

1. https://github.com/jashkenas/backbone/blob/master/examples/todos/index.html
