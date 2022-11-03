function kbs(rules, input) {
  const gt = input;
  let newRules = getRulesByInput(rules, gt);
  while (newRules.length > 0) {
    newRules.forEach((rule) => {
      if (gt.indexOf(rule.right) < 0) {
        gt.push(rule.right);
      }
      rules.splice(
        rules.findIndex((v) => v.right === rule.right),
        1
      );
    });
    newRules = getRulesByInput(rules, gt);
  }
  return gt;
}

function getRulesByInput(rules, gt) {
  const lst = [];
  rules.forEach((rule) => {
    if (rule.left.length <= gt.length) {
      let count = 0;
      gt.forEach((lt) => {
        if (rule.left.includes(lt)) count++;
      });
      if (count === rule.left.length) lst.push(rule);
    }
  });
  return lst;
}

module.exports = {
  kbs,
};
