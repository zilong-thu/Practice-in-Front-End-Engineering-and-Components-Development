# 关于本书的写作

## 开发

`./src` 目录为书籍内容的源文件。

`_book/` 为 gitbook 编译后的文件所在目录，已经添加至 `.gitignore`。

只需局部安装 `gitbook-cli` 即可（全局安装使用的话，也很方便）：

```bash
# 目前使用的是 9.7.0 版本
$ nvm use
$ npm install
```

在项目根目录，启动书籍的编译服务：

```bash
$ npx gitbook serve src
```

## 发布 HTML 版本

首先要确保已经有了一个独立的分支 `gh-pages`，第一次执行了 gitbook build 之后，执行下面的命令来创建 `gh-pages` 分支：

```bash
$ gitbook build src _book
# 创建 gh-pages 分支
$ git checkout --orphan gh-pages
$ git rm --cached -r .
```

只需要保留 `package.json`、`.gitignore` 等必要的文件就可以了。

```bash
$ git checkout gh-pages
$ cp -r _book/* .
$ git add --all
$ git commit -m 'publish book'
$ git push origin gh-pages
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
