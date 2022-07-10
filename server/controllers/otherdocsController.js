const { connection } = require("../db");

const getOtherdocs = (req, res) => {
  try {
    connection.query("SELECT * FROM otherdocs", (err, rows) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Successfully Retrieved All Other Documents!",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Other Documents Not Found!",
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

const getOtherdoc = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM otherdocs WHERE otherDocsID=${req.params.id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Successfully Retrieved Other Docs!",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Other Documents Not Found!",
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

const addOtherdocs = (req, res) => {
  try {
    const { name, document } = req.body;
    const { guard_id } = req.params; // guard ID
    connection.query(
      `INSERT INTO otherdocs (otherDocName, document, fk_guard) VALUES ('${name}', '${document}', ${guard_id})`,
      (err, rows, fields) => {
        if (!err) {
          res.status(201).json({
            success: true,
            message: "Data Inserted Successfully!",
            data: req.body,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Other Document Insertion Failure!",
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

const deleteOtherdocs = (req, res) => {
  try {
    const { id } = req.params;
    connection.query(
      `DELETE FROM otherdocs WHERE otherDocsID=${id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Other Documents Deleted Successfully!",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Other Documents Not Found!",
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

const updateOtherdocs = (req, res) => {
  try {
    const { document_id, guard_id } = req.params;
    const { name, document } = req.body;
    connection.query(
      `UPDATE otherdocs SET otherDocName='${name}', document='${document}', fk_guard=${guard_id} WHERE otherDocsID=${document_id}`,
      (err, rows) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Other Documents Updated Successfully!",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Other Documents Not Found!",
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
  getOtherdocs,
  getOtherdoc,
  addOtherdocs,
  deleteOtherdocs,
  updateOtherdocs,
};
