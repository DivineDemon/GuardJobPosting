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
              res.status(201).json({
                message: "Data Updated Successfully!",
                data: rows,
                id: rows.insertId,
              });
            } else {
              res.status(500).json(err);
            }
          }
        );
      } else {
        connection.query(
          `INSERT INTO document (${document_name}, fk_guard) VALUES ('${base_64}', ${guard_id})`,
          (err, rows) => {
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

// export const updateDocument = (req, res) => {
//   const { document_id, guard_id } = req.params;
//   const {
//     four82,
//     pcr,
//     cpr,
//     crowdcontrol,
//     license,
//     firearms,
//     firstaid,
//     medicare,
//     others,
//     passport,
//     responsiblealcohol,
//     visa,
//     whitecard,
//     yellowcard,
//     workingwithchildren,
//   } = req.body;
//   connection.query(
//     `UPDATE document SET four82='${four82}', PCR='${pcr}', CPR='${cpr}', CrowdControl='${crowdcontrol}', License='${license}', Firearms='${firearms}', FirstAid='${firstaid}', MediCare='${medicare}', Passport='${passport}', ResponsibleAlcohol='${responsiblealcohol}', Visa='${visa}', WhiteCard='${whitecard}', YellowCard='${yellowcard}', WorkingWithChildren='${workingwithchildren}', fk_guard=${guard_id} WHERE documentID=${document_id}`,
//     (err, rows) => {
//       if (!err) {
//         res.status(201).json({ message: "Document Updated Successfully!" });
//       } else {
//         res.status(500).json(err);
//       }
//     }
//   );
// };
