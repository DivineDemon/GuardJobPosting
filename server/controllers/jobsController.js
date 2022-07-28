const { connection } = require("../db");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const rowsPerPage = process.env.ROWS || 25;

const getJobs = (req, res) => {
  connection.query("SELECT * FROM jobs", (err, rows) => {
    if (err) {
      res.status(500).json([{
        success: false,
        error: err.message,
      }]);
    } else if (!rows.length) {
      res.status(404).json([{
        success: true,
        message: "Jobs Not Found!",
        jobs: [],
      }]);
    } else {
      const numOfRows = rows.length;
      const numOfPages = Math.ceil(numOfRows / rowsPerPage);
      let page = req.query.page ? Number(req.query.page) : 1;
      if (page > numOfPages) {
        res.send("/?page=" + encodeURIComponent(numOfPages));
      } else if (page < 1) {
        res.send("/?page=" + encodeURIComponent("1"));
      }

      const startingLimit = (page - 1) * rowsPerPage;
      connection.query(
        `SELECT * FROM jobs LIMIT ${startingLimit}, ${rowsPerPage}`,
        (err, rows) => {
          if (err) {
            res.status(404).json([{
              success: false,
              message: "Jobs Not Found!",
            }]);
          }

          let iterator = page - 5 < 1 ? 1 : page - 5;
          let endingLink =
            iterator + 9 <= numOfPages ? iterator + 9 : page + numOfPages;
          if (endingLink < page + 4) {
            iterator -= page + 4 - numOfPages;
          }

          res.json({
            success: true,
            message: "Successfully Retrieved All Jobs!",
            jobs: [rows],
          });
        }
      );
    }
  });
};

const getJob = (req, res) => {
  try {
    const { id } = req.params; // job ID
    connection.query(
      `SELECT jobs.jobsID, jobs.jobName, jobs.description, jobs.payrate, jobs.documentList, jobs.lat, jobs.lng, jobaddress.state, jobaddress.city, jobaddress.postalCode, shift.shiftID, shift.date, shift.startTime, shift.endTime, shift.isBooked, shift.fk_job, shift.fk_guard FROM jobs INNER JOIN jobaddress ON jobaddress.fk_job = jobs.jobsID INNER JOIN shift ON shift.fk_job = jobs.jobsID WHERE jobs.jobsID = ${id}`,
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
            message: "Succesfully Retrieved Job Data!",
            job: {
              ID: rows[0].jobsID,
              name: rows[0].jobName,
              lat: rows[0].lat,
              lng: rows[0].lng,
              description: rows[0].description,
              payrate: rows[0].payrate,
              documentList: rows[0].documentList,
              address: {
                state: rows[0].state,
                city: rows[0].city,
                postalCode: rows[0].postalCode,
                lat: rows[0].lat,
                lng: rows[0].lng,
              },
            },
            shifts,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Job Not Found!",
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

const getCompanyJobs = (req, res) => {
  try {
    const { company_id } = req.params; // job ID
    connection.query(
      `SELECT * FROM jobs WHERE company_fk = ${company_id}`,
      (err, rows) => {
        if (!err) {
          const jobs = [];
          rows.forEach((row, i) => {
            const job = {
              jobsID: rows[i].jobsID,
              jobName: rows[i].jobName,
              description: rows[i].description,
              payrate: rows[i].payrate,
              documentList: rows[i].documentList,
            };
            jobs.push(job);
          });
          res.status(200).json({
            success: true,
            message: "Succesfully Retrieved Jobs Data!",
            jobs,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Company Jobs Not Found!",
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

const addJob = (req, res) => {
  try {
    const { company_id } = req.params;
    const { jobName, description, payrate, documentList, lat, lng } = req.body;
    connection.query(
      `INSERT INTO jobs (jobName, description, payrate, documentList, company_fk, lat, lng) VALUES ('${jobName}', '${description}', ${payrate}, '${documentList}', ${company_id}, ${lat}, ${lng})`,
      (err, rows, fields) => {
        if (!err) {
          res.status(201).json({
            success: true,
            message: "Data Inserted Successfully!",
            id: rows.insertId,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Job Insertion Failure!",
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

const deleteJob = (req, res) => {
  try {
    const { id } = req.params;
    connection.query(`DELETE FROM jobs WHERE jobsID=${id}`, (err, rows) => {
      if (!err) {
        res
          .status(200)
          .json({ success: true, message: "Job Deleted Successfully!" });
      } else {
        res.status(404).json({
          success: false,
          message: "Job Not Found!",
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

const updateJob = (req, res) => {
  try {
    const { job_id, company_id, address_id } = req.params;
    const { name, location, description, payrate, documentList } = req.body;
    connection.query(
      `UPDATE jobs SET name='${name}', location='${location}', description='${description}', payrate=${payrate}, documentList='${documentList}', companyfk=${company_id}, addressfk=${address_id} WHERE jobsID=${job_id}`,
      (err, rows) => {
        if (!err) {
          res
            .status(200)
            .json({ success: true, message: "Job Updated Successfully!" });
        } else {
          res.status(404).json({
            success: false,
            message: "Job Not Found!",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getAppliedJobs = (req, res) => {
  try {
    const { job_id, guard_id } = req.params;
    connection.query(
      `SELECT * FROM jobrequest WHERE fk_job=${job_id} AND fk_guard=${guard_id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Successfully Retrieved Applied Jobs for Guard!",
            data: rows,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "No Jobs Applied For!",
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

module.exports = {
  getJobs,
  getJob,
  addJob,
  deleteJob,
  updateJob,
  getCompanyJobs,
  getAppliedJobs,
};
