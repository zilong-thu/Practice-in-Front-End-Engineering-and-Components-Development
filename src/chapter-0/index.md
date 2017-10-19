# Welcome on Board

我加入猫眼前端团队的第一天，组长分享了一篇题目为“Welcome on board”的内部 wiki，里面开头说道：

> 你好，
>
> 欢迎你加入猫眼前端组，感谢你对我们的认可，也向我们证明了你的实力。
> “既往不恋，纵情向前”，是美团的口号，今天送给你，让我们一起扬帆起航。那么接下来开启你在美团的第一天吧！

这篇 wiki 给出了入职第一天的员工需要准备的开发环境、软件等。正所谓“工欲善其事必先利其器”，其中很多工具都可以提升前端工程师的开发效率，所以在这里，我们从配置你的开发环境开始。

## 电脑&操作系统


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


### Node & nvm

