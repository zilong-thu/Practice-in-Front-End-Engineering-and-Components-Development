var app = new Vue({
  el: '#app',
  data: {
    message: 0,
  },
  computed: {
    result: function() {
      return taxCalculator({income: this.message})
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
    tax = Math.round(income_for_tax * rate[index] - minus[index]);
  }

  // 税后收入
  const real_income = income_after_profit - tax;

  return {income, profit, real_income, tax};
}