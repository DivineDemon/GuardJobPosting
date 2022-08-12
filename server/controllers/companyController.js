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
    const { name, phone, email, password } = req.body;
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

const updateCompanyDeviceID = (req, res) => {
  try {
    const { id } = req.params;
    const { device_id } = req.body;
    connection.query(
      `UPDATE company SET companyDeviceId='${device_id}' WHERE companyID=${id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Company Device ID Updated Successfully!",
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

const updateCompanyStatus = (req, res) => {
  try {
    const { company_id, status } = req.params;
    connection.query(
      `UPDATE company SET comStatus='${status}' WHERE companyID=${company_id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Company Status Updated Successfully!",
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

module.exports = {
  getCompanies,
  getCompany,
  deleteCompany,
  updateCompany,
  updateCompanyDeviceID,
  updateCompanyStatus,
};
