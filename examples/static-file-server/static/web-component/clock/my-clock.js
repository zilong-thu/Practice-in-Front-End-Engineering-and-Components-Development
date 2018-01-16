(function() {
/**
 * 使用了 customElements 规范的组件
 */

function leftPadding(num) {
  if (num < 9) {
    return '0' + num;
  }
  return num;
}

function getTimeStr() {
  var time   = new Date();
  var hour   = leftPadding(time.getHours());
  var minute = leftPadding(time.getMinutes());
  var second = leftPadding(time.getSeconds());

  var year   = time.getFullYear();
  var month  = leftPadding(time.getMonth() + 1);
  var day    = leftPadding(time.getDate());
  var str    = `${hour}:${minute}:${second}`;

  var weekDesc = '周' + time.getDay();

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    weekDesc: weekDesc,
    date: `${year}-${month}-${day}`,
    time: str,
  };
}

class MyClock extends HTMLElement {
  constructor() {
    super();

    var wcParent = this.parentNode;

    var shadow = this.attachShadow({mode: 'open'});

    var $time = document.createElement('span');
    var $date = document.createElement('div');

    var now = getTimeStr();
    $time.textContent = now.time;
    $date.textContent = now.date + ' ' + now.weekDesc;
    $date.style       = 'font-size: 12px; font-weight: normal; padding-top: 5px;';

    var $div = document.createElement('div');
    $div.appendChild($time);
    $div.appendChild($date);

    shadow.appendChild($div);

    setInterval(function() {
      var now = getTimeStr();
      $time.textContent = now.time;
      $date.textContent = now.date + ' ' + now.weekDesc;
    }, 200);
  }
}

customElements.define('my-clock', MyClock, {extends: 'div'});
})();
