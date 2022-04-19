import { connection } from "../db.js";

export const getGuards = (req, res) => {
  connection.query("SELECT * FROM guard", (err, rows, fields) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500).json(err);
    }
  });
};

export const addGuard = (req, res) => {
  const { name, email, phone } = req.body;
  connection.query(
    `INSERT INTO guard (name, email, phone) VALUES ('${name}', '${email}', '${phone}')`,
    (err, rows, fields) => {
      if (!err) {
        res
          .status(201)
          .json({ message: "Data Inserted Successfully!", data: rows });
      } else {
        res.status(500).json(err);
      }
    }
  );
};
