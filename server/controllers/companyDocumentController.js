const { connection } = require("../db");

const getCompanyDocuments = (req, res) => {
  try {
    connection.query("SELECT * FROM companyDocument", (err, rows) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Retrieved Company Documents Successfully!",
          data: rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Company Documents Not Found!",
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

const getCompanyDocument = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM companyDocument WHERE comDocID=${req.params.id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Company Document Retrieved Successfully!",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Company Document Not Found!",
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

const addCompanyDocument = (req, res) => {
  try {
    const { company_id } = req.params; // company ID
    const { document_name, base_64 } = req.body; // document name and base 64
    connection.query(
      `SELECT * FROM companyDocument WHERE com_fk=${company_id}`,
      (err, rows) => {
        if (rows.length > 0) {
          connection.query(
            `UPDATE companyDocument SET ${document_name} = '${base_64}' WHERE fk_guard=${company_id}`,
            (err, rows) => {
              if (!err) {
                connection.query(
                  `SELECT * FROM companyDocument WHERE fk_guard=${guard_id}`,
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
                  message: "Company Document Not Found!",
                });
              }
            }
          );
        } else {
          connection.query(
            `INSERT INTO companyDocument (${document_name}, fk_guard) VALUES ('${base_64}', ${company_id})`,
            (err, rows) => {
              if (!err) {
                connection.query(
                  `SELECT * FROM companyDocument WHERE fk_guard=${company_id}`,
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

const deleteCompanyDocument = (req, res) => {
  try {
    const { id } = req.params;
    connection.query(
      `DELETE FROM companyDocument WHERE comDocID=${id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Company Document Deleted Successfully!",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Company Document Not Found!",
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
  getCompanyDocuments,
  getCompanyDocument,
  addCompanyDocument,
  deleteCompanyDocument,
};
