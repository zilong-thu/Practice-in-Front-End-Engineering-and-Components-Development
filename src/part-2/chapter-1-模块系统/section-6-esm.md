# ECMAScript 模块系统

> 令人激动的是，ECMAScript 6 中点点滴滴的变化全都致力于解决开发者实际工作中遇到的问题。
> —— Nicholas C. Zakas

前面所提到的所有模块化解决方案，都是利用 JavaScript 语言本身的特性，实现的封装。而鉴于模块系统的重要性、必要性，TC39 委员会也对其标准化极为上心。2015 年推出的 ECMAScript 6 标准正式定义了 JavaScript 的模块系统。

## 工作原理

模块文件只加载、执行一次。

## ESM 的实现状态

### Node.js

2017年9月份，Node.js 发布了 8.5.0 版本。从这个版本开始<sup>[1]</sup>，开发者可以通过开启试验特性 `--experimental-modules` 来使用原生的 ESM 模块系统，而且该 JS 文件必须以 `.mjs` 作为自己的文件扩展名。官方的计划是，预计到 Node.js 10 LTS 版本会默认支持 ESM，开发者就不必再借助于命令行参数来开启它了。

CommonJS 模块的 `__dirname`、`__filename` 也不会作为全局变量提供给模块。

Node.js 对 CommonJS 与 ESM 进行了较严格的区分，CommonJS 的 `require()` 不可用于加载 ESM 文件。

```
# 不支持的写法
require('./foo.mjs');
```

** Node.js ESM 示例**

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

从上面的输出结果，我们可以发现有两个特点：

+ 虽然 `lib.mjs` 模块被引用了两次，但是它内部只被解析、执行了一次（只打印了一次 `lib module is loaded into memory.`）。
+ 在 `my-app.mjs` 里调用 `setName` 方法，修改的实际上是 `lib.mjs` 里的 `name` 变量。`my-app.mjs` 里的 `setName` 只是对 `lib.mjs` 里的 `setName` 的引用。

### 浏览器

浏览器中的 ESM 模块不必以 `.mjs` 作为扩展名。但必须有正确的文件类型描述（`text/javascript` 或 `application/javascript`）。


## 未来可以期待的特性

### 动态加载

`import()`


## 参考资料

1. [Using ES modules natively in Node.js](http://2ality.com/2017/09/native-esm-node.html)
