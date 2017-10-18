# Welcome on Board

我加入猫眼前端团队的第一天，组长分享了一个内部 wiki，里面开头说道：

> 你好，
>
> 欢迎你加入猫眼前端组，感谢你对我们的认可，也向我们证明了你的实力。
> “既往不恋，纵情向前”，是美团的口号，今天送给你，让我们一起扬帆起航。那么接下来开启你在美团的第一天吧！

这篇 wiki 给出了入职第一天的员工需要准备的开发环境、软件等。正所谓“工欲善其事必先利其器”，其中很多工具都可以提升前端工程师的开发效率，所以在这里，我们从配置你的开发环境开始。

## 电脑&操作系统


## 终端工具&常用软件安装

### Iterm2

[Iterm2 官网](http://iterm2.com/)

### Oh-my-zsh


### XCode

用 Mac 进行开发，需要用到 XCode 里的一个子工具：Command Line Tools for Xcode。

### Homebrew

Homebrew 是 MacOS 上最好的开源软件管理工具，最初 Max Howell 在 2009 年用 Ruby 语言开发，现在则有十多个开发者一起维护其核心代码。用户不需要安装 Ruby，因为它早已在 MacOS 中预装好了。通过在终端运行下面的命令，可以安装 Homebrew：

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Homebrew 会将程序安装到其自己的目录下（在 Mac 中，通常位于 `/usr/local/Cellar` 目录下），然后将其可执行文件链接到 `/usr/local` 目录下。以 `wget` 程序为例，安装时执行：

```
brew install wget
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

而在 `/usr/local/bin` 目录中，会创建一个软连接 `wget` 指向 `/usr/local/Cellar/wget/1.18/bin/wget`：

```
$ cd /usr/local
$ ls -l bin | grep wget
wget -> ../Cellar/wget/1.18/bin/wget
```

### Git


### Node & nvm

