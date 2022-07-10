const { connection } = require("../db");

const getShift = (req, res) => {
  try {
    const { id } = req.params; // shift ID
    connection.query(`SELECT * FROM shift WHERE shiftID=${id}`, (err, rows) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Successfully Retrieved Shift!",
          data: rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Shift Not Found!",
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

const getGuardShifts = (req, res) => {
  try {
    const { guard_id } = req.params;
    connection.query(
      `SELECT * FROM shift WHERE fk_guard=${guard_id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Successfully Retrieved All Guard Shifts!",
            data: rows,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Guard Shifts Not Found!",
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

const getJobShifts = (req, res) => {
  try {
    const { job_id } = req.params;
    connection.query(
      `SELECT * FROM shift WHERE fk_job=${job_id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Successfully Retrieved All Job Shifts!",
            data: rows,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Job Shifts Not Found!",
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

const addShift = (req, res) => {
  try {
    const { startTime, endTime, date } = req.body;
    const { job_id } = req.params;
    connection.query(
      `INSERT INTO shift (startTime, endTime, date, fk_job) VALUES ('${startTime}', '${endTime}', '${date}', ${job_id})`,
      (err, rows, fields) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Data Inserted Successfully!",
            data: rows,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Shift Insertion Failure!",
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

const deleteShift = (req, res) => {
  try {
    const { id } = req.params;
    connection.query(`DELETE FROM shift WHERE shiftID=${id}`, (err, rows) => {
      if (!err) {
        res
          .status(200)
          .json({ success: true, message: "Shift Deleted Successfully!" });
      } else {
        res.status(404).json({
          success: false,
          message: "Shift Not Found!",
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

const updateShift = (req, res) => {
  try {
    const { shift_id, job_id, guard_id } = req.params;
    const { startTime, endTime, date } = req.body;
    connection.query(
      `UPDATE shift SET startTime='${startTime}', endTime='${endTime}', date='${date}', fk_job=${job_id}, fk_guard=${guard_id} WHERE shiftID=${shift_id}`,
      (err, rows) => {
        if (!err) {
          res
            .status(200)
            .json({ success: true, message: "Shift Updated Successfully!" });
        } else {
          res.status(404).json({
            success: false,
            message: "Shift Not Found!",
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

const applyShift = (req, res) => {
  try {
    const { job_id, guard_id } = req.params;
    const shifts = req.body;

    shifts.map((shift) => {
      connection.query(
        `INSERT INTO jobrequest (fk_guard, fk_job, fk_shift) VALUES (${guard_id}, ${job_id}, ${shift})`,
        (err, rows) => {
          if (!err) {
            res.status(201).json({
              success: true,
              message: "Successfully Applied for Shift!",
              jobRequestId: rows.insertId,
            });
          } else {
            res.status(400).json({
              success: false,
              message: "Job Applying Failure!",
            });
          }
        }
      );
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getGuardShifts,
  getJobShifts,
  getShift,
  addShift,
  deleteShift,
  updateShift,
  applyShift,
};
