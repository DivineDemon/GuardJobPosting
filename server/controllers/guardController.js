import { connection } from "../db.js";

export const getGuards = (req, res) => {
  connection.query("SELECT * FROM guard", (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500).json(err);
    }
  });
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
