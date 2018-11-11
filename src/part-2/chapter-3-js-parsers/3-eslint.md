# ESLint

ESLint 是由 Nicholas C. Zakas 于 2013 年创建的开源项目，旨在为 JavaScript 提供可扩展的语法检查功能。Nicholas 是著名的 JavaScript 布道师，著有《JavaScript高级程序设计》《JavaScript面向对象设计精要》《编写可维护的JavaScript》等书籍。

ESLint 主要有两种使用方式，一种是在命令行中使用，适合自动化、持续构建流程；一种是与编辑器集成，可以为开发者提供实时代码检查能力。

## 命令行使用

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
  ? Which version of ECMAScript do you use? ES2018
  ? Are you using ES6 modules? Yes
  ? Where will your code run? Browser
  ? Do you use CommonJS? No
  ? Do you use JSX? Yes
  ? Do you use React? Yes
  ? What style of indentation do you use? Spaces
  ? What quotes do you use for strings? Double
  ? What line endings do you use? Unix
  ? Do you require semicolons? Yes
  ? What format do you want your config file to be in? JavaScript
  The config that you have selected requires the following dependencies:

  eslint-plugin-react@latest
  Successfully created .eslintrc.js file in <path-to-project-root>

# 在项目根目录下使用
$ ./node_modules/.bin/eslint yourfile.js
```

每个项目局部安装、局部配置是我们推荐的方式。这样便于各个项目之间解耦，并且便于在构建环境中持续集成。

## 与编辑器集成

### Sublime Text

参考：https://github.com/SublimeLinter/SublimeLinter-eslint

### VSCode


## 常见规则

