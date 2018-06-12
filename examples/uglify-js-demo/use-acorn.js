const acorn = require('acorn');
const fs    = require('fs');

const code = `
  var a = 1;
  function sum(x, y){ return x + y; }
 `;
const res = acorn.parse(code);

fs.writeFileSync('./build/acorn-out.json', JSON.stringify(res));
