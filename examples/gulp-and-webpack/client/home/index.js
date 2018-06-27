import _ from 'underscore';
import toast from 'toast2';

var str = 'Hello World.';
console.log(str);

// 调用 underscore 方法
var pickedData = _.pick({name: 'moe', age: 50, userid: 'moe1'}, ['name', 'age']);
console.log('pickedData: ', pickedData);

document.querySelector('#output').innerHTML = '=> ' + JSON.stringify(pickedData);
