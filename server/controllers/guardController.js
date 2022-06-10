import { connection } from "../db.js";

export const getGuards = (req, res) => {
  const { status } = req.params;
  connection.query(`SELECT * FROM guard WHERE status='${status}'`, (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500).json(err);
    }
  });
};

export const getGuard = (req, res) => {
  connection.query(
    `SELECT * FROM guard WHERE guardID=${req.params.id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json(rows);
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const deleteGuard = (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM guard WHERE guardID=${id}`, (err, rows) => {
    if (!err) {
      res.status(201).json({ message: "Guard Deleted Successfully!" });
    } else {
      res.status(500).json(err);
    }
  });
};

export const updateGuard = (req, res) => {
  const { guard_id, address_id, admin_id, status } = req.params;
  connection.query(
    `UPDATE guard SET firstName='${req.body.firstName}', middleName='${req.body.middleName}', lastName='${req.body.lastName}', email='${req.body.email}', password='${req.body.password}', phone='${req.body.phone}', dob='${req.body.dob}', gender='${req.body.gender}', emergencyContact='${req.body.emergencyContact}', admin_id=${admin_id}, status='${status}' address_id=${address_id} WHERE guardID=${guard_id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json({ message: "Guard Updated Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const updateGuardStatus = (req, res) => {
  const { guard_id, admin_id, status } = req.params;
  connection.query(
    `UPDATE guard SET admin_id=${admin_id}, status='${status}' WHERE guardID=${guard_id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json({ message: "Guard Status Updated Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};