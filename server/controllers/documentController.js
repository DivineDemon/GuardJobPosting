const { connection } = require("../db");

const getDocuments = (req, res) => {
  try {
    connection.query("SELECT * FROM document", (err, rows) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Retrieved Documents Successfully!",
          data: rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Documents Not Found!",
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

const getDocument = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM document WHERE documentID=${req.params.id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Document Retrieved Successfully!",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Document Not Found!",
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

const addDocument = (req, res) => {
  try {
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
                      res.status(200).json({
                        success: true,
                        message: "Data Updated Successfully!",
                        id: rows.insertId,
                      });
                    }
                  }
                );
              } else {
                res.status(404).json({
                  success: false,
                  message: "Document Not Found!",
                });
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
                res.status(400).json({
                  success: false,
                  message: "Document Insertion Failed!",
                });
              }
            }
          );
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

const deleteDocument = (req, res) => {
  try {
    const { id } = req.params;
    connection.query(
      `DELETE FROM document WHERE documentID=${id}`,
      (err, rows) => {
        if (!err) {
          res
            .status(200)
            .json({ success: true, message: "Document Deleted Successfully!" });
        } else {
          res.status(404).json({
            success: false,
            message: "Document Not Found!",
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
  getDocuments,
  getDocument,
  addDocument,
  deleteDocument,
};
