# 混淆（uglify）技术

JavaScript


```
npm i --save uglify-js
```

```javascript
(function (global) {
  var name = 'Hello';
  console.log(name);
})(window);
```

运行：

```
uglifyjs in.js -m -o out.js
```

得到的结果：

```javascript
(function(o){var l="Hello";console.log(l)})(window);
```