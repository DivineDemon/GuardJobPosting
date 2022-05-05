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

export const deleteCompany = (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM company WHERE companyID=${id}`, (err, rows) => {
    if (!err) {
      res.status(201).json({ message: "Company Deleted Successfully!" });
    } else {
      res.status(500).json(err);
    }
  });
};
