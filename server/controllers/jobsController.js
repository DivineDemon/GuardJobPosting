import { connection } from "../db.js";

export const getJobs = (req, res) => {
  const { id } = req.params; // job ID
  connection.query(
    `SELECT jobs.jobsID, jobs.jobName, jobs.lat, jobs.lng, jobs.description, jobs.payrate, jobs.documentList, shift.shiftID, shift.startTime, shift.endTime, shift.date, shift.isBooked FROM jobs INNER JOIN shift WHERE shift.fk_job = jobs.jobsID`,
    (err, rows) => {
      if (!err) {
        const jobs = [];
        const shifts = [];
        rows.forEach((row, i) => {
          const job = {
            jobID: rows[i].jobsID,
            name: rows[i].jobName,
            lat: rows[i].lat,
            lng: rows[i].lng,
            description: rows[i].description,
            payrate: rows[i].payrate,
            documentList: rows[i].documentList,
          };
          jobs.push(job);

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
          schedule: {
            jobs,
            shifts,
          },
        });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const getJob = (req, res) => {
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

export const addJob = (req, res) => {
  const { company_id, address_id } = req.params;
  const { name, location, description, payrate, documentList, shifts } =
    req.body;
  connection.query(
    `INSERT INTO jobs (jobName, location, description, payrate, documentList, shifts, company_fk, addressfk) VALUES ('${name}', '${location}', '${description}', ${payrate}, '${documentList}', '${shifts}', ${company_id}, ${address_id})`,
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
  const { id, company_id, address_id } = req.params;
  const { name, location, description, payrate, documentList, shifts } =
    req.body;
  connection.query(
    `UPDATE jobs SET name='${name}', location='${location}', description='${description}', payrate=${payrate}, documentList='${documentList}', shifts='${shifts}', companyfk=${company_id}, addressfk=${address_id} WHERE jobsID=${id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json({ message: "Job Updated Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};
