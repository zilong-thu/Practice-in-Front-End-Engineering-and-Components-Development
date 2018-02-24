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
