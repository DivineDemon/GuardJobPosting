import { connection } from "../db.js";

export const getJobs = (req, res) => {
  connection.query("SELECT * FROM jobs", (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500).json(err);
    }
  });
};

export const getJob = (req, res) => {
  connection.query(
    `SELECT * FROM jobs WHERE jobsID=${req.params.id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json(rows);
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const addJob = (req, res) => {
  const { name, location, description, payrate, documentList, shifts } =
    req.body;
  connection.query(
    `INSERT INTO jobs (jobName, location, description, payrate, documentList, shifts) VALUES ('${name}', '${location}', '${description}', ${payrate}, '${documentList}', '${shifts}')`,
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

export const deleteJob = (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM jobs WHERE jobsID=${id}`, (err, rows) => {
    if (!err) {
      res.status(201).json({ message: "Job Deleted Successfully!" });
    } else {
      res.status(500).json(err);
    }
  });
};

export const updateJob = (req, res) => {
  const { id } = req.params;
  const { name, location, description, payrate, documentList, shifts } =
    req.body;
  connection.query(
    `UPDATE jobs SET name='${name}', location='${location}', description='${description}', payrate=${payrate}, documentList='${documentList}', shifts='${shifts}' WHERE jobsID=${id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json({ message: "Job Updated Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};
