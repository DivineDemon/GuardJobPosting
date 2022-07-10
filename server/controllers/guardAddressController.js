const { connection } = require("../db");

const getGuardAddresses = (req, res) => {
  try {
    connection.query("SELECT * FROM guardaddress", (err, rows) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Successfully Retrieved Guard Addresses!",
          data: rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Guard Addresses Not Found!",
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

const getGuardAddress = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM guardaddress WHERE guardAddressId=${req.params.id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Successfully Retrieved Guard Address!",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Guard Address Not Found!",
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

const addGuardAddress = (req, res) => {
  try {
    const { state, city, postalCode } = req.body;
    const { guard_id } = req.params;
    connection.query(
      `INSERT INTO guardaddress (state, city, postalCode, fk_guard) VALUES ('${state}', '${city}', '${postalCode}', ${guard_id})`,
      (err, rows, fields) => {
        if (!err) {
          res.status(201).json({
            success: true,
            message: "Guard Address Inserted Successfully!",
            data: req.body,
            id: rows.insertId,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Guard Address Insertion Failure!",
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

const deleteGuardAddress = (req, res) => {
  try {
    const { id } = req.params;
    connection.query(
      `DELETE FROM guardaddress WHERE guardAddressId=${id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Guard Address Deleted Successfully!",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Guard Address Not Found!",
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

const updateGuardAddress = (req, res) => {
  try {
    const { address_id, guard_id } = req.params;
    connection.query(
      `UPDATE guardaddress SET state='${req.body.state}', city='${req.body.city}', postalCode='${req.body.postalCode}', fk_guard=${guard_id} WHERE guardAddressId=${address_id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Guard Address Updated Successfully!",
          });
        } else {
          res.status(404).json({
            success: true,
            message: "Guard Address Not Found!",
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
  getGuardAddresses,
  getGuardAddress,
  addGuardAddress,
  deleteGuardAddress,
  updateGuardAddress,
};
