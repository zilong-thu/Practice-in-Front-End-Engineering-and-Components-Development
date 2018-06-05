import {name} from './lib.mjs';
import {setName, add} from './lib.mjs';

import './foo?query=1';
import './foo?query=2';

console.log(name);
setName('李白');
console.log(name);

console.log('sum: ' + add(2, 3));

