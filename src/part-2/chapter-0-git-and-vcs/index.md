# 用 Git 进行版本控制

## Git 简介

<img src="./git-logo.png" style="width: 110px;" class="fl">

Git 是一款强大的免费开源分布式版本控制系统，其从诞生伊始就确立了提供快速高效的版本控制为设计目标，无论项目大小。Linus Torvalds 在 2005 年 3 月开始开发 Git，最初是用于管理 Linux 的内核代码。2005 年 7 月，Linus 将 Git 项目的维护权转交给了 Junio Hamano，后者向 Git 贡献了最多的源码。Linus 自己则全身心投入到 Linux 内核的开发中。

## 安装 Git

在已经安装好了 Homebrew 的 Mac 系统下，安装 Git 不费吹灰之力：

```
# 安装 git
$ brew install git

# 查看当前系统里的 git 版本，以确认其是否已经安装好
# 2018-04-02 发布了 2.17.0 版本
$ git version
git version 2.17.0
```

如果系统里已经安装了 git，那么可以检查一下其是否为最新版本，如果不是，可以按照下面的方法来升级 git：

```
$ brew outdated
$ brew upgrade git
```

除了使用 `Homebrew` ，还可以直接在 Git 官网下载适合自己系统的二进制包进行安装。

## 基本使用

## Git 关键工作原理



## Git 工作流

在多人协同开发时，Git 工作流程就显得尤为重要。Vincent Driessen 在2010年的一篇文章《A successful Git branching model》<sup>[3]</sup> 介绍了在这样的场景下，如何使用 Git 进行高效开发。

## 良好的提交信息

准确恰当的提交信息对于回溯项目开发历程、寻找特定功能的代码片段都很有帮助。

真正到了要写提交信息的时候，很多人可能会图省事，使用`...`，或者`abc` 这种方式蒙混过去。Git 的提交信息应该简明扼要。可以使用一些可以描述所做改动的关键词作为前缀然后书写详细的信息。

关键词有两类，一类是动词，表示进行的动作；另一类是名词，通常与业务相关。

下面是一些常见的动词类关键词：

+ `add`，表示添加新功能
+ `fix`，缺陷修复
+ `update`，对已有功能进行更改或优化
+ `remove`，删除部分代码、功能
+ `refactor`，重构了一些代码、功能
+ `workflow`，工作流程更改
+ `chore`，琐碎的修改

```
# 新增了支持用户上传文件的功能
$ git commit -m 'add: 上传文件功能'

# 修复了一个线上问题
$ git commit -m 'fix: **页面数字取值问题'
```

此外，对于每个项目，可以用业务相关的名词作为关键词前缀。例如：

```
# docs 表示这是对文档进行的修改
$ git commit -m 'docs: 更新接口文档'
```

## 参考资料

1. [Git 官网](https://git-scm.com/)
2. Jon Leoliger, Matthew McCullough 著, 王迪, 丁彦 等译. Git 版本控制（第二版）[M]. 北京: 人民邮电出版社, 2015.
3. Vincent Driessen. A successful Git branching model. http://nvie.com/posts/a-successful-git-branching-model/
