const fs = require("fs");
function getRules() {
  const rules = JSON.parse(fs.readFileSync("./mock/rules.json"));

  return rules;
}

module.exports = {
  getRules,
};
