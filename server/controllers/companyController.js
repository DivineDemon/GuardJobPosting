import { connection } from "../db.js";

export const getCompanies = (req, res) => {
  connection.query("SELECT * FROM company", (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500).json(err);
    }
  });
};

export const addCompany = (req, res) => {
  const { name, phone, email } = req.body;
  connection.query(
    `INSERT INTO company (name, phone, email) VALUES ('${name}', '${phone}', '${email}')`,
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

export const deleteCompany = (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM company WHERE id='${id}'`, (err, rows) => {
    if (!err) {
      res.status(201).json({ message: "Company Deleted Successfully!" });
    } else {
      res.status(500).json(err);
    }
  });
};
