requirejs.config({
  paths: {
    'jquery': '/js/jquery-3.2.1'
  }
});

require([
  '/js/lodash.min.js',
  'jquery',
], function(_, $) {
  var str = 'I am using main.js, and I am loaded.';

  if (_ && (typeof _.chunk === 'function')) {
    var res = _.chunk(['a', 'b', 'c', 'd'], 2);
    str += '\nLodash.js seems fine too. _.chunk gives this result: ' + JSON.stringify(res, null, 2);
  }

  console.log(str);
  document.getElementById('console').innerHTML = str;

  if (typeof $ === 'function') {
    $('[data-role="jquery-container"]').html('jQuery is loaded too.');
  }
});
