# ECMAScript 模块系统

> 令人激动的是，ECMAScript 6 中点点滴滴的变化全都致力于解决开发者实际工作中遇到的问题。
> —— Nicholas C. Zakas


## 工作原理

模块文件只加载、执行一次。

## ESM 的实现状态

### Node.js

2017年9月份，Node.js 发布了 8.5.0 版本。从这个版本开始<sup>[1]</sup>，开发者可以通过开启试验特性 `--experimental-modules` 来使用原生的 ESM 模块系统，而且该 JS 文件必须以 `.mjs` 作为自己的文件扩展名。官方的计划是，预计到 Node.js 10 LTS 版本会默认支持 ESM，开发者就不必再借助于命令行参数来开启它了。

文件目录：

```
.
├── lib.mjs
└── my-app.mjs
```

`lib.mjs` 的内容：

```
console.log('lib module is loaded into memory.');

export var name = '阿珂';

export function setName(n) {
  name = n;
}

export function add(x, y) {
  return x + y;
}
```

`my-app.mjs` 的内容：

```
import {name} from './lib.mjs';
import {setName, add} from './lib.mjs';

console.log(name);
setName('李白');
console.log(name);

console.log('sum: ' + add(2, 3));
```

执行：

```
$ node --experimental-modules my-app.mjs
# 输出的结果：
lib module is loaded into memory.
阿珂
李白
sum: 5
```

### 浏览器

浏览器中的 ESM 模块不必以 `.mjs` 作为扩展名。但必须有正确的文件类型描述（`text/javascript` 或 `application/javascript`）。


## 未来可以期待的特性

### 动态加载

`import()`


## 参考资料

1. [Using ES modules natively in Node.js](http://2ality.com/2017/09/native-esm-node.html)
