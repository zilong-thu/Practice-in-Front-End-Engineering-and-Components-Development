var esprima = require('esprima');
var program = 'const answer = 42';

console.log(esprima.tokenize(program));
console.log(JSON.stringify(esprima.parseScript(program)));

var res = {
  "body": [
    {
      "declarations": [
        {
          "id": {
            "name": "answer",
            "type": "Identifier"
          },
          "init": {
            "raw": "42",
            "type": "Literal",
            "value": 42
          },
          "type": "VariableDeclarator"
        }
      ],
      "kind": "const",
      "type": "VariableDeclaration"
    }
  ],
  "sourceType": "script",
  "type": "Program"
};
