# 第二篇

> 恩格斯说：“社会一旦有技术上的需要，则这种需要就会比十所大学更能把科学推向前进”。

这句话用来描述 Web 前端技术近十年的发展，恰到好处。

## 前端工程化的定义

20 多年前，Web 刚刚兴起的时候，并没有 Web 前端开发工程师这样的职位，当时的网页开发工作应该被称为网页设计，切图、布局、样式是其主要工作。随着互联网的不断发展，前端交互、性能、数据处理、安全问题一个个成为网页设计人员的关注点，这群人也分为了两个领域：交互设计师，前端程序员。软件开发中的大部分工程问题，前端程序员都需要涉及。

Node.js 诞生后，前端开发人员凭借自身的 JavaScript 语言优势，也可以逐渐接管部分原本由后端工程师承担的工作，例如页面服务器端渲染、网站路由管理。以常见的 MVC（Model-View-Controller）架构为例，也就是 View 和 Controller 两个环节。

苹果公司的 iPhone 手机（2007年）引领的智能设备革命，使得前端代码的运行环境变得日益复杂。时至今日，Web 页面的 “一处编写，随处运行” 天然优势促使 Android、iOS 等系统中的大量应用采取了 Hybrid 开发模式。而且不仅仅是浏览器，微信还推出了小程序这样的运行环境，使得 JavaScript 可以编写出接近原生应用的“页面”。

到了现在，我们可以认为 Web 前端工程化主要包含以下范畴：

+ 版本控制
+ 模块化开发
+ 前端资源构建&持续集成
+ 服务器运维
+ 性能优化


## 模块系统与模块化开发

Web 前端一开始是没有模块化开发概念的：简单地写一些 JavaScript 脚本，放到一个文件里，然后在 HTML 文件中通过 `<script>` 标签引入它就可以了。不过后来每个页面所需的 JavaScript 代码量不断增长，即便可以容忍通过同一个文件加载 JavaScript，源代码在同一个文件中进行开发也是非常难受的。我们希望一个页面有一个入口 JavaScript 文件，不妨叫做 `index.js`，然后它在里面去声明、加载自己依赖的其他 JavaScript 脚本——这便是模块化开发的初衷。模块化开发的其他好处还有代码易于维护、方便多人开发、减小系统耦合度、提升代码复用能力等。

2015年6月正式发布的 ECMAScript 6.0（以下简称 ES6）里对 JavaScript 模块标准进行了定义，称为 ECMAScript Module（简称 ESM）。在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。CommonJS 模块系统主要用于服务器端，例如 Node.js 一开始就是采用了 CommonJS 模块系统。Node.js 在 8.8 版本之后，开始原生支持 ESM。

除了 JavaScript，我们的 CSS 资源也有各种模块化开发的解决方案。例如 less/sass/stylus/postcss 等。这些 CSS 预处理语言的目标大致都是要提升代码复用、降低维护成本。

模块化开发也涉及代码的目录结构组织方式。Web 前端开发最初按照资源类型分别创建目录，例如通常一个网站下会有 `js`、`css`、`img`、`fonts` 等标志性的目录。在 `js` 目录下存放各个页面要用到的脚本文件，例如：

```
.
└── js
    ├── page-1.js
    ├── page-2.js
    └── ...
├── css
└── img
```

后来则倾向于将相关资源就近放置，以 page 为单位，每个页面有自己的目录，下面存放自己所需要的所有资源，与单个页面无关的资源（即公共资源）则另外设置目录进行存放。

```
pages
└── page-1
    ├── index.js
    ├── style.css
    └── index.html
├── page-2
└── page-3
```

再到现在，组件化的开发设计理念之下，页面也被视为组件，那么一切资源都以组件为基本单位进行目录组织，实际上就更为自然、合理了。可以说，模块化是组件化开发的雏形，组件化开发是我们的最终目标。

## 前端资源构建与持续集成

我们的代码按照一定的模块化、组件化方式进行组织之后，需要分析处理各个组件的依赖，进行代码分析与整合、根据入口文件逐个进行打包，最后进行压缩或者合并。例如为了使得生产环境下的代码体积最小，我们会使用诸如 `uglify.js` 这样的工具对打包后的脚本文件进行一次混淆压缩。CSS 文件也是类似。

> 在 Bootstrap.css 的官方 Github 代码仓库里（https://github.com/twbs/bootstrap），可以看到其对 CSS 源码的组织方式。

TODO => 持续集成

## 服务端运维

Node.js 服务端运维关注这些问题：

+ 如何充分利用服务器的多核 CPU 。由于每个 Node.js 进程实例使用一个核心且每个实例中的 JavaScript 代码只能是单线程的，这就限制了单个 Node.js 进程的计算能力。现实中的服务器往往具有多个核心，Node.js 应用应该尽可能发挥多核 CPU 的计算能力、提高系统的并发性能。
+ 如何保证服务的稳定性，发布部署时也应尽量避免服务不可用，即做到平滑发布
+ 如何管理服务器端 JavaScript 应用产生的大量日志数据
+ 应该有可靠的性能、服务监控系统
