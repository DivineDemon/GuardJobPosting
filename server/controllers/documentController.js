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
                      message: "Data Updated Successfully!",
                      data: {
                        four82: rows[0].four82 || null,
                        CPR: rows[0].CPR || null,
                        CrowdControl: rows[0].CrowdControl || null,
                        Firearms: rows[0].Firearms || null,
                        FirstAid: rows[0].FirstAid || null,
                        License: rows[0].License || null,
                        MediCare: rows[0].MediCare || null,
                        Passport: rows[0].Passport || null,
                        PCR: rows[0].PCR || null,
                        ResponsibleAlcohol: rows[0].ResponsibleAlcohol || null,
                        Visa: rows[0].Visa || null,
                        WhiteCard: rows[0].WhiteCard || null,
                        WorkingWithChildren:
                          rows[0].WorkingWithChildren || null,
                        YellowCard: rows[0].YellowCard || null,
                      },
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
                      message: "Data Inserted Successfully!",
                      data: {
                        four82: rows[0].four82 || null,
                        CPR: rows[0].CPR || null,
                        CrowdControl: rows[0].CrowdControl || null,
                        Firearms: rows[0].Firearms || null,
                        FirstAid: rows[0].FirstAid || null,
                        License: rows[0].License || null,
                        MediCare: rows[0].MediCare || null,
                        Passport: rows[0].Passport || null,
                        PCR: rows[0].PCR || null,
                        ResponsibleAlcohol: rows[0].ResponsibleAlcohol || null,
                        Visa: rows[0].Visa || null,
                        WhiteCard: rows[0].WhiteCard || null,
                        WorkingWithChildren:
                          rows[0].WorkingWithChildren || null,
                        YellowCard: rows[0].YellowCard || null,
                      },
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
        res.status(201).json({ message: "Document Deleted Successfully!" });
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
