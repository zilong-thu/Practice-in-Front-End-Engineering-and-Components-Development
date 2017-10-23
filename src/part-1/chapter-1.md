# Welcome on Board

> 你好，
>
> 欢迎你加入猫眼前端组，感谢你对我们的认可，也向我们证明了你的实力。
> “既往不恋，纵情向前”，是美团的口号，今天送给你，让我们一起扬帆起航。那么接下来开启你在美团的第一天吧！

我加入猫眼前端团队的第一天，组长分享了一篇题目为“Welcome on board”的内部 wiki，上面正是开头的一段话。

这篇 wiki 给出了入职第一天的员工需要进行的开发环境配置、软件安装等准备工作清单。正所谓“工欲善其事必先利其器”，其中很多工具都可以提升前端工程师的开发效率，所以在这里，我们也从配置你的开发环境开始。

## 电脑&操作系统

Web 前端工程师应当具备在 Unix/Linux 操作系统下进行软件开发的技能。这里没有贬低 Windows 操作系统的倾向。不过鉴于绝大部分 Web 服务是由运行了 Linux/Unix 系统的服务器提供的，开发者最好尽可能保持开发环境与生产环境一致。

苹果电脑因为拥有极佳的硬件配置，并且其操作系统 Darwin 是 Unix 的一个发行版，Linux 的特点它基本都具备，所以成为了国内不少互联网公司程序员的标配。本书所有的代码、命令都在安装了 MacOS@10.12.6 的 Macbook Pro 机器上面执行通过。

如果你没有 Mac，那么推荐安装任何一款你喜欢的 Linux 操作系统。Ubuntu 有着友好的界面，通常是入门者的选择；而 CentOS 由于在服务器端的应用更为广泛，也是非常适合开发者安装的系统。

## 终端工具&常用软件安装

### Iterm2

[Iterm2 官网](http://iterm2.com/)

### XCode

用 Mac 进行开发，需要用到 XCode 里的一个子工具：Command Line Tools for Xcode。


### Oh-my-zsh

Oh-my-zsh 是一个 Zsh 配置管理框架。安装 Oh-my-zsh 前要确保 Zsh 已经装好（Mac 预装了 Zsh，所以很方便）。运行下面的脚本可以安装 Oh-my-zsh：

```
$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

1990年，Paul Falstad 还在普林斯顿大学读书时，写出了 Zsh 的第一版。程序的名字“zsh”来源于当时的一位助理教授（如今已经是耶鲁大学的教授） Zhong Shao 的账号 ID，Paul Falstad 用 “zsh” 命名这个程序向他致敬。

### Homebrew

Homebrew 也许是 MacOS 上最好的开源软件管理工具，最初由 Max Howell 在 2009 年用 Ruby 语言开发，现在则有十多个开发者一起维护其核心代码。用户不需要安装 Ruby，因为它早已在 MacOS 中预装好了。通过在终端运行下面的命令，可以安装 Homebrew：

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Homebrew 会将程序安装到其自己的目录下（在 Mac 中，通常位于 `/usr/local/Cellar` 目录下），然后将其可执行文件链接到 `/usr/local` 目录下。以 `wget` 程序为例，安装时执行：

```
$ brew install wget
```

wget 会被解压到 `/usr/local/Cellar/wget` 中：

```
Cellar
└── wget
    └── 1.18
        ├── README
        ├── bin
        │   └── wget
        ├── ...
```

而在 `/usr/local/bin` 目录中，会创建一个软链接 `wget` 指向 `/usr/local/Cellar/wget/1.18/bin/wget`，可以像下面那样来查看链接情况：

```
$ cd /usr/local
$ ls -l bin | grep wget
wget -> ../Cellar/wget/1.18/bin/wget
```

### Git

Git 是一款强大的分布式版本管理系统，Linus Torvalds 在 2005 年3月开始开发，最初是用于管理 Linux 的内核代码。2005年6月，Linus 将 Git 项目的维护权转交给了 Junio Hamano，后者向 Git 贡献了最多的源码。


### Node.js & NVM

Node.js 由 Ryan Dahl 在 2009 年开发出来。在过去的8年里，Node.js 及其生态圈的发展可以用突飞猛进、日新月日来形容。前端开发者通常用 Node.js 来进行文件构建（例如 gulp、webpack 一类的构建工具）、提供页面服务（例如 express.js、koa.js 这样的服务器端框架）。

我们可以直接下载安装 Node.js，这样的话操作系统里共用一个 Node.js 程序。但是 Node.js 社区异常活跃，其开发迭代的速度非常快，更好的方式是使用 NVM（Node.js Version Manager） 来管理系统里的 Node.js，可以同时安装任意多个版本，然后在使用时指定需要的 Node.js 版本即可。NVM 实际上是一系列 shell 脚本的集合。安装 NVM （可以在其官网上找到具体的命令，地址：https://github.com/creationix/nvm）：

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
```

安装好 NVM 后，就可以方便地使用 nvm 命令安装或切换当前会话使用的 Node.js 版本：

```
# 安装某个版本的 Node.js
$ nvm install 8.7.0

# 查看当前系统已安装的所有 Node.js 版本
$ nvm ls

# 使用某个已安装了的 Node.js 版本
$ nvm use 6.9.5
```

在项目的根目录下，可以通过 `.nvmrc` 文件来指定当前项目希望使用的 Node.js 版本。例如：

```
# 在项目的根目录下运行
$ echo "8.4.0" > .nvmrc
$ nvm use
Found '/path/to/project/.nvmrc' with version <8.4.0>
Now using node v8.4.0 (npm v5.3.0)
```

nvm 的更多用法可以参考其官网，或者运行 `man nvm` 来获得帮助。
