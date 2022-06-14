const { connection } = require("../db");

const getCompanies = (req, res) => {
  connection.query("SELECT * FROM company", (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500).json(err);
    }
  });
};

const getCompany = (req, res) => {
  connection.query(
    `SELECT * FROM company WHERE companyID=${req.params.id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json(rows);
      } else {
        res.status(500).json(err);
      }
    }
  );
};

const deleteCompany = (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM company WHERE companyID=${id}`, (err, rows) => {
    if (!err) {
      res.status(201).json({ message: "Company Deleted Successfully!" });
    } else {
      res.status(500).json(err);
    }
  });
};

const updateCompany = (req, res) => {
  const { id } = req.params;
  connection.query(
    `UPDATE company SET name='${name}', phone='${phone}', email='${email}', password='${password}' WHERE companyID=${id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json({ message: "Company Updated Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

module.exports = {
  getCompanies,
  getCompany,
  deleteCompany,
  updateCompany,
};
