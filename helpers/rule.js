const fs = require("fs");
function getRules() {
  const rules = fs.readFileSync("./mock/rules.txt", "utf8");
  const arr = [];
  rules.split(/\r?\n/).forEach(function (line) {
    const kb = line.split(":");
    arr.push({ left: kb[0].split(","), right: kb[1] });
  });

  return arr;
}

module.exports = {
  getRules,
};
