var fs       = require('fs');
var UglifyJS = require('uglify-js');

// it takes the source code to parse as first argument:
var ast = UglifyJS.parse("function sum(x, y){ return x + y; }");

fs.writeFileSync('./out.js', JSON.stringify(ast));
