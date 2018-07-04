# 移动端 Web 页面调试


### 移动 web 页面输出工具 Eruda

Eruda.js 是针对移动 web 页面调试的优秀工具。它可以直接在真机上模拟出类似 PC 上的 Chrome、Safari、FireFox 等现代浏览器的开发者调试工具，包括 Console、Elements、Network、Resources、Sources 等常见模块。

<img src="./images/eruda.png" style="width: 80%;">

有两种接入 Eruda 的方式，一种是最简单的，直接在 HTML 模板中用 `<script>` 元素引用其 CDN 库，然后调用 `eruda.init()` 方法来初始化：

```html
<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>
```

另外一种方式适用于使用了诸如 `webpack` 一类的构建工具的项目，可以给项目添加 eruda 的 npm 包：

```bash
$ npm install eruda --save
```

然后如下引用：

```html
<script src="node_modules/eruda/eruda.min.js"></script>
<script>eruda.init();</script>
```

### 腾讯的 vConsole

腾讯也有一款类似的调试工具，vConsole<sup>[3]</sup>。

### 参考资料

1. [Eruda | github](https://github.com/liriliri/eruda)
2. [Debugging Tips and Tricks](https://css-tricks.com/debugging-tips-tricks)
3. [vConsole | github](https://github.com/Tencent/vConsole)
