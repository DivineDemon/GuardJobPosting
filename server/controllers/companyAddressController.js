const { connection } = require("../db");

const getCompanyAddresses = (req, res) => {
  connection.query("SELECT * FROM companyaddress", (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500).json(err);
    }
  });
};

const getCompanyAddress = (req, res) => {
  connection.query(
    `SELECT * FROM companyaddress WHERE companyAddressId=${req.params.id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json(rows);
      } else {
        res.status(500).json(err);
      }
    }
  );
};

const addCompanyAddress = (req, res) => {
  const { company_id } = req.params; // company ID
  const { state, city, postalCode } = req.body;
  connection.query(
    `INSERT INTO companyaddress (state, city, postalCode, fk_company) VALUES ('${state}', '${city}', '${postalCode}', ${company_id})`,
    (err, rows, fields) => {
      if (!err) {
        res.status(201).json({
          success: true,
          message: "Company Address Inserted Successfully!",
          data: rows,
          id: rows.insertId,
        });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

const deleteCompanyAddress = (req, res) => {
  const { id } = req.params;
  connection.query(
    `DELETE FROM companyaddress WHERE companyAddressId=${id}`,
    (err, rows) => {
      if (!err) {
        res
          .status(201)
          .json({ message: "Company Address Deleted Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

const updateCompanyAddress = (req, res) => {
  const { address_id, company_id } = req.params;
  connection.query(
    `UPDATE companyaddress SET state='${req.body.state}', city='${req.body.city}', postalCode='${req.body.postalCode}', fk_company=${company_id} WHERE companyAddressId=${address_id}`,
    (err, rows) => {
      if (!err) {
        res
          .status(201)
          .json({ message: "Company Address Updated Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

module.exports = {
  getCompanyAddresses,
  getCompanyAddress,
  addCompanyAddress,
  deleteCompanyAddress,
  updateCompanyAddress,
};
