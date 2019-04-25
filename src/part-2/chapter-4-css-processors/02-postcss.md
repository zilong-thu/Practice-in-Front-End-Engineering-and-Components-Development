# PostCSS 简介

> PostCSS is a tool for transforming CSS with JavaScript.

在所有的 CSS 预处理工具中，PostCSS 是最为与众不同的一个。Sass/Less/Stylus 都是定义好 CSS 语法、函数、Mixin、模块等规则，然后开发者必须按照这样的规则来书写。PostCSS 则不定义任何规则，而是把 CSS 语法分析的结果以 JavaScript API 的形式暴露出来，让开发者可以定义自己的插件，各个插件以管线的形式处理输入。我们正好可以通过 PostCSS 的插件用法，以及如何实现一个插件，来感受一下 PostCSS 以及大多数 CSS 预处理的核心工作原理。

### PostCSS 与 CSS 抽象语法树

```css
#main {
  border: 1px solid black;
}
```

上面一段简单的 CSS 代码，经过 PostCSS 处理后，会得到下面用 JSON 表示的抽象语法树（可以在 [https://astexplorer.net/](https://astexplorer.net/) 里直观地看到）：

```javascript
{
  "raws": {
    "semicolon": false,
    "after": ""
  },
  "type": "root",  // 表示当前节点为根节点
  "nodes": [       // 此数组包含了根节点下的所有子节点，每个对象对应一个样式规则
    {
      "raws": {
        "before": "",
        "between": " ",
        "semicolon": true,
        "after": "\n"
      },
      "type": "rule",  // 本节点类型为 "rule"，即样式规则
      "nodes": [
        {
          "raws": {
            "before": "\n  ",
            "between": ": "
          },
          // 本节点类型为"decl"（declaration，声明），即<属性-值>对。此外，也可以是 "rule"，这样就意味着 css 源码是可以层级嵌套的
          "type": "decl",
          "source": {      // 本节点的位置信息
            "start": {
              "line": 2,
              "column": 3
            },
            "input": {
              "css": "#main {\n  border: 1px solid black;\n}",
              "hasBOM": false,
              "id": "<input css 12>"
            },
            "end": {
              "line": 2,
              "column": 26
            }
          },
          "prop": "border",             // 属性名
          "value": "1px solid black",   // 属性值
        }
      ],
      "source": {    // 记录了当前节点在源码中的位置信息
        "start": {   // 起点
          "line": 1,
          "column": 1
        },
        "input": {
          "css": "#main {\n  border: 1px solid black;\n}",
          "hasBOM": false,
          "id": "<input css 12>"
        },
        "end": {     // 终点
          "line": 3,
          "column": 1
        }
      },
      "selector": "#main",   // 本样式规则的选择器
    }
  ],
  "source": {
    "input": {
      "css": "#main {\n  border: 1px solid black;\n}",
      "hasBOM": false,
      "id": "<input css 12>"
    },
    "start": {
      "line": 1,
      "column": 1
    }
  }
}
```


### Autoprefixer 工作原理


**Autoprefixer**

<figure>
<img src="./images/autoprefixer-logo.png" style="width: 100px;">
<figcaption>Autoprefixer 的 logo</figcaption>
</figure>

Autoprefixer 是 PostCSS 生态链下最受欢迎的一个插件。

### CSS Next


## 参考资料

1. [PostCSS 官网](https://postcss.org/)
2. [PostCSS API](http://api.postcss.org/)
