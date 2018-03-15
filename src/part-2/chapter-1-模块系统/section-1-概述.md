# 模块系统概述

JavaScript 模块系统旨在解决大中型前端应用脚本管理与加载问题。



+ 刀耕火种时代
+ CommonJS
+ AMD 时代
+ ESM 时代

## 模块系统的重要性

### 减少 bug 率

Hatton<sup>[1]</sup> 研究统计了代码行数与出现的 bug 数量的关系，给出了下面的曲线。结论之一是，一个模块的代码逻辑行数在200~400行之间是最佳状态，此时缺陷的密度最低。而且，Hatton 的研究发现，这个行数与所使用的编程语言无关。如果考虑到必要的注释、空行等，一个可读性好、思路清晰、易于维护的模块文件代码总行数通常在400~800行之间。

<img src="./images/hatton.png" style="width: 300px;">

模块的代码行数太小，也会带来 bug 密度的提升，主要是因为模块与模块之间的 API 成本相应增加导致。例如，在一个模块中，当你需要通过追溯多个模块才能发现某个方法、依赖的来源时，这种成本就可以理解为模块间API的成本。

<img src="./images/js-module-too-small.png">

过多的跨模块查找，形成了模块间“沟通”成本。这会干扰你的注意力，使得 bug 产生的概率增加。

### 提升复用性

> Don't Repeat Yourself.（不要重复自身）
>
> -- The Pragmatic Programmer. 《程序员修炼之道》

《Unix编程艺术》里提到模块的正交性特点：在纯粹的正交性设计中，任何操作均无副作用；每个操作只改变一件事情；要修改任何一个属性，有且仅有一个方法可以使用。

“正交”是非常优雅的一个词语。在欧几里得空间里，两个向量点积为零则为正交；在物理学中，正交表现为运动的独立性。

## 参考资料

1. IEEE Software. Les Hatton. “Re-examining the Defect-Density versus Component Size Distribution”. March/April 1997.
