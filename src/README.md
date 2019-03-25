# Web前端工程化与组件化开发实践

英文名：Practice in Front End Engineering and Components Development


## 开发

`./src` 目录为书籍内容的源文件。

`./src/_book` 为 gitbook 编译后的文件所在目录，已经添加至 `.gitignore`。

只需局部安装 `gitbook-cli` 即可：

```bash
# 目前使用的是 9.4.0 版本
$ nvm use
$ npm install
```

在 `src` 目录，启动书籍的编译服务：

```bash
$ npx gitbook serve
```

## 统计字数

关心的是 src 目录下的字符数。主要用到的命令是 `find` 与 `wc`，给 `wc` 指定的参数是 `-m`，表明我们关心的是字符数。

```bash
$ find . -type f -name "*.md"  | xargs wc -m
```

## 制作书籍

可以用 `gitbook build` 来生成静态网页版的书籍。也可以使用命令行工具 `ebook-convert` 来编译为 PDF。

### ebook-convert

`ebook-convert` 是 Calibre 发布的一款开源工具。[官网](https://calibre-ebook.com)

+ 下载 Calibre 并且安装，calibre-3.22.1
+ 软连接：`ln -s /Applications/calibre.app/Contents/MacOS/ebook-convert /usr/local/bin`
+ `gitbook pdf`
