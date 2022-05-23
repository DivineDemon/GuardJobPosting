import { connection } from "../db.js";

export const getDocuments = (req, res) => {
  connection.query("SELECT * FROM document", (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500).json(err);
    }
  });
};

export const getDocument = (req, res) => {
  connection.query(
    `SELECT * FROM document WHERE documentID=${req.params.id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json(rows);
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const addDocument = (req, res) => {
  const { id } = req.params; // guard ID
  const {
    four82,
    pcr,
    cpr,
    crowdcontrol,
    license,
    firearms,
    firstaid,
    medicare,
    others,
    passport,
    responsiblealcohol,
    visa,
    whitecard,
    yellowcard,
    workingwithchildren,
  } = req.body;
  connection.query(
    `INSERT INTO document (four82, PCR, CPR, CrowdControl, License, Firearms, FirstAid, MediCare, Others, Passport, ResponsibleAlcohol, Visa, WhiteCard, YellowCard, WorkingWithChildren, fk_guard) VALUES ('${four82}', '${pcr}', '${cpr}', '${crowdcontrol}', '${license}', '${firearms}', '${firstaid}', '${medicare}', '${others}', '${passport}', '${responsiblealcohol}', '${visa}', '${whitecard}', '${yellowcard}', '${workingwithchildren}', ${id})`,
    (err, rows, fields) => {
      if (!err) {
        res.status(201).json({
          message: "Data Inserted Successfully!",
          data: rows,
          id: rows.insertId,
        });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const deleteDocument = (req, res) => {
  const { id } = req.params;
  connection.query(
    `DELETE FROM document WHERE documentID=${id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json({ message: "Document Deleted Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const updateDocument = (req, res) => {
  const { document_id, guard_id } = req.params;
  const {
    four82,
    pcr,
    cpr,
    crowdcontrol,
    license,
    firearms,
    firstaid,
    medicare,
    others,
    passport,
    responsiblealcohol,
    visa,
    whitecard,
    yellowcard,
    workingwithchildren,
  } = req.body;
  connection.query(
    `UPDATE document SET four82='${four82}', PCR='${pcr}', CPR='${cpr}', CrowdControl='${crowdcontrol}', License='${license}', Firearms='${firearms}', FirstAid='${firstaid}', MediCare='${medicare}', Others='${others}', Passport='${passport}', ResponsibleAlcohol='${responsiblealcohol}', Visa='${visa}', WhiteCard='${whitecard}', YellowCard='${yellowcard}', WorkingWithChildren='${workingwithchildren}', fk_guard=${id} WHERE documentID=${id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json({ message: "Document Updated Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};
