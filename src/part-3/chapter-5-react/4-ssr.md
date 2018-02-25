# 服务端渲染

使用 `ReactDOMServer`（来自`react-dom/server`）将组件渲染为字符串，那么组件就只会调用位于 `render` 之前的那些组件生命周期方法，即：

+ `constructor`
+ `componentWillMount`

## 基本使用

## 参考资料

1. 示例代码，https://github.com/zilong-thu/react-ssr-intro
