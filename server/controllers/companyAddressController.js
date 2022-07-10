const { connection } = require("../db");

const getCompanyAddresses = (req, res) => {
  try {
    connection.query("SELECT * FROM companyaddress", (err, rows) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Company Addresses Retrieved Successfully!",
          data: rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Company Addresses Not Found!",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCompanyAddress = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM companyaddress WHERE companyAddressId=${req.params.id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Company Address Retrieved Successfully!",
            data: rows,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Company Address Not Found!",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addCompanyAddress = (req, res) => {
  try {
    const { company_id } = req.params; // company ID
    const { state, city, postalCode } = req.body;
    connection.query(
      `INSERT INTO companyaddress (state, city, postalCode, fk_company) VALUES ('${state}', '${city}', '${postalCode}', ${company_id})`,
      (err, rows, fields) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Company Address Inserted Successfully!",
            id: rows.insertId,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Company Address Insertion Failed!",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCompanyAddress = (req, res) => {
  try {
    const { id } = req.params;
    connection.query(
      `DELETE FROM companyaddress WHERE companyAddressId=${id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Company Address Deleted Successfully!",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Company Address Not Found!",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCompanyAddress = (req, res) => {
  try {
    const { address_id, company_id } = req.params;
    connection.query(
      `UPDATE companyaddress SET state='${req.body.state}', city='${req.body.city}', postalCode='${req.body.postalCode}', fk_company=${company_id} WHERE companyAddressId=${address_id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Company Address Updated Successfully!",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Company Address Not Found!",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCompanyAddresses,
  getCompanyAddress,
  addCompanyAddress,
  deleteCompanyAddress,
  updateCompanyAddress,
};
