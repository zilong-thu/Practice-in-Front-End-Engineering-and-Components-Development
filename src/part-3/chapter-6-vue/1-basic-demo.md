# 基本使用示例

在介绍 Vue 的工作原理之前，我们先通过两个示例，分别看一下 Vue 的属性变化侦测及组件化开发的基本使用方式。

## 示例一：个税计算器

我们期望实现一个可以根据用户输入的税前收入，来实时计算纳税额、税后到手金额的小工具。效果示意图如下：

<img src="./tax-calculator-2.png" style="width: 40%; border: 1px solid #ddd;" class="round">

```html
<!-- 开发环境版本，包含了用帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<!-- 这里是 vue app 在文档中的挂载点 -->
<div id="app">
  <div><label>税前月收入：</label><input v-model="income"></div>
  <div><label>五险一金数额： </label>{{ result.profit }}</div>
  <div><label>税后收入：</label>{{ result.real_income }}</div>
  <div><label>实际纳税额：</label>{{ result.tax }}</div>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {
    income: 0
  },
  computed: {
    result: function() {
      return taxCalculator({income: this.income})
    }
  }
});

/**
 * 中国个税计算算法
 * 算法参考：http://www.gerensuodeshui.cn/
 */
function taxCalculator(options = {
  base: 3500,
  income: 10000,
  profit: 0,
}) {
  const base = options.base || 3500;

  // 税前收入
  const income = Number(options.income) || 0;

  // 五险一金缴纳额
  const profit = options.profit || Math.round(income * 0.202);

  const income_after_profit = Math.round(income - profit);

  // 应纳税所得额
  let income_for_tax = income_after_profit - base;
  if (income_for_tax < 0) {
    income_for_tax = 0;
  }

  // 应纳税所得额(不含税)表
  const list = [0, 1455, 4155, 7755, 27255, 41255, 57505, 1000000000000];
  // 税率表
  const rate = [0, 0.03, 0.1, 0.20, 0.25, 0.3, 0.35, 0.45];
  // 速算扣除数表
  const minus = [0, 0, 105, 555, 1005, 2775, 5505, 13505];

  let index = list.findIndex((item, i) => {
    return (item > income_for_tax) && (list[i - 1] < income_for_tax);
  });

  let tax = 0;
  if (income_for_tax) {
    tax = Number(income_for_tax * rate[index] - minus[index]).toFixed(2);
  }

  // 税后收入
  let real_income = (income_after_profit - Number(tax)).toFixed(2);

  return {income, profit, real_income, tax};
}
```


## 示例二：可复用的表格组件

