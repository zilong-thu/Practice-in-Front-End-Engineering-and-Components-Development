# 基本使用

如果之前没有接触过 React，那么有多种方式来体验 React 的组件开发方式，例如 React 官方给出的在线编程网站 CodePen 上的示例页面，或者直接使用其 CDN 上的脚本在本地体验，亦或是通过众多的脚手架（starter kit）来启动较为完整的开发架构。

下面是一个最简单的 React 体验版代码示例，这种方式不能用于生产环境，因为它在浏览器里执行 JSX、ES6 的编译，而且所引用的脚本体积很大。

```html
<div id="root"></div>

<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
<script type="text/babel">
  ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById('root'));
</script>
```

