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
  const { job_id } = req.params; // job ID
  const { state, city, postalCode } = req.body;
  connection.query(
    `INSERT INTO jobaddress (state, city, postalCode, fk_job) VALUES ('${state}', '${city}', '${postalCode}', ${job_id})`,
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
  const { address_id, job_id } = req.params;
  connection.query(
    `UPDATE jobaddress SET state='${req.body.state}', city='${req.body.city}', postalCode='${req.body.postalCode}', fk_job=${job_id} WHERE jobAddressId=${address_id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json({ message: "Job Address Updated Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};
