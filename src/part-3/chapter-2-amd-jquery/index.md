# 面向对象的组件化开发

在各种前端 MVC/MVVM 框架出现之前，Web 前端开发人员可以通过 jQuery + AMD + 面向对象的设计方式，进行初级的组件化开发。


## 时钟示例

我们这里以一个简单的时钟组件为例，展示基于 jQuery 与 AMD 的组件化开发方式是怎样的。示例共有4个文件：

```
jquery-amd-clock
├── clock.js
├── index.css
├── index.html
└── index.js
```

HTML 文件：

```html
<!DOCTYPE html>
<html>
<head>
  <title>jQuery+AMD组件化时钟示例</title>
  <meta charset="utf-8">
  <link rel="stylesheet" type="text/css" href="/jquery-amd-clock/index.css">
</head>
<body>
  <h1>jQuery+AMD组件化时钟示例</h1>

  <div id="clock-container"></div>

  <script data-main="/jquery-amd-clock/index.js" src="/js/require.js"></script>
  <script type="text/javascript">
    requirejs.config({
      paths: {
        'jquery': '/js/jquery-3.2.1'
      }
    });
  </script>
</body>
</html>
```

下面是主 JavaScript 入口文件 `index.js`。做的事情比较简单：加载`jquery`、`clock.js`，然后调用 `Clock` 函数显示时钟：

```javascript
define([
  'jquery',
  '/jquery-amd-clock/clock.js',
], function($, Clock) {
  var cl = Clock({
    container: $('#clock-container')[0],
  });
});
```

时钟组件 `clock.js` 文件：

```javascript
define([], function() {
  /**
   * 如果num小于10，则在其左侧填充0
   * @param  {Number} num
   * @return {String|Number}
   */
  function leftPadding(num) {
    if (num < 9) {
      return '0' + num;
    }
    return num;
  }

  /**
   * 解析当前时间
   */
  function getTimeStr() {
    var time   = new Date();
    var hour   = leftPadding(time.getHours());
    var minute = leftPadding(time.getMinutes());
    var second = leftPadding(time.getSeconds());

    var year   = time.getFullYear();
    var month  = leftPadding(time.getMonth() + 1);
    var day    = leftPadding(time.getDate());
    var str    = `${hour}:${minute}:${second}`;

    var weekZNArray = ['日', '一', '二', '三', '四', '五', '六'];
    var weekDesc = '周' + weekZNArray[time.getDay()];

    return {
      weekDesc: weekDesc,
      date: `${year}-${month}-${day}`,
      time: str,
    };
  }

  /**
   * 最终被输出的构造函数
   * @param {Object} [props] 形如：
   *   {
   *     container: DOMElement,
   *   }
   */
  function Clock(props) {
    if (!props || !props.container) {
      throw new Error('请指定时钟的容器元素');
      return;
    }
    var container = props.container;

    var $div = document.createElement('div');

    function display() {
      var now = getTimeStr();

      // 这里我们借助 ES6 的模板字符串，来声明所需要的 HTML 片段
      $div.innerHTML = `
        <div class="my-clock">
          <div>${now.time}</div>
          <div style="font-size: 12px; font-weight: normal; padding-top: 5px;">${now.date + ' ' + now.weekDesc}</div>
        </div>
      `;
    }

    display();
    container.appendChild($div);

    setInterval(function() {
      display();
    }, 500);
    console.log('时钟已创建');
  }

  return Clock;
});
```

最后是 CSS ：

```
.my-clock {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  font-size: 24px;
  font-weight: bold;
  font-family: monospace;
}
```

效果：

<img src="../chapter-3-web-components/images/clock-text.png" style="width: 160px;" title="时钟挂件效果" />

## 分析

`clock.js` 模块输出的是一个函数 `Clock`，要在文档里显示一个时钟，用户只需要调用这个函数，传入要显示时钟的容器元素对象就可以了。使用者不需要关心如何操作 DOM，这个细节由 `Clock` 函数完成了。

组件 `clock.js` 做到了基本的逻辑功能封装（数据变更、模板生成、视图渲染等），不过数据到视图的渲染过程，依然脱离不了对 DOM 的操作。在应用程序比较简单的时期，这种方案似乎总是能够满足开发者的需求。然而随着前端应用的复杂度提升，大量的 DOM 操作交织错杂，使得这种方式开发的组件并不好维护。
