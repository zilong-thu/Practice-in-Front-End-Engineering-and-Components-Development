# Web 浏览器组成原理

Web 浏览器应该是大家再也熟悉不过的软件了。几乎任何具有 GUI 的操作系统都可以运行 Web 浏览器。浏览器主要由这些功能模块组成：

+ 网络引擎
+ 渲染引擎
+ JavaScript 引擎
+ 数据存储引擎


## 网络引擎

浏览器是实现 HTTP 规范的应用程序。

## 渲染引擎

+ 构建 DOM 树（DOM Tree）
+ 构建 CSS 规则
+ 构建 DOM 渲染树（DOM Render Tree）
+ 布局（Layout）
+ 绘制（Paint）

```
var ele = document.getElementsByTagName('script')[0];
var type = Object.prototype.toString.call(ele);
console.log('type => ', type);
```



## 参考资料

+ 张成文, 现代前端技术解析[M]. 北京: 电子工业出版社, 中国工信出版集团, 2017.