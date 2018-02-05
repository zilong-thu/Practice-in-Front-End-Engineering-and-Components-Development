# ECMAScript 模块系统

> 令人激动的是，ECMAScript 6 中点点滴滴的变化全都致力于解决开发者实际工作中遇到的问题。
> —— Nicholas C. Zakas


## 工作原理

模块文件只加载、执行一次。

## ESM 的实现状态

目前只有 Node.js 的 8.* 以上版本才可以通过开启试验特性来使用 ESM 模块系统，而且该 JS 文件要以 `.mjs` 作为自己的文件扩展名。在使用时，需要像下面这样来执行该文件的代码：

```
node --experimental-modules my-app.mjs
```

