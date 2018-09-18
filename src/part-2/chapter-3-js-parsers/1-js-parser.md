# JavaScript 解析器

任何一门图灵完备的程序设计语言（Turing Complete Language）理论上都能够自己编译自己，生成可执行代码，其中就包括自己的编译器。一门语言可以实现自己的编译器，然后可以通过编译器生成可执行代码，这种特性叫做**自举**（**`Bootstrap`**）。自举看上去会存在“先有鸡还是先有蛋”的问题。但实际上，所有的编译器有自己的鼻祖，好比早期的 Pascal 编译器，后来的 C 语言实现的 gcc。我们通过 gcc 的诞生过程，就可以大概了解到“先有鸡还是先有蛋”问题是怎样解决的。

+ 首先，已经有了基于汇编语言实现的非常可靠的编译器 CompilerA，可以把汇编语言转换为机器码
+ 发明 C 语言，然后用汇编语言实现一个 C 语言编译器 gcc@1.0，该编译器负责将 C 语言转换为汇编语言，然后调用汇编语言编译器 CompilerA 将其转换为机器码
+ gcc@1.0 稳定后，使用 C 语言实现 gcc@2.0 版本，用 gcc@1.0 去编译 C 源码来生成可执行文件 gcc@2.0，然后不断地测试 gcc@2.0 版本，即使用 gcc@2.0 去编译别的 C 语言写的测试用例
+ gcc@2.0 稳定后，gcc@1.0 就可以告别历史舞台，C 语言就拥有了用 C 语言实现的编译器 gcc 了。

JavaScript 也是一门图灵完备的程序设计语言，这意味着我们可以用 JavaScript 实现自己的编译器。不过，由于 JavaScript 通常是分布式获取，编译为二进制码并不能跨平台使用，所以，“自举”这方面的很多工作只是用 JavaScript 实现一个 JavaScript 语法分析器，可以生成抽象语法树（Abstract Syntax Tree，AST），并且基于抽象语法树进行操作，最后依然输出 JavaScript 代码。

## JavaScript AST 规范

使用不同工具构建的抽象语法树可能会有不同的结构，如果大家都遵从同样的规范，那么相关联的生态链工具的开发会更为轻松、明晰。很早之前，FireFox 浏览器所使用的 JavaScript 引擎 SpiderMonkey 曾经提供了一个 JavaScript API，使得开发者可以直接调用 SpiderMonkey 的 JavaScript 分析器。这个 API 所描述的 JavaScript 抽象语法树格式渐渐流行起来，如今成为 JavaScript AST 的通用描述。ESTree Spec 正是在此基础上建立起来的，它现在是社区对 JavaScript 抽象语法树构建时采用最广泛的规则，可以认为是社区推动的事实标准。众多基础设施开发者一起维护着这个规范，包括 Dave Herman（Mozilla 研究中心的首席研究员和策略总监）、 Nicholas C. Zakas（ESLint 的作者）、Ingvar Stepanyan（Acorn 的作者）、Mike Sherov 与 Ariya Hidayat（Esprima 的作者）以及 Babel.js 团队等。

## 实现

在实现上，有这么几个使用较广泛的库：

+ uglifyjs
+ Esprima，是用 JavaScript 实现的 JavaScript 词法分析及语法分析器
+ espree，基于 Esprima，被 ESLint 工具使用
+ Acorn
+ Babylon，在 acorn.js 基础上发展起来，Babel.js 最开始使用的分析器

在 https://astexplorer.net/ 网站可以非常直观地看到 JavaScript 源代码与其对应的抽象语法树每个节点之间的对应关系：

<img src="./images/ast-01.png" class="round">

## 参考

https://zhuanlan.zhihu.com/p/32189701

https://juejin.im/post/582425402e958a129926fcb4

https://www.zhihu.com/question/25017764
