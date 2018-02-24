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

主 JavaScript 入口文件：

```javascript
define([
  'jquery',
  '/jquery-amd-clock/clock.js',
], function($, Clock) {
  var cl = new Clock({
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
   * @param {Object} [props]
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
