# HTML Import

HTML Import（HTML 导入） 可以将外部的 HTML 文档引入到当前页面中，并对当前页面提供完全的 DOM 访问。

### 基本用法

目录结构：

```
static                # 静态文件服务根目录
└── html-import
    ├── index.html    # 主文档
    └── part.html     # 外部文档
```

HTML Import 需要通过声明了 `rel="import"` 属性的 `<link>` 元素来导入外部 HTML 文档。而且无法通过文件协议（`file:///`）访问，必须是 HTTP 或者 HTTPS。

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <title>HTML Imports</title>
  <link rel="import" href="./other.html">
</head>
<body>
  <h1 style="padding: 20px;">HTML Imports Demo</h1>
  <div id="part-container"></div>
</body>
</html>

<script type="text/javascript">
(function() {
  var linkEleList = document.querySelectorAll('link[rel="import"]');
  var extDocOther = linkEleList[0].import;

  setTimeout(function() {
    document.getElementById('part-container').appendChild(
      extDocOther.querySelector('div').cloneNode(true)
    );
 }, 2000);
})();
</script>
```

被引用的 HTML 文档：

```html
<!DOCTYPE html>
<html>
<head>
  <title>一个子文档</title>
</head>
<body>
  <div style="padding: 20px;">子文档的内容</div>
</body>
</html>
<script type="text/javascript">
(function() {
  console.log('子文档加载完毕');
})();
</script>
```

在本地的服务中访问 `index.html` 页面，观察控制台的输出，可以看到立即会打印出“子文档加载完毕”，约2秒后，主文档中显示出“子文档的内容”。效果如下图所示。

<img src="./images/import-demo-1.png">

### 跨域引用

## 浏览器支持情况
