const { connection } = require("../db");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const rowsPerPage = process.env.ROWS || 25;

const getJobs = (req, res) => {
  connection.query("SELECT * FROM jobs", (err, rows) => {
    if (err) {
      res.status(500);
      throw new Error(err);
    }

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
          res.status(500);
          throw new Error(err);
        }

        let iterator = page - 5 < 1 ? 1 : page - 5;
        let endingLink =
          iterator + 9 <= numOfPages ? iterator + 9 : page + numOfPages;
        if (endingLink < page + 4) {
          iterator -= page + 4 - numOfPages;
        }

        res.send(rows);
      }
    );
  });
};

const getJob = (req, res) => {
  const { id } = req.params; // job ID
  connection.query(`SELECT * FROM jobs WHERE jobsID = ${id}`, (err, rows) => {
    if (!err) {
      res.status(200).json({
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
      });
    } else {
      res.status(500);
      throw new Error(err);
    }
  });
};

const getCompanyJobs = (req, res) => {
  const { company_id } = req.params; // job ID
  connection.query(
    `SELECT * FROM jobs WHERE company_fk = ${company_id}`,
    (err, rows) => {
      if (!err) {
        res.status(200).json({
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
        });
      } else {
        res.status(500);
        throw new Error(err);
      }
    }
  );
};

const addJob = (req, res) => {
  const { company_id, address_id } = req.params;
  const { name, location, description, payrate, documentList, lat, lng } =
    req.body;
  connection.query(
    `INSERT INTO jobs (jobName, description, payrate, documentList, company_fk, addressfk, lat, lng) VALUES ('${name}', '${description}', ${payrate}, '${documentList}', ${company_id}, ${address_id}, ${lat}, ${lng})`,
    (err, rows, fields) => {
      if (!err) {
        stripe.charges.create(
          {
            source: req.body.tokenId,
            amount: 2,
            currency: "aud",
          },
          (stripeErr, stripeRes) => {
            if (stripeErr) {
              res.status(500);
              throw new Error(stripeErr);
            } else {
              res.status(200).json(stripeRes);
            }
          }
        );
        res.status(201).json({
          message: "Data Inserted Successfully!",
          id: rows.insertId,
        });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

const deleteJob = (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM jobs WHERE jobsID=${id}`, (err, rows) => {
    if (!err) {
      res.status(201).json({ message: "Job Deleted Successfully!" });
    } else {
      res.status(500).json(err);
    }
  });
};

const updateJob = (req, res) => {
  const { job_id, company_id, address_id } = req.params;
  const { name, location, description, payrate, documentList } = req.body;
  connection.query(
    `UPDATE jobs SET name='${name}', location='${location}', description='${description}', payrate=${payrate}, documentList='${documentList}', companyfk=${company_id}, addressfk=${address_id} WHERE jobsID=${job_id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json({ message: "Job Updated Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

module.exports = {
  getJobs,
  getJob,
  addJob,
  deleteJob,
  updateJob,
  getCompanyJobs,
};
