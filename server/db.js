import mysql from "mysql";

export const connection = mysql.createConnection({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b777740e0c5b5e",
  password: "e975f755",
  database: "heroku_d11cc74f6c0497d",
  multipleStatements: true,
});

connection.connect((err) => {
  if (!err) {
    console.log("MySQL DB Connected!");
  } else {
    console.log(err);
  }
});
