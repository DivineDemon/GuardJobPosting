const { connection } = require("../db");

const getGuards = (req, res) => {
  try {
    const { status } = req.params;
    connection.query(
      `SELECT * FROM guard WHERE status='${status}'`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Successfully Retrieved Guards!",
            data: rows,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Guards Not Found!",
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

const getGuard = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM guard WHERE guardID=${req.params.id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Successfully Retrieved Guard!",
            data: rows,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Guard Not Found!",
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

const deleteGuard = (req, res) => {
  try {
    const { id } = req.params;
    connection.query(`DELETE FROM guard WHERE guardID=${id}`, (err, rows) => {
      if (!err) {
        res
          .status(200)
          .json({ success: true, message: "Guard Deleted Successfully!" });
      } else {
        res.status(404).json({
          success: false,
          message: "Guard Not Found!",
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

const updateGuard = (req, res) => {
  try {
    const { guard_id, address_id } = req.params;
    connection.query(
      `UPDATE guard SET firstName='${req.body.firstName}', middleName='${req.body.middleName}', lastName='${req.body.lastName}', email='${req.body.email}', password='${req.body.password}', phone='${req.body.phone}', dob='${req.body.dob}', gender='${req.body.gender}', emergencyContact='${req.body.emergencyContact}', status='${req.body.status}' address_id=${address_id} WHERE guardID=${guard_id}`,
      (err, rows) => {
        if (!err) {
          res
            .status(200)
            .json({ success: true, message: "Guard Updated Successfully!" });
        } else {
          res.status(404).json({
            success: false,
            message: "Guard Not Found!",
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

const updateGuardStatus = (req, res) => {
  try {
    const { guard_id, admin_id, status } = req.params;
    connection.query(
      `UPDATE guard SET admin_id=${admin_id}, status='${status}' WHERE guardID=${guard_id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Guard Status Updated Successfully!",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Guard Not Found!",
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

const updateGuardActiveStatus = (req, res) => {
  try {
    const { guard_id, status } = req.params;
    connection.query(
      `UPDATE guard SET status='${status}' WHERE guardID=${guard_id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Guard Status Updated Successfully!",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Guard Not Found!",
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

const updateGuardDeviceID = (req, res) => {
  try {
    const { guard_id } = req.params;
    const { device_id } = req.body;
    connection.query(
      `UPDATE guard SET guardDeviceId='${device_id}' WHERE guardID=${guard_id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Guard Device ID Updated Successfully!",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Guard Not Found!",
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
  getGuards,
  getGuard,
  deleteGuard,
  updateGuard,
  updateGuardStatus,
  updateGuardActiveStatus,
  updateGuardDeviceID,
};
