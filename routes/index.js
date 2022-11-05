const express = require("express");
const router = express.Router();
const { getConnection } = require("../database");

const { kbs } = require("../helpers/kbs");
const { getRules } = require("../helpers/rule");
const connection = getConnection();
router.get("/kbs", async (req, res) => {
  const rules = getRules();
  const { gt } = req.query;
  const input = gt.split(",");
  const ids = kbs(rules, input);
  console.log(ids);
  const query = ids.map((id) => `'${id}'`).join(",");
  const [rows] = await connection.query(
    `SELECT * FROM mobile where id IN (${query})`
  );
  res.send(rows);
});

router.get("/about", (req, res) => {
  res.send("About birds");
});
router.get("/interests", async (req, res) => {
  const [rows] = await connection.query(`SELECT * FROM interests`);
  return res.send(rows);
});

router.get("/job", async (req, res) => {
  const [rows] = await connection.query(`SELECT * FROM job`);
  return res.send(rows);
});

module.exports = router;
