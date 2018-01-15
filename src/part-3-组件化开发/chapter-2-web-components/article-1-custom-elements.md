# Web Components 入门示例

## 纯展示组件：一个时钟挂件

我们首先来看一个极简单的组件，它由一个 HTML 文件（主文档）和一个组件脚本组成：

```
├── clock
│   ├── index.html
│   └── my-clock.js
```

```html
<!DOCTYPE html>
<html>
<head>
  <title>纯展示组件：一个时钟挂件</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
  <style type="text/css">
    my-clock {
      display: block;
      height: 100px;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      margin: 10px;
    }
  </style>
</head>
<body>
  <my-clock></my-clock>
  <script type="text/javascript" src="./my-clock.js"></script>
</body>
</html>
```

上面的 HTML 文件比较简单，我们使用了自定义的 `<my-clock></my-clock>` 标签，并且引用了定义了该标签对应的组件的 JavaScript 文件 `my-clock.js`。后者的内容如下：

```javascript my-clock.js
class MyClock extends HTMLElement {
  constructor() {
    super();

    var wcParent = this.parentNode;

    var shadow = this.attachShadow({mode: 'open'});

    var text = document.createElement('span');
    text.textContent = new Date();

    shadow.appendChild(text);

    setInterval(function() {
      var time = new Date();
      text.textContent = time.toString();
    }, 1000);
  }
}

customElements.define('my-clock', MyClock, {extends: 'p'});
```


## 问题

+ 样式可否被父文档修改？CSS
+ 父文档如何与组件进行交互？函数式


