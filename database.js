const mysql2 = require("mysql2/promise");

const dbConfig = {
  host: "94.237.69.212",
  user: "root",
  password: "123456",
  port: "33068",
  database: "mobile",
  connectionLimit: 101,
  queueLimit: 0,
  multipleStatements: true,
  waitForConnections: true,
};

const connectionAsync = mysql2.createPool(dbConfig);
const getConnection = () => {
  return connectionAsync;
};

module.exports.getConnection = getConnection;
