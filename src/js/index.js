/**
 * 自定义脚本在这里加入到每个页面里
 */

// GA 统计
(function(win) {
  if (win && win.location.hostname === 'localhost') {
    return;
  }

  (function(i,s,o,g,r,a,m) {i['GoogleAnalyticsObject']=r;i[r]=i[r]||function() {(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-45360338-1', 'auto');
  ga('send', 'pageview');
})(window);
