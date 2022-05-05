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
    `INSERT INTO document (four82, PCR, CPR, CrowdControl, License, Firearms, FirstAid, MediCare, Others, Passport, ResponsibleAlcohol, Visa, WhiteCard, YellowCard, WorkingWithChildren) VALUES ('${four82}', '${pcr}', '${cpr}', '${crowdcontrol}', '${license}', '${firearms}', '${firstaid}', '${medicare}', '${others}', '${passport}', '${responsiblealcohol}', '${visa}', '${whitecard}', '${yellowcard}', '${workingwithchildren}')`,
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
