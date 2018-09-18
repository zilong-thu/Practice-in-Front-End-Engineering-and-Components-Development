# JavaScript 解析器


任何一门图灵完备的程序设计语言理论上都能够自己编译自己，生成可执行代码，其中就包括自己的编译器。一门语言可以实现自己的编译器，然后可以通过编译器生成可执行代码，这种特性叫做自举（`Bootstrap`）。自举看上去会存在“先有鸡还是先有蛋”的问题。但实际上，所有的编译器有自己的鼻祖，好比早期的 Pascal 编译器，后来的 C 语言实现的 gcc。我们通过 gcc 的诞生过程，就可以大概了解到“先有鸡还是先有蛋”问题是怎样解决的。

首先

JavaScript 也是一门图灵完备的程序设计语言，这意味着我们可以用 JavaScript 实现自己的编译器。对此特性的使用场景之一，就是用 JavaScript 实现一个 JavaScript 语法分析器。


https://zhuanlan.zhihu.com/p/32189701

https://juejin.im/post/582425402e958a129926fcb4

https://www.zhihu.com/question/25017764
