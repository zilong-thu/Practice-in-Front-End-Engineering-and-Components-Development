## Git 钩子

### 基本使用

Git 钩子（hook）本质上是在特定的 Git 操作发生时执行的脚本（可以是 shell 脚本，也可以是其他的可执行脚本，如 JavaScript、Python、Ruby 脚本等）。例如，如果我们希望能够每次在执行 `git commit` 后、新的 commit 记录创建前（甚至在输入 commit message 之前），统计某个目录下的 markdown 文件内的文字个数，可以在 `.git/hooks/pre-commit` 文件里添加这样的内容：

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

### 阻断提交

如果希望在某些情况下阻止 git 的默认行为，好比在执行了 ESLint 后发现语法问题，希望开发者先修复问题后再提交，那么 `.git/hooks/pre-commit` 文件需要以非零状态退出程序：

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

### 其他 git 操作事件及各自常见的应用场景

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

**`pre-commit`**

`pre-commit` 是最先执行的一个钩子，在敲入提交信息之前被执行。很多项目使用这个钩子来执行单元测试、代码规范检查等。使用 `git commit --no-verify` 则可以跳过这个钩子。

**`prepare-commit-msg`**

这个钩子会在提交信息编辑器打开之前、默认的提交信息创建之后执行。

**`commit-msg`**

`commit-msg` 钩子接收一个参数，即开发者正在编辑的提交信息临时文件的路径。开发人员可以使用这个钩子来校验项目状态，或者检查提交信息。

```bash
#!/bin/sh
# commit-msg hook
TODO 添加一个 commit-msg 示例
```

**`post-commit`**

### npm 钩子工具
