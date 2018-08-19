## Git 工作流

### 多人协同开发

在多人协同开发时，Git 工作流程就显得尤为重要。当开启一个新特性的开发时，通常从主干分支（例如 `master`） `checkout` 出一个新分支，作为本次特性开发功能的公共主分支，例如命名为 `feature/user-center`；而参与本次特性开发的人员，可以从 `feature/user-center` 再 `checkout` 属于自己的私有分支，例如 `wzl/feature/user-center`。Git 分支的创建可以说是零成本的，这也是其最强大的特性之一。

Vincent Driessen 在2010年的一篇文章《A successful Git branching model》<sup>[3]</sup> 介绍了在这样的场景下，如何使用 Git 进行高效开发。其核心观点之一是围绕着“中心化与去中心化并存”而采取的分支策略：

<img src="./images/centr-decentr.png" style="width: 60%;">

### 良好的提交信息

准确恰当的提交信息对于回溯项目开发历程、寻找特定功能的代码片段都很有帮助。

真正到了要写提交信息的时候，很多人可能会图省事，使用`...`，或者`abc` 这种方式蒙混过去。Git 的提交信息应该简明扼要。可以使用一些可以描述所做改动的关键词作为前缀然后书写详细的信息。

关键词有两类，一类是动词，表示进行的动作；另一类是名词，通常与业务相关。下面是一些常见的关键词：

+ `add`，表示添加新功能
+ `fix`，缺陷修复
+ `update`，对已有功能进行更改或优化
+ `remove`，删除部分代码、功能
+ `refactor`，重构了一些代码、功能
+ `workflow`，工作流程更改
+ `chore`，琐碎的修改

```bash
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