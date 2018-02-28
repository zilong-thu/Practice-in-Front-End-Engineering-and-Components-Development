## Node.js 环境

Node.js 由 Ryan Dahl 在 2009 年开发出来。在过去的8年里，Node.js 及其生态圈的发展可以用突飞猛进、日新月日来形容。前端开发者通常用 Node.js 来进行文件构建（例如 gulp、webpack 一类的构建工具）、提供页面服务（例如 express.js、koa.js 这样的服务器端框架）。

我们可以直接下载安装 Node.js，这样的话操作系统里共用一个 Node.js 程序。但是 Node.js 社区异常活跃，其开发迭代的速度非常快，更好的方式是使用 NVM（Node.js Version Manager） 来管理系统里的 Node.js，可以同时安装任意多个版本，然后在使用时指定需要的 Node.js 版本即可。NVM 实际上是一系列 shell 脚本的集合。安装 NVM （可以在其官网上找到具体的命令，地址：https://github.com/creationix/nvm）：

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
```

安装好 NVM 后，就可以方便地使用 nvm 命令安装或切换当前会话使用的 Node.js 版本：

```
# 安装某个版本的 Node.js
$ nvm install 8.7.0

# 查看当前系统已安装的所有 Node.js 版本
$ nvm ls

# 使用某个已安装了的 Node.js 版本
$ nvm use 6.9.5
```

在项目的根目录下，可以通过 `.nvmrc` 文件来指定当前项目希望使用的 Node.js 版本。例如：

```
# 在项目的根目录下运行
$ echo "8.4.0" > .nvmrc
$ nvm use
Found '/path/to/project/.nvmrc' with version <8.4.0>
Now using node v8.4.0 (npm v5.3.0)
```

nvm 的更多用法可以参考其官网，或者运行 `man nvm` 来获得帮助。
