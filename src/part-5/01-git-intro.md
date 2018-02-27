# 附录A：Git 原理与使用基础

=> TODO：git 的原理、使用、工作流. 3000 字

## Git 工作原理

## 基本使用

## Git 工作流

在多人协同开发时，Git 工作流程就显得尤为重要。Vincent Driessen 在2010年的一篇文章《A successful Git branching model》<sup>[1]</sup> 介绍了在这样的场景下，如何使用 Git 进行高效开发。

## Clean Commit

准确恰当的提交信息对于回溯项目开发历程、寻找特定功能的代码片段都很有帮助。

真正到了要写提交信息的时候，很多人可能会图省事，使用`...`，或者`abc` 这种方式蒙混过去。Git 的提交信息应该简明扼要。并且最好使用一些特定的前缀来标注所作出的改动的类型。下面是一些常见的分类词：

+ `add`，表示添加新功能
+ `fix`，缺陷修复
+ `update`，对已有功能进行更改或优化
+ `delete`，删除部分代码、功能
+ `refactor`，重构了一些代码、功能
+ `workflow`，工作流程更改

```
# 新增了支持用户上传文件的功能
git commit -m 'add: 上传文件功能'

# 修复了一个线上问题
git commit -m 'fix: **页面数字取值问题'
```

## 参考资料

1. Vincent Driessen. A successful Git branching model. http://nvie.com/posts/a-successful-git-branching-model/
