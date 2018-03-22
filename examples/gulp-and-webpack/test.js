const crypto = require('crypto');



const input = 'I love cupcakes';

const secret = 'abcdefg';
const NUM = 1;
console.time('sha256');
for (var i = 0; i < NUM; i++) {
  const hash = crypto.createHash('sha256')
                   .update(input)
                   .digest('hex');
}
console.timeEnd('sha256');


console.time('md5');
for (var i = 0; i < NUM; i++) {
  const hash = crypto.createHash('md5')
    .update(input)
    .digest('hex');
}
console.timeEnd('md5');
