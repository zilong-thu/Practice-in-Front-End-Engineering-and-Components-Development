# 刀耕火种时代

HTML `<script>` 元素用于嵌入或引用可执行脚本。互联网早期，页面比较简单，使用内嵌的方式或者引用单个 JavaScript 文件就可以满足业务需求。如果功能变得复杂，单个 JavaScript 文件行数变得很多，那么可以将 JavaScript 分为多个文件，并且需要小心翼翼地处理各个 `<script>` 标签的书写顺序。

这个时期针对 JavaScript 模块的处理技术主要是文件的拼接（concat）。



## concat

