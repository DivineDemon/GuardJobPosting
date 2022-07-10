const { connection } = require("../db");

const getCompanies = (req, res) => {
  try {
    connection.query("SELECT * FROM company", (err, rows) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Successfully Retrieved All Companies!",
          data: rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Companies Not Found!",
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

const getCompany = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM company WHERE companyID=${req.params.id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Successfully Retrieved Company!",
            data: rows,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Company Not Found!",
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

const deleteCompany = (req, res) => {
  try {
    const { id } = req.params;
    connection.query(
      `DELETE FROM company WHERE companyID=${id}`,
      (err, rows) => {
        if (!err) {
          res
            .status(200)
            .json({ success: true, message: "Company Deleted Successfully!" });
        } else {
          res.status(404).json({
            success: false,
            message: "Company Not Found!",
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

const updateCompany = (req, res) => {
  try {
    const { id } = req.params;
    connection.query(
      `UPDATE company SET name='${name}', phone='${phone}', email='${email}', password='${password}' WHERE companyID=${id}`,
      (err, rows) => {
        if (!err) {
          res
            .status(200)
            .json({ success: true, message: "Company Updated Successfully!" });
        } else {
          res.status(404).json({
            success: false,
            message: "Company Not Found!",
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
  getCompanies,
  getCompany,
  deleteCompany,
  updateCompany,
};
