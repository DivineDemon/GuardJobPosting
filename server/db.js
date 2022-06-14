const mysql = require("mysql");

const db_config = {
  host: "us-cdbr-east-05.cleardb.net",
  user: "b777740e0c5b5e",
  password: "e975f755",
  database: "heroku_d11cc74f6c0497d",
  multipleStatements: true,
  connectionLimit: 10,
};

const pool = mysql.createPool(db_config);
pool.on("acquire", function (connection) {
  console.log("Connection %d acquired", connection.threadId);
});

module.exports = {
  connection: pool,
};
