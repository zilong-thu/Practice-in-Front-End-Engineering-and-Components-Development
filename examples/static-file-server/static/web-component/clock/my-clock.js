/**
 * 时钟组件示例
 * 使用了 customElements 规范的组件
 */
(function() {
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
 * 用于创建自定义元素的构造函数
 */
class MyClock extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow({mode: 'open'});

    var $div = document.createElement('div');

    var display = () => {
      var now = getTimeStr();
      this.value = now;

      $div.innerHTML = `
        <div>${now.time}</div>
        <div style="font-size: 12px; font-weight: normal; padding-top: 5px;">${now.date + ' ' + now.weekDesc}</div>
      `;
    }

    display();
    shadow.appendChild($div);

    setInterval(function() {
      display();
    }, 500);
  }

  getValue() {
    return this.value;
  }
}

customElements.define('my-clock', MyClock, {extends: 'div'});
})();
