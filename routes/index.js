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
  const query = ids.map((id) => `'${id}'`).join(",");
  const [rows] = await connection.query(
    `SELECT 
      mb.*,
      c.description as color,
      md.description as model,
      r.ram as ram
    FROM mobile as mb
    LEFT JOIN color as c ON mb.color_id = c.id
    LEFT JOIN model as md ON mb.model_id = md.id
    LEFT JOIN ram as r ON mb.ram_id = r.id 
    where mb.id IN (${query})`
  );
  res.send(rows);
});

router.get("/interests", async (req, res) => {
  const [rows] = await connection.query(`SELECT * FROM interests`);
  return res.send(rows);
});

router.get("/job", async (req, res) => {
  const [rows] = await connection.query(`SELECT * FROM job`);
  return res.send(rows);
});

router.get("/mobile", async (req, res) => {
  let where = "";
  const { model, ram, color, price } = req.query;
  if (model) {
    where += `AND model_id = '${model}'`;
  }
  if (ram) {
    where += `AND ram_id = '${ram}'`;
  }
  if (color) {
    where += `AND color_id = '${color}'`;
  }
  if (price) {
    where += `AND price_id = '${price}'`;
  }
  const [rows] = await connection.query(
    `SELECT mb.*,
        c.description as color,
        md.description as model,
        r.ram as ram
      FROM mobile as mb
      LEFT JOIN color as c ON mb.color_id = c.id
      LEFT JOIN model as md ON mb.model_id = md.id
      LEFT JOIN ram as r ON mb.ram_id = r.id
    WHERE 1 ${where}`
  );
  return res.send(rows);
});

router.get("/models", async (req, res) => {
  const [rows] = await connection.query(`SELECT * FROM model`);
  return res.send(rows);
});

router.get("/color", async (req, res) => {
  const [rows] = await connection.query(`SELECT * FROM color`);
  return res.send(rows);
});

router.get("/price", async (req, res) => {
  const [rows] = await connection.query(`SELECT * FROM price`);
  return res.send(rows);
});

router.get("/ram", async (req, res) => {
  const [rows] = await connection.query(`SELECT * FROM ram`);
  return res.send(rows);
});

module.exports = router;
