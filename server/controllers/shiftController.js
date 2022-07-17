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

const getAppliedShifts = (req, res) => {
  try {
    const { company_id } = req.params;
    connection.query(
      `SELECT shift.shiftID, shift.startTime, shift.endTime, shift.date, shift.isBooked, guard.guardID, guard.firstName, guard.middleName, guard.lastName, jobs.company_fk, jobs.jobsID, jobs.jobName, jobs.description, jobs.payrate, jobs.documentList, jobs.lat, jobs.lng FROM jobrequest INNER JOIN shift ON jobrequest.fk_shift = shift.shiftID INNER JOIN guard ON jobrequest.fk_guard = guard.guardID INNER JOIN jobs ON jobs.jobsID = jobrequest.fk_job WHERE shift.isBooked = 0 AND jobs.company_fk = ${company_id} GROUP BY shift.shiftID`,
      (err, rows) => {
        if (!err) {
          let guard = {};
          rows.forEach((row, i) => {
            guard = {
              guardID: rows[i].guardID,
              guardFirstName: rows[i].firstName,
              guardMiddleName: rows[i].middleName,
              guardLastName: rows[i].lastName,
              job: {
                jobID: rows[i].jobID,
                jobName: rows[i].jobName,
                jobDescription: rows[i].description,
                payrate: rows[i].payrate,
                documentList: rows[i].documentList,
                lat: rows[i].lat,
                lng: rows[i].lng,
                shift: [
                  {
                    shiftID: rows[i].shiftID,
                    shiftStartTime: rows[i].startTime,
                    shiftEndTime: rows[i].endTime,
                    shiftDate: rows[i].date,
                  },
                ],
              },
            };
          });
          res.status(200).json({
            success: true,
            message: "Successfully Retrieved Applied Shifts!",
            guard: [guard],
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

const approveShifts = (req, res) => {
  try {
    const { guard_id } = req.params;
    const { shiftIDs, isBooked } = req.body;
    connection.query(
      "UPDATE shift SET isBooked = ?, fk_guard = ? WHERE shiftID IN (?)",
      [isBooked, guard_id, shiftIDs],
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: `Successfully Approved Shift!`,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Shift Not Found!",
            error: err.message,
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

const getApprovedShifts = (req, res) => {
  try {
    connection.query(`SELECT * FROM shift WHERE isBooked=1`, (err, rows) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Successfully Retrieved All Approved Shifts!",
          data: rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Approved Shifts Not Found!",
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

module.exports = {
  getGuardShifts,
  getJobShifts,
  getShift,
  addShift,
  deleteShift,
  updateShift,
  applyShift,
  getAppliedShifts,
  approveShifts,
  getApprovedShifts,
};
