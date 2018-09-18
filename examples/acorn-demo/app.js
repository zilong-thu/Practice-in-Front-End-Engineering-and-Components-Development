const {Parser} = require('acorn');
const walk     = require('acorn-walk');

console.log(JSON.stringify(Parser.parse('var a = 1;')));
