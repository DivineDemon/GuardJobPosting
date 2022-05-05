import { connection } from "../db.js";

export const getBanks = (req, res) => {
  connection.query("SELECT * FROM bank", (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500).json(err);
    }
  });
};

export const addBank = (req, res) => {
  const { name, accountTitle, accountNo, bsb, abn } = req.body;
  connection.query(
    `INSERT INTO bank (name, accountTitle, accountNo, bsb, abn) VALUES ('${name}', '${accountTitle}', ${accountNo}, ${bsb}, ${abn})`,
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

export const deleteBank = (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM bank WHERE bankID=${id}`, (err, rows) => {
    if (!err) {
      res.status(201).json({ message: "Bank Deleted Successfully!" });
    } else {
      res.status(500).json(err);
    }
  });
};
