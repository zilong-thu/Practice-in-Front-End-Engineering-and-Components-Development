# 未来展望

Lisp 社区的领袖之一 Richard Gabriel 在一篇论文<sup>[1]</sup>里指出：**在软件设计发展过程的奋斗中，那些促成快速传播（传染）的特征，如实现的简单性和可移植性等，比起设计的正确性和完备性更为有效。**JavaScript 语言的崛起也体现了类似的规律。它一开始的设计并不完美，有太多缺陷，然而却因为及其简单的设计而霸占浏览器世界。

在占据了浏览器市场之后，JavaScript 才迎来众多开发者的关注，并且延伸到服务器端、区块链、深度学习等领域中。在过去的几十年里，这门语言广泛参考社区的优秀实践，不断完善自己的标准。

与 JavaScript 同时期诞生的 Java 编程语言的设计目标是“一处编写，到处运行”（write once, run anywhere），并且支持网页中嵌入交互程序（applets）。但由于 Java 语言的所有者 Sun 公司的一系列技术和战略失误，Java 没有实现这两个最初的设计目标（Eric S. Raymond，《Unix编程艺术》）。JavaScript 却借着浏览器端的垄断地位不断向其他领域延伸，以至于 Stackoverflow 的创始人之一 Jeff Atwood 做出了这样的预言：“任何可以使用 JavaScript 实现的程序终将会使用 JavaScript 实现”（Any application that can be written in JavaScript, will eventually be written in JavaScript）。

### 语言特性

**类型的重要程度增加**

在复杂的应用中，类型系统有助于提升系统的健壮性，帮助程序员提前发现问题。TypeScript 这样的社区方言，将来可能会有些特性被 ECMAScript 标准所采纳。

**新的基本类型**

以数值为例，ECMAScript 语言中 `Number` 本质上是是完全按照 IEEE Standard for Floating-Point Arithmetic (IEEE 754)[1,2] 实现的。`Number` 类型实际上就是双精度浮点数类型（double precision floating-point format），类似 C 语言里的 `double`。这种数值类型表达整数的能力比较有限。未来可能会增加像 `BigInt` 这样的基本类型：

```javascript
var max = Number.MAX_SAFE_INTEGER;
console.log(max);
// 9007199254740991

var bigA = BigInt(max) + 100n;
console.log(bigA);
// 9007199254741091n
```

这个基本类型目前处在 Stage3 阶段。此阶段的含义是 Candidate（候选），“Indicate that further refinement will require feedback from implementations and users”，即需要实现者（通常是浏览器厂商）与用户进一步优化与反馈。目前 Chrome67 已经开始支持 BigInt。还需要有至少一个其他浏览器厂商或JS运行时给出具体的实现。

### 应用领域

在应用程序方面，我们可以期待 JavaScript 承担更多的业务场景。

**后端服务**

借助于 Node.js，相当多的 JavaScript 开发者已经在生产环境下维护着自己的前端服务，这些服务承担着路由控制、页面渲染、请求代理与数据聚合等功能，少数公司可能还使用了 JavaScript 来连接数据库（例如MySQL/MongoDB）并提供微服务。这种从前到后都使用 JavaScript 进行开发的全栈模式，减少了语言间的沟通障碍，有一定的优势，也有一定的潜在风险，例如对开发人员的要求变高可能面临暂时的人才储备不足，JavaScript 的弱类型带来的不稳定性，等等。未来应该会有更多的公司和开发者去尝试全栈 JavaScript 开发模式。

**游戏开发**

**区块链技术**

## 参考资料

1. 《Lisp: 好消息，坏消息以及如何获得大胜》（Lisp: Good News, Bad News, and How to Win Big）
