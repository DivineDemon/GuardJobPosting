import { connection } from "../db.js";

export const getOtherdocs = (req, res) => {
  connection.query("SELECT * FROM otherdocs", (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500).json(err);
    }
  });
};

export const getOtherdoc = (req, res) => {
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

export const addOtherdocs = (req, res) => {
  const { name, document } = req.body;
  connection.query(
    `INSERT INTO otherdocs (name, document) VALUES ('${name}', '${document}')`,
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

export const deleteOtherdocs = (req, res) => {
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

export const updateOtherdocs = (req, res) => {
  const { id } = req.params;
  const { name, document } = req.body;
  connection.query(
    `UPDATE otherdocs SET name='${name}', document='${document}' WHERE otherDocsID=${id}`,
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
