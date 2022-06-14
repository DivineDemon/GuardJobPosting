const { connection } = require("../db");

const getOtherdocs = (req, res) => {
  connection.query("SELECT * FROM otherdocs", (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500).json(err);
    }
  });
};

const getOtherdoc = (req, res) => {
  connection.query(
    `SELECT * FROM otherdocs WHERE otherDocsID=${req.params.id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json(rows);
      } else {
        res.status(500).json(err);
      }
    }
  );
};

const addOtherdocs = (req, res) => {
  const { name, document } = req.body;
  const { guard_id } = req.params; // guard ID
  connection.query(
    `INSERT INTO otherdocs (otherDocName, document, fk_guard) VALUES ('${name}', '${document}', ${guard_id})`,
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

const deleteOtherdocs = (req, res) => {
  const { id } = req.params;
  connection.query(
    `DELETE FROM otherdocs WHERE otherDocsID=${id}`,
    (err, rows) => {
      if (!err) {
        res
          .status(201)
          .json({ message: "Other Documents Deleted Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

const updateOtherdocs = (req, res) => {
  const { document_id, guard_id } = req.params;
  const { name, document } = req.body;
  connection.query(
    `UPDATE otherdocs SET otherDocName='${name}', document='${document}', fk_guard=${guard_id} WHERE otherDocsID=${document_id}`,
    (err, rows) => {
      if (!err) {
        res
          .status(201)
          .json({ message: "Other Documents Updated Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

module.exports = {
  getOtherdocs,
  getOtherdoc,
  addOtherdocs,
  deleteOtherdocs,
  updateOtherdocs,
};
