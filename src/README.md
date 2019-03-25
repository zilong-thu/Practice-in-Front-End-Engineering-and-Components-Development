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

## 协议、许可

本书采用[署名-非商业性使用-禁止演绎 4.0 国际](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh)协议进行开源写作。

您可以自由地**共享** — 在任何媒介以任何形式复制、发行本作品。只要你遵守许可协议条款，许可人就无法收回你的这些权利。惟须遵守下列条件：

+ 署名 — 您必须给出适当的署名，提供指向本许可协议的链接，同时标明是否（对原始作品）作了修改。您可以用任何合理的方式来署名，但是不得以任何方式暗示许可人为您或您的使用背书。
+ 非商业性使用 — 您不得将本作品用于商业目的。
+ 禁止演绎 — 如果您 再混合、转换、或者基于该作品创作，您不可以分发修改作品。
