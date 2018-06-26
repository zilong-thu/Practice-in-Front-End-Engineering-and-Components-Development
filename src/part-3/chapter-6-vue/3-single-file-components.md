# 单文件组件

借助于 webpack 与 vue-loader 构建工具，Vue 实现了接近 Web-Components 规范下的组件化开发模式，即所谓的“单文件组件”（Single-File Components）。

> 在现代 UI 开发中，我们已经发现相比于把代码库分离成三个大的层次并将其相互交织起来，把它们划分为松散耦合的组件再将其组合起来更合理一些。在一个组件里，其模板、逻辑和样式是内部耦合的，并且把他们搭配在一起实际上使得组件更加内聚且更可维护。
> —— Vue 官网对单文件组件理念的阐述

一个单文件 Vue 组件的源码是这样子的：

```html
<template>
  <div>
  	<h2>{{ title }}</h2>
  	<p>这里放的是组件的 HTML 结构</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Hello world!'
    };
  }
}
</script>

<style>
p {
	color: #666;
	font-size: 14px;
}
</style>
```

通常这样的文件以 `.vue` 作为后缀，例如 `my-component.vue`，这样方便在 webpack 中配置 `vue-loader` 的匹配规则。

## 参考资料

1. [vue-loader | github](https://github.com/vuejs/vue-loader)
