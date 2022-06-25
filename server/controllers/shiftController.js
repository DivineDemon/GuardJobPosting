const { connection } = require("../db");

const getShift = (req, res) => {
  const { id } = req.params; // shift ID
  connection.query(`SELECT * FROM shift WHERE shiftID=${id}`, (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500);
      throw new Error(err);
    }
  });
};

const getGuardShifts = (req, res) => {
  const { guard_id } = req.params;
  connection.query(
    `SELECT * FROM shift WHERE fk_guard=${guard_id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json(rows);
      } else {
        res.status(500);
        throw new Error(err);
      }
    }
  );
};

const getJobShifts = (req, res) => {
  const { job_id } = req.params;
  connection.query(
    `SELECT * FROM shift WHERE fk_job=${job_id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json(rows);
      } else {
        res.status(500);
        throw new Error(err);
      }
    }
  );
};

const addShift = (req, res) => {
  const { startTime, endTime, date } = req.body;
  const { job_id, guard_id } = req.params;
  connection.query(
    `INSERT INTO shift (startTime, endTime, date, fk_job, fk_guard) VALUES ('${startTime}', '${endTime}', '${date}', ${job_id}, ${guard_id})`,
    (err, rows, fields) => {
      if (!err) {
        res
          .status(201)
          .json({ message: "Data Inserted Successfully!", data: rows });
      } else {
        res.status(500);
        throw new Error(err);
      }
    }
  );
};

const deleteShift = (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM shift WHERE shiftID=${id}`, (err, rows) => {
    if (!err) {
      res.status(201).json({ message: "Shift Deleted Successfully!" });
    } else {
      res.status(500);
      throw new Error(err);
    }
  });
};

const updateShift = (req, res) => {
  const { shift_id, job_id, guard_id } = req.params;
  const { startTime, endTime, date } = req.body;
  connection.query(
    `UPDATE shift SET startTime='${startTime}', endTime='${endTime}', date='${date}', fk_job=${job_id}, fk_guard=${guard_id} WHERE shiftID=${shift_id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json({ message: "Shift Updated Successfully!" });
      } else {
        res.status(500);
        throw new Error(err);
      }
    }
  );
};

module.exports = {
  getShifts,
  getShift,
  addShift,
  deleteShift,
  updateShift,
};
