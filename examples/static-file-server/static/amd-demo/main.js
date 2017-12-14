requirejs.config({
  paths: {
    'jquery': '/js/jquery-3.2.1'
  }
});

require([
  '/js/lodash.min.js',
  'jquery',
  '/utils/amd-lib-1.js',
], function(_, $, amdLib_1) {
  var str = 'I am using main.js, and I am loaded.';

  if (_ && (typeof _.chunk === 'function')) {
    var res = _.chunk(['a', 'b', 'c', 'd'], 2);
    str += '\nLodash.js seems fine too. \n_.chunk gives this result: ' + JSON.stringify(res);
  }

  console.log(str);
  document.getElementById('console').innerHTML = str;

  if (typeof $ === 'function') {
    $('[data-role="jquery-container"]').html('jQuery is loaded too.');
  }

  console.log('amd-lib-1 => ', amdLib_1);
  console.log('requirejs define => ', define);
  console.log(Object.keys(define));
});
