# Vue 的关键概念与原理

## 检测对象变化

Vue 的核心功能之一是模板可以自动响应数据变化，这就涉及到如何检测数据的变动。

在版本 1 和 2 中，Vue 是基于 `Object.defineProperty()` 方法重写对象属性的 `getter/setter` 实现了对象属性变化的检测。`Object.defineProperty()` 是 ECMAScript5 标准添加的特性，无法通过 JavaScript 代码实现 polyfill（因此 Vue 无法用于像 IE8 这种不支持 ES5 的浏览器）。

而到了 Vue 3（发布于 2019 年），则采用了更新的 ES6 API —— Proxy。

### `Object.defineProperty()`

我们先通过一段代码来看一下 `Object.defineProperty()` 是如何检测对象属性变化的。

```javascript
/**
 * 通过这个函数，可以将传入的对象变成“响应式”的
 */
function makeObjectReactive(obj, func) {
  Object.keys(obj).forEach(key => {
    // val 变量被 getter/setter 闭包使用到，具有很长的生存期
    let val = obj[key];
    Object.defineProperty(obj, key, {
      get: function() {
        return val;
      },
      set: function(nextVal) {
        if (typeof func === 'function') {
          func(key, val, nextVal);
        }
        val = nextVal;
      }
    });
  });
  return obj;
}

var a = makeObjectReactive({
  name: 'Hello',
  age: 13,
}, (key, val, nextVal) => {
  console.log(`对象属性 ${key} 发生变化: ${val} => ${nextVal}`);
});

// 我们在修改对象 a 的两个属性时，总是能够自动调用我们传入的函数（makeObjectReactive 的第二个参数）
a.name = 'World';  // 对象属性 name 发生变化: Hello => World
a.age  = 15;       // 对象属性 age 发生变化: 13 => 15
```

### Vue.js 的处理

```javascript
var vm = new Vue({
  data: {
    name: '',
  }
});
```

构造函数 `Vue` 实际上会遍历 `data` 下的所有属性，重新设置 `getter` 与 `setter`。
