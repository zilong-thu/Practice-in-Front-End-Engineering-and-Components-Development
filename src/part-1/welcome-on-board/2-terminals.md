## 终端与常用命令行工具

### Iterm2

无论开发或者运维，亦或平时进行一些简单的任务，使用终端（Terminal）都比 GUI 界面程序高效得多。MacOS 虽然自带了一个终端，却并不好用，如果不借助于 Oh-my-zsh 这样的工具，甚至都无法进行文件名称补全提示。此外，MacOS 的终端也不支持窗口分隔为多面板（Split Panes）。

怀着打造一个好用的 MacOS 终端的理念，Iterm2 诞生了，它是用 Objective-C 为主要编程语言开发的终端模拟程序（terminal emulator）。它有许多方便的功能：

**多个窗口**

Iterm2 最常用的功能，是将当前标签分割为多个面板。例如我在写这本书的时候，将标签分为四个面板：

<img src="../images/iterm2-multi-panes.png">

**自动补全（Autocomplete）**

输入单词的开头部分，然后按 `Cmd` 和 `;`，就可以出现自动补全提示选择框，通过上下箭头或者鼠标，可以直接选择自己想要输入的词语。如下图所示。

<img src="../images/iterm2-autocomplete.png" style="max-width: 500px;">

**随时随地召唤Iterm2（Hotkey Window）**

此外，Iterm2 还有选择文本并复制的快捷方式，保留粘贴历史，强大的搜索，以及命令回溯功能。可以在其官网<sup>[1]</sup>获得更详细的使用说明。


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

我们上面已经安装好了 Homebrew，那么安装 Git 就轻而易举了：

```
# 安装 git
$ brew install git

# 查看当前系统里的 git 版本，以确认其是否已经安装好
$ git version
git version 2.11.0 (Apple Git-81)
```

如果系统里已经安装了 git，那么可以检查一下其是否为最新版本，如果不是，可以按照下面的方法来升级 git：

```
$ brew outdated
$ brew upgrade git
```

## 参考资料

1. [Iterm2 官网](http://iterm2.com/)