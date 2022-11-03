const express = require("express");
const router = express.Router();
const { getConnection } = require("../database");

const { kbs } = require("../helpers/kbs");
const { getRules } = require("../helpers/rule");
const connection = getConnection();
router.get("/", async (req, res) => {
  const rules = getRules();
  const ids = kbs(rules, ["G1", "NN1"]);
  console.log(`SELECT * FROM mobile where id IN (${ids.join(", ")})`);
  const [rows] = await connection.query(
    `SELECT * FROM mobile where id IN (${ids.join(",")})`
  );
  res.send(rows);
});

router.get("/about", (req, res) => {
  res.send("About birds");
});

module.exports = router;
