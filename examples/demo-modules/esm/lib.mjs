
console.log('lib module is loaded into memory.');

export var name = '阿珂';

export function setName(n) {
  name = n;
}

export function add(x, y) {
  return x + y;
}