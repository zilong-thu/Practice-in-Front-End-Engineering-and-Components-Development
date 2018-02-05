# 简介

书名：Web组件化开发与前端工程化实践


## 开发

`./src` 目录为书籍内容的源文件。

`./src/_book` 为 gitbook 编译后的文件所在目录，已经添加至 `.gitignore`。

全局安装 `gitbook-cli`：

```
npm install -g gitbook-cli
```

在 `src` 目录，启动书籍的编译服务：

```
gitbook serve
```


## 统计字数

关心的是 src 目录下的字符数。主要用到的命令是 `find` 与 `wc`，给 `wc` 指定的参数是 `-m`，表明我们关心的是字符数。

```
find . -type f -name "*.md"  | xargs wc -m
```
