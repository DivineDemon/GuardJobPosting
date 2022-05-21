import { connection } from "../db.js";

export const getJobAddresses = (req, res) => {
  connection.query("SELECT * FROM jobaddress", (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500).json(err);
    }
  });
};

export const getJobAddress = (req, res) => {
  connection.query(
    `SELECT * FROM jobaddress WHERE jobAddressId=${req.params.id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json(rows);
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const addJobAddress = (req, res) => {
  const { state, city, postalCode } = req.body;
  connection.query(
    `INSERT INTO jobaddress (state, city, postalCode) VALUES ('${state}', '${city}', '${postalCode}')`,
    (err, rows, fields) => {
      if (!err) {
        res.status(201).json({
          success: true,
          message: "Job Address Inserted Successfully!",
          data: rows,
          id: rows.insertId,
        });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const deleteJobAddress = (req, res) => {
  const { id } = req.params;
  connection.query(
    `DELETE FROM jobaddress WHERE jobAddressId=${id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json({ message: "Job Address Deleted Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const updateJobAddress = (req, res) => {
  const { id } = req.params;
  connection.query(
    `UPDATE jobaddress SET state='${req.body.state}', city='${req.body.city}', postalCode='${req.body.postalCode}' WHERE jobAddressId=${id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json({ message: "Job Address Updated Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};
