# Vue 构建示例

我们来看一下，使用 webpack、vue 等工具进行构建的话，我们的项目目录结构该如何设计，webpack 该如何配置。

对于大型的生产环境项目，Vue 官方给出了 `vue-cli`<sup>[1]</sup> 这样的脚手架工具来初始化项目结构，开发者既可以直接使用，也可以在此基础上再更改。我们在这里暂且不使用 `vue-cli`，而是基于 `webpack`、`vue-loader` 等设计一个简单的构建流程。

### 目录结构设计

项目的目录结构如下设计。我们以 `src/pages` 目录下的每个 `index.vue` 文件作为页面的入口，也是 webpack 打包的入口（entry）。构建后将 `src/pages` 的文件放到 `build` 目录下（即提升了一层目录）。

```
.
├── build                     # 打包后的目录
│   ├── explore
│   │   ├── index.html        # 页面 HTML 文件
│   │   └── index.{md5}.js    # 页面 JS 文件
│   └── home
│       ├── index.html    
│       └── index.{md5}.js
├── package.json
├── src
│   ├── components            # 放置一些公共组件，不会作为 webpack 的打包入口
│   ├── pages                 # 页面目录
│   │   ├── explore
│   │   │   └── index.vue     # 页面的单文件组件
│   │   └── home
│   │       └── index.vue
│   └── utils                 # 放置一些常用的工具类 JS 文件
└── webpack.config.js         # webpack 配置文件
```

### Webpack 配置



## 参考资料

1. [vue-cli | github](https://github.com/vuejs/vue-cli)
