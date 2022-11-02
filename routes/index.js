const express = require("express");
const router = express.Router();
const { getRules } = require("../helpers/rule");
router.get("/", (req, res) => {
  const rules = getRules();
  res.send(rules);
});

router.get("/about", (req, res) => {
  res.send("About birds");
});

module.exports = router;
