import mysql from "mysql";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "guardJobPosting",
  multipleStatements: true,
});

connection.connect((err) => {
  if (!err) {
    console.log("MySQL DB Connected!");
  } else {
    console.log(err);
  }
});
