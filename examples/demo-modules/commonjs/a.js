var b = require('./b.js');
b.name = 'bb';


module.exports = function(x, y) {
  return x + y;
}

console.log('a is loaded.');
