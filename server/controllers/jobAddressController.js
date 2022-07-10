const { connection } = require("../db");

const getJobAddresses = (req, res) => {
  try {
    connection.query("SELECT * FROM jobaddress", (err, rows) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Successfully Retrieved All Job Addresses!",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Job Addresses Not Found!",
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

const getJobAddress = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM jobaddress WHERE jobAddressId=${req.params.id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Successfully Retrieved Job Address!",
            data: rows,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Job Address Not Found!",
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

const addJobAddress = (req, res) => {
  try {
    const { job_id } = req.params; // job ID
    const { state, city, postalCode } = req.body;
    connection.query(
      `INSERT INTO jobaddress (state, city, postalCode, fk_job) VALUES ('${state}', '${city}', '${postalCode}', ${job_id})`,
      (err, rows, fields) => {
        if (!err) {
          res.status(201).json({
            success: true,
            message: "Job Address Inserted Successfully!",
            data: req.body,
            id: rows.insertId,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Job Address Insertion Failure!",
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

const deleteJobAddress = (req, res) => {
  try {
    const { id } = req.params;
    connection.query(
      `DELETE FROM jobaddress WHERE jobAddressId=${id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Job Address Deleted Successfully!",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Job Address Not Found!",
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

const updateJobAddress = (req, res) => {
  try {
    const { address_id, job_id } = req.params;
    connection.query(
      `UPDATE jobaddress SET state='${req.body.state}', city='${req.body.city}', postalCode='${req.body.postalCode}', fk_job=${job_id} WHERE jobAddressId=${address_id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Job Address Updated Successfully!",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Job Address Not Found!",
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
  getJobAddresses,
  getJobAddress,
  addJobAddress,
  deleteJobAddress,
  updateJobAddress,
};
