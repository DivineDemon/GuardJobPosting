const { connection } = require("../db");

const getDocuments = (req, res) => {
  connection.query("SELECT * FROM document", (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500);
      throw new Error(err);
    }
  });
};

const getDocument = (req, res) => {
  connection.query(
    `SELECT * FROM document WHERE documentID=${req.params.id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json(rows);
      } else {
        res.status(500);
        throw new Error(err);
      }
    }
  );
};

const addDocument = (req, res) => {
  const { guard_id } = req.params; // guard ID
  const { document_name, base_64 } = req.body; // document name and base 64
  connection.query(
    `SELECT * FROM document WHERE fk_guard=${guard_id}`,
    (err, rows) => {
      if (rows.length > 0) {
        connection.query(
          `UPDATE document SET ${document_name} = '${base_64}' WHERE fk_guard=${guard_id}`,
          (err, rows) => {
            if (!err) {
              connection.query(
                `SELECT * FROM document WHERE fk_guard=${guard_id}`,
                (err, rows) => {
                  if (!err) {
                    res.status(201).json({
                      success: true,
                      message: "Data Updated Successfully!",
                      id: rows.insertId,
                    });
                  }
                }
              );
            } else {
              res.status(500);
              throw new Error(err);
            }
          }
        );
      } else {
        connection.query(
          `INSERT INTO document (${document_name}, fk_guard) VALUES ('${base_64}', ${guard_id})`,
          (err, rows) => {
            if (!err) {
              connection.query(
                `SELECT * FROM document WHERE fk_guard=${guard_id}`,
                (err, rows) => {
                  if (!err) {
                    res.status(201).json({
                      success: true,
                      message: "Data Inserted Successfully!",
                      id: rows.insertId,
                    });
                  }
                }
              );
            } else {
              res.status(500);
              throw new Error(err);
            }
          }
        );
      }
    }
  );
};

const deleteDocument = (req, res) => {
  const { id } = req.params;
  connection.query(
    `DELETE FROM document WHERE documentID=${id}`,
    (err, rows) => {
      if (!err) {
        res
          .status(201)
          .json({ success: true, message: "Document Deleted Successfully!" });
      } else {
        res.status(500);
        throw new Error(err);
      }
    }
  );
};

module.exports = {
  getDocuments,
  getDocument,
  addDocument,
  deleteDocument,
};
