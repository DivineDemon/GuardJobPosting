import { connection } from "../db.js";

export const getShifts = (req, res) => {
  connection.query("SELECT * FROM shift", (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500).json(err);
    }
  });
};

export const addShift = (req, res) => {
  const { startTime, endTime, date } = req.body;
  connection.query(
    `INSERT INTO shift (startTime, endTime, date) VALUES ('${startTime}', '${endTime}', '${date}')`,
    (err, rows, fields) => {
      if (!err) {
        res
          .status(201)
          .json({ message: "Data Inserted Successfully!", data: rows });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const deleteShift = (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM shift WHERE id='${id}'`, (err, rows) => {
    if (!err) {
      res.status(201).json({ message: "Shift Deleted Successfully!" });
    } else {
      res.status(500).json(err);
    }
  });
};
