# 不可变数据（Immutable Data）

Facebook 工程师 Lee Byron 花费 3 年时间打造了 Immutable.js，这个库深受 Clojure、Scala、Haskell 等函数式编程语言的影响。它提供了使用纯 JavaScript 实现不可变数据的解决方案。

> 应当视不可变集合为值而非对象。“对象”描述的事物是会随着时间变化的，“值”则明确地代表了该事物在某时刻的确切状态。
>
> ——Immutable.js 官网<sup>[1]</sup>


Immutable.js 内部使用了 trie 数据结构来存储数据，只要两个对象的 hashCode 相等

## 参考资料

1. Immutable.js 官网. https://facebook.github.io/immutable-js/
2. Immutable 详解及 React 中实践. https://segmentfault.com/a/1190000003910357
