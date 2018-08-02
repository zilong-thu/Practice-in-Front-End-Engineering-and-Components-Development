# Git 钩子

## 基本使用

Git 钩子（hook）本质上是在特定的 Git 操作发生时执行的脚本（可以是 shell 脚本，也可以是其他的可执行脚本，如 JavaScript、Python、Ruby 脚本等，需要在首行指定该脚本使用的语言）。例如，如果我们希望能够每次在执行 `git commit` 后、新的 commit 记录创建前（甚至在输入 commit message 之前），统计某个目录下的 markdown 文件内的文字个数，可以在 `.git/hooks/pre-commit` 文件里添加这样的内容：

```bash
#!/bin/sh
num=$(find ./src -type f -name "*.md"  | xargs wc -m | grep total)
echo ""
echo "\033[36m-------------------------\033[0m"
echo "\033[36m 总字数 =$num\033[0m"
echo "\033[36m-------------------------\033[0m"
echo ""
```

注：在实践之前，可以先检查一下 `.git/hooks/pre-commit` 文件的权限，确保当前用户具有执行权限：

```bash
$ chmod a+x .git/hooks/pre-commit
```

这样一来，在执行 `git commit` 操作后，就会先触发该脚本的执行：

```bash
$ git add .
$ git ci --amend

# 填写完 commit message 之后，打印如下内容：

-------------------------
总字数 =  115534 total
-------------------------

[master 60f6b23] add about git hooks
 Date: Wed Aug 1 00:56:02 2018 +0800
 1 file changed, 14 insertions(+)
```

## 阻断事件的默认行为

大部分钩子都约定了零值作为成功执行的标识。如果希望在某个钩子退出时停止后续的 Git 行为，那么该钩子应该以非零值退出。例如，在执行了 ESLint 后发现语法问题，希望开发者先修复问题后再提交，那么 `.git/hooks/pre-commit` 文件需要以非零状态退出程序：

```bash
#!/bin/sh
echo "总是阻止提交"
exit 1
```

此时如果对代码做出改动，然后运行：

```bash
$ git add --all
$ git commit
```

此时，即使填写了提交信息，刚才的变动也依然在暂存区，并没有进入代码仓库。

## 其他 git 操作事件及各自常见的应用场景

在每个 git 仓库的 `.git/hooks` 目录下，都可以看到若干个 `*.sample` 文件，它们就是 git 给出的各个钩子的示例。

```bash
$ cd .git/hooks
$ tree
.
├── applypatch-msg.sample
├── commit-msg.sample
├── post-update.sample
├── pre-applypatch.sample
├── pre-commit.sample
├── pre-push.sample
├── pre-rebase.sample
├── prepare-commit-msg.sample
└── update.sample
```

注：上面使用了 `tree` 这个程序，用来展示某个目录下的文件/目录结构。它并非系统自带，Mac 下可以通过 `brew install tree` 来安装。

Git 钩子可以分为两大类：客户端钩子（client side hooks），服务器端钩子（Server side hooks）。Git 钩子的数量可能在不断增加，在这里，我们只重点介绍几个常用的。其他的钩子可以参考 Git 的专业书籍。

### 客户端钩子

**`pre-commit`**

`pre-commit` 是最先执行的一个钩子，在敲入提交信息之前被执行。很多项目使用这个钩子来执行单元测试、代码规范检查等。使用 `git commit --no-verify` 则可以跳过这个钩子。`pre-commit` 钩子经常被用于执行单元测试或者运行代码检查，下面分别看一个例子。

```bash
#!/bin/bash
# TODO
```

```bash
#!/bin/bash
# TODO
```

**`pre-rebase`**

`pre-rebase` 钩子会在我们通过 `git rebase [-i] [<branch-name> | <commit-id>]` 进行变基或交互式变基操作时执行。它接收一个或者两个参数：

+ $1，上游仓库
+ $2，要作为 rebase 的基准的分支，可能为空

变基操作不宜在公共分支上面进行，因此这个钩子很有用，可以防止团队中的任何成员不小心在某些公共分支上面变基。例如，常见的公共主分支 `master`，我们可以通过下面这一个钩子，避免开发人员在 `master` 分支上面执行 `git rebase`：

```bash
#!/bin/bash
# TODO
```

### 服务器端钩子

## npm 钩子工具
