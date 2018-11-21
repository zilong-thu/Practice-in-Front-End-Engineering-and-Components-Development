# ESLint

ESLint 是由 Nicholas C. Zakas 于 2013 年创建的开源项目，旨在为 JavaScript 提供可扩展的语法检查功能。Nicholas 是著名的 JavaScript 布道师，著有《JavaScript高级程序设计》《JavaScript面向对象设计精要》《编写可维护的JavaScript》等书籍。

ESLint 主要有两种使用方式，一种是在命令行中使用，适合自动化、持续构建流程；一种是与编辑器集成，可以为开发者提供实时代码检查能力。

## 基本使用：命令行

在终端中通过命令行的方式运行 ESLint 是其最基本的使用方式。我们先从安装开始说起。

**全局**

```bash
# 安装全局依赖
$ npm install eslint -g

# 添加
$ eslint --init
$ eslint yourfile.js
```

**局部**

```bash
# 安装局部依赖
$ npm install eslint --save-dev

# 添加配置文件（可选）
$ ./node_modules/.bin/eslint --init
  # 使用 ESLint 自带的配置初始化程序的话，会被问到类似下面的问题
  ? How would you like to configure ESLint? Answer questions about your style
  ? Which version of ECMAScript do you use?
  ? Are you using ES6 modules?
  ? Where will your code run?
  ? Do you use CommonJS?
  ? Do you use JSX?
  ? Do you use React?
  ? What style of indentation do you use?
  ? What quotes do you use for strings?
  ? What line endings do you use?
  ? Do you require semicolons?
  ? What format do you want your config file to be in?
  The config that you have selected requires the following dependencies:

  eslint-plugin-react@latest
  Successfully created .eslintrc.js file in <path-to-project-root>
```

初始化之后，会在项目的根目录下面创建 `.eslintrc.js` 文件，作为规则配置文件，按照上面的选择，该文件内容如下：

```javascript
module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "vue",
  ],
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "semi": ["warn", "always"]
  }
};
```

如果使用了 React 或者 Vue 之类的框架，需要使用配套的语法解析插件来帮助 ESLint 进行代码检查（例如 Vue 的单文件组件需要有特定的语法解析规则）。我们在这里把 React 和 Vue 的插件都安装一下：

```bash
# 安装特定的依赖
$ npm i --save-dev eslint-plugin-react eslint-plugin-vue
```

依赖包安装完成之后，就可以启动 ESLint 了。启动 ESLint 有两种常用方法。第一种是直接调用局部模块系统下的 `eslint` 脚本：

```bash
# 在项目根目录下使用
$ ./node_modules/.bin/eslint yourfile.js
```

还可以在 `package.json` 里指定 shell 命令。例如下面的 `lint` 字段意思是，使用 `.eslintrc.js` 文件作为配置文件，对 `src/` 目录下的所有后缀为 `.vue` 或者 `.js` 的文件进行代码检查：

```json
{
  "scripts": {
    "lint": "eslint  -c .eslintrc.js --ext .vue,.js src/"
  }
}
```

然后，在项目根目录下运行 `npm run lint` 即可对关心的目录、文件进行代码检查了：

```bash
$ npm run lint
> eslint -c .eslintrc.js --ext .vue,.js src/

~project-root/src/pages/explore/index.vue
  15:2  warning  Missing semicolon  semi

~project-root/src/pages/home/index.vue
  19:2  warning  Missing semicolon  semi

~project-root/src/pages/user/followers/index.vue
  20:2  warning  Missing semicolon  semi

✖ 3 problems (0 errors, 3 warnings)
  0 errors and 3 warnings potentially fixable with the `--fix` option.
```

每个项目局部安装、局部配置是我们推荐的方式。这样便于各个项目之间解耦，并且便于在构建环境中持续集成。

## 与 Git 钩子一起使用

ESLint 常见的使用方法之一是与 Git 的钩子一起使用，例如 `pre-commit`。下面的配置（借助于 Node 包 husky），可以在每次执行 Git 提交之前，检测文件变动，只对修改、新增的文件用 ESLint 进行检查。

```json
{
  "scripts": {
    "lint-cached-files": "git diff --cached --name-status | awk '$1 != \"D\" && $2 ~ /(src.+vue$)|(src.+js$)/ { print $2 }' | xargs eslint -c ./eslintrc.js --ignore .eslintignore"
  },
  "husky": {
    "pre-commit": "npm run lint-cached-files"
  }
}
```

我们来逐字分析一下 `git diff --cached --name-status | awk '$1 != \"D\" && $2 ~ /(src.+vue$)|(src.+js$)/ { print $2 }' | xargs eslint -c ./eslintrc.js --ignore .eslintignore` 这段脚本。

① 首先，`git diff --cached --name-status` 可以输出 Git 暂存区的文件名，以及文件变更描述，例如：

```text
D       README.md
A       doc.md
M       src/part-2/art-about-code.md
M       src/part-2/chapter-3-js-parsers/3-eslint.md
```


## 与编辑器集成

### Sublime Text

参考：https://github.com/SublimeLinter/SublimeLinter-eslint

### VSCode


## 常见规则

