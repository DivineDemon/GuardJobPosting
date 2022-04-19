import mysql from "mysql";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "guardJobPosting",
  multipleStatements: true,
});
