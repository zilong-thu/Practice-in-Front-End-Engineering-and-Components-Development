## 钩子及服务器端 Git

Git 钩子（hook）本质上是在特定的 Git 操作发生时执行的脚本（可以是 shell 脚本，也可以是其他的可执行脚本，如 JavaScript、Python、Ruby 脚本等）。例如，如果我们希望能够每次在执行 `git commit` 时，统计某个目录下的 markdown 文件内的文字个数，可以在 `.git/hooks/pre-commit` 文件里添加这样的内容：

```
#!/bin/sh
num=$(find ./src -type f -name "*.md"  | xargs wc -m | grep total)
echo ""
echo "-------------------------"
echo "总字数 =$num"
echo "-------------------------"
echo ""
```

注：在实践之前，可以先检查一下 `.git/hooks/pre-commit` 文件的权限，确保当前用户具有执行权限：

```
$ chmod a+x .git/hooks/pre-commit
```

这样一来，在执行 `git commit` 操作后，就会先触发该脚本的执行：

```
$ git add .
$ git ci --amend

-------------------------
总字数 =  115534 total
-------------------------

[master 60f6b23] add about git hooks
 Date: Wed Aug 1 00:56:02 2018 +0800
 1 file changed, 14 insertions(+)
```
