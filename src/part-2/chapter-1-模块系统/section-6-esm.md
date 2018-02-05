# ECMAScript 模块系统

> 令人激动的是，ECMAScript 6 中点点滴滴的变化全都致力于解决开发者实际工作中遇到的问题。
> —— Nicholas C. Zakas


## ESM 的实现状态

目前只有 Node.js 的 8.* 以上版本才可以通过开启试验特性来使用 ESM。用 ESM 的 JS 文件需要以 `*.mjs` 为自己的文件扩展名，然后像下面这样来执行该文件的代码：

```
node --experimental-modules my-app.mjs
```

