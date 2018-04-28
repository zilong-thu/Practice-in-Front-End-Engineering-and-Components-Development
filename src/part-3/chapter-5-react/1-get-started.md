# 基本使用

## 起步

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

使用 React 官方推荐的一些脚手架可能是更好的方案，既便于使用自己的编辑器，也可以方便地扩展功能。使用 `create-react-app` 的方式如下：

```
npx create-react-app my-react-app
cd my-react-app
npm start
```

上面的命令执行后，可以会默认监听在 3000 端口，浏览器访问 `http://localhost:3000` 即可看到示例页面。

## 一个简单示例：列表页面

## 参考资料

1. [Create React App | Github](https://github.com/facebook/create-react-app)
