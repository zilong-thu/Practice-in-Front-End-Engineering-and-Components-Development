# HTML Template

Web Components 规范里的 HTML 模板（HTML Template）是指浏览器新增对标签 `<template>` 的支持，以便用户能够在其中声明任意的 HTML 片段。

```
var tpl        = document.createElement('template');
var tplContent = tpl.content;
```


下面是一个使用 `<template>` 编程的示例。

```
/**
 * 注：本示例来自 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template)
 */

<table id="producttable">
  <thead>
    <tr>
      <td>ID</td>
      <td>名称</td>
    </tr>
  </thead>
  <tbody>
    <!-- 现有数据可以可选地包括在这里 -->
  </tbody>
</table>

<template id="productrow">
  <tr>
    <td class="record"></td>
    <td></td>
  </tr>
</template>

<script type="text/javascript">
  // 通过检查来测试浏览器是否支持HTML模板元素
  // 用于保存模板元素的内容属性。
  if ('content' in document.createElement('template')) {
    // 使用现有的HTML tbody实例化表和该行与模板
    let t = document.querySelector('#productrow'),
    td = t.content.querySelectorAll("td");
    td[0].textContent = "01";
    td[1].textContent = "模板-内容-随便写点什么";

    // 克隆新行并将其插入表中
    let tb = document.getElementsByTagName("tbody")[0];
    let clone = document.importNode(t.content, true);
    tb.appendChild(clone);

    // 创建一个新行
    td[0].textContent = "02";
    td[1].textContent = "另外一个名字";

    // 克隆新行并将其插入表中
    let clone2 = document.importNode(t.content, true);
    tb.appendChild(clone2);

  } else {
    // 找到另一种方法来添加行到表，因为不支持HTML模板元素。
  }
</script>
```
