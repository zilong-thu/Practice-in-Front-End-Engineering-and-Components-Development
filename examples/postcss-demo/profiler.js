var postcss = require('postcss');
var colors = require('colors');

// 按照字符串长度，升序排列
function compare(str1, str2) {
  if (str1.length < str2.length) {
    return -1;
  } else if (str1.length > str2.length) {
    return 1;
  }
  return 0;
}

module.exports = postcss.plugin('profiler', function profiler(options) {
 
  return function (css) {
 
    options = options || {};

    var rulesBuild = [];
    var rulesBuildDistinguished = [];

    // Processing code will be added here
    css.walkRules(function (rule) {
      var selector = rule.selector;
      rulesBuild.push(selector);

      var selectorArr = selector.split(',').map(item => String(item).trim());
      rulesBuildDistinguished = rulesBuildDistinguished.concat(selectorArr);
      // rule.walkDecls(function (decl, index) {
      //   console.log(' - ', decl.prop, ': ', decl.value);
      // });
    });

    rulesBuild.sort(compare);

    // 选择器名按照字符串长度升序排序
    rulesBuildDistinguished.sort(compare).reverse();

    var totalRulesCount = rulesBuild.length;
    console.info('There are totaly ', colors.bold(totalRulesCount), ' rules after build.');

    var duplicatedRulesObj = {};
    var rulesWithLongName = [];

    // 找出重复声明了的选择器（含逗号）
    for (var i = 0; i < totalRulesCount; i++) {
      for (var j = i + 1; j < totalRulesCount; j++) {
        if (rulesBuild[i] === rulesBuild[j]) {
          duplicatedRulesObj[rulesBuild[i]] = true;
        }
      }
    }

    var duplicatedRulesArr = Object.keys(duplicatedRulesObj);
    var SPLIT_LINE = colors.grey('---------------------------------------------');
    console.log('==== CSS Static Analysis Report ====');
    console.log(SPLIT_LINE);
    console.log('Duplicated rules: ', colors.bold(duplicatedRulesArr.length));
    console.log(SPLIT_LINE);
    duplicatedRulesArr.forEach(item => {
      console.log('  ', item);
    });
    console.log(SPLIT_LINE);
    var LONG_NAME_OUTPUT_COUNT = 10;
    console.log(`Rules with long name, TOP ${colors.bold(LONG_NAME_OUTPUT_COUNT)}: `);
    console.log(SPLIT_LINE);
    // 找出过长的选择器名（已考虑逗号分隔），前 10 个即可
    for (var i = 0; i < LONG_NAME_OUTPUT_COUNT; i++) {
      console.log(`  [${i+1}]  `, rulesBuildDistinguished[i]);
    }
    console.log('\n==== END CSS Static Analysis Report ====\n');
  }

});