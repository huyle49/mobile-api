function kbs(rules, input, output) {
  const gt = input;
  const newRules = getRulesByInput(rules, input);
  return newRules;
}

function getRulesByInput(rules, input) {
  const lst = [];
  rules.forEach((rule) => {
    if (rule.left.length <= input.length) {
      let count = 0;
      input.forEach((gt) => {
        if (rule.left.includes(gt)) count++;
      });
      if (count === rule.left.length) lst.push(rule);
    }
    return lst;
  });
}
