const { connection } = require("../db");
const { sendNotification } = require("../notifications/firebase");

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
    const { date, flag } = req.body;
    if (flag) {
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
              success: true,
              data: [],
            });
          }
        }
      );
    } else {
      connection.query(
        `SELECT * FROM shift WHERE fk_guard=${guard_id} AND date < '${date}'`,
        (err, rows) => {
          if (!err) {
            res.status(200).json({
              success: true,
              message: "Successfully Retrieved All Past Guard Shifts!",
              data: rows,
            });
          } else {
            res.status(404).json({
              success: true,
              data: [],
            });
          }
        }
      );
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCompanyShifts = (req, res) => {
  try {
    const { company_id } = req.params;
    const { isBooked } = req.body;
    connection.query(
      `SELECT * FROM shift WHERE isBooked=${isBooked} AND comfk=${company_id}`,
      (err, rows) => {
        if (!err) {
          const shifts = [];
          rows.forEach((row, i) => {
            const shift = {
              shiftID: rows[i].shiftID,
              shiftStartTime: rows[i].startTime,
              shiftEndTime: rows[i].endTime,
              shiftDate: rows[i].date,
              isBooked: rows[i].isBooked,
              fk_job: rows[i].fk_job,
              fk_guard: rows[i].fk_guard,
            };
            shifts.push(shift);
          });

          res.status(200).json({
            success: true,
            message: "Successfully Retrieved Company Shifts!",
            shifts,
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
    const { job_id, company_id } = req.params;
    connection.query(
      `INSERT INTO shift (startTime, endTime, date, fk_job, comfk) VALUES ('${startTime}', '${endTime}', '${date}', ${job_id}, ${company_id})`,
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
        if (err || rows.length === 0) {
          res.status(404).json({
            success: false,
            message: "Applied Shifts Not Found!",
            guard: {},
          });
        } else {
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
          connection.query(
            "SELECT guardDeviceId from guard WHERE guardID IN (?)",
            [guard_id],
            (err, rowss) => {
              if (!err) {
                message = {
                  notification: {
                    title: "Shift Approval",
                    body: "Shift Approved Successfully!",
                  },
                  device_id: rowss[0].guardDeviceId,
                };
                sendNotification(message);
                res.status(200).json({
                  success: true,
                  message: `Successfully Approved Shift!`,
                });
              } else {
                res.status(404).json({
                  success: false,
                  message: "Guard Not Found!",
                });
              }
            }
          );
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
    connection.query("SELECT * FROM shift WHERE isBooked=1", (err, rows) => {
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
  getCompanyShifts,
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
