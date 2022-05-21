import { connection } from "../db.js";

export const getCompanyAddresses = (req, res) => {
  connection.query("SELECT * FROM companyaddress", (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500).json(err);
    }
  });
};

export const getCompanyAddress = (req, res) => {
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

export const addCompanyAddress = (req, res) => {
  const { state, city, postalCode } = req.body;
  connection.query(
    `INSERT INTO companyaddress (state, city, postalCode) VALUES ('${state}', '${city}', '${postalCode}')`,
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

export const deleteCompanyAddress = (req, res) => {
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

export const updateCompanyAddress = (req, res) => {
  const { id } = req.params;
  connection.query(
    `UPDATE companyaddress SET state='${req.body.state}', city='${req.body.city}', postalCode='${req.body.postalCode}' WHERE companyAddressId=${id}`,
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
