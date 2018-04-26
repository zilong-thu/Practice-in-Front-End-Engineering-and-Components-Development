# 用 Git 进行版本控制

<img src="./git-logo.png" style="width: 110px;" class="fl">

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

除了使用 `Homebrew` 安装，还可以直接在 Git 官网下载适合自己系统的二进制包进行安装。


## 参考资料

1. [Git 官网](https://git-scm.com/)
