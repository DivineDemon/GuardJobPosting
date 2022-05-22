import { connection } from "../db.js";

export const getJobs = (req, res) => {
  const { id } = req.params; // job ID
  connection.query(
    `SELECT jobs.jobsID, jobs.jobName, jobs.lat, jobs.lng, jobs.description, jobs.payrate, jobs.documentList, shift.shiftID, shift.startTime, shift.endTime, shift.date, shift.isBooked FROM jobs INNER JOIN shift ON jobs.jobsID = ${id}`,
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
          };
          shifts.push(shift);
        });
        res.status(201).json({
          status: true,
          message: "Succesfully Retrieved Jobs Data!",
          job: {
            ID: rows[0].jobsID,
            name: rows[0].jobName,
            lat: rows[0].lat,
            lng: rows[0].lng,
            description: rows[0].description,
            payrate: rows[0].payrate,
            documentList: rows[0].documentList,
          },
          shifts,
        });
      } else {
        res.status(500).json(err);
      }
    }
  );
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
