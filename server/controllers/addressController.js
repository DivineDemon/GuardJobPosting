import { connection } from "../db.js";

export const getAddresses = (req, res) => {
  connection.query("SELECT * FROM address", (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500).json(err);
    }
  });
};

export const getAddress = (req, res) => {
  connection.query(
    `SELECT * FROM address WHERE addressID=${req.params.id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json(rows);
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const addAddress = (req, res) => {
  const { state, city, postalCode } = req.body;
  connection.query(
    `INSERT INTO address (state, city, postalCode) VALUES ('${state}', '${city}', '${postalCode}')`,
    (err, rows, fields) => {
      if (!err) {
        res.status(201).json({
          success: true,
          message: "Address Inserted Successfully!",
          data: rows,
        });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const deleteAddress = (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM address WHERE addressID=${id}`, (err, rows) => {
    if (!err) {
      res.status(201).json({ message: "Address Deleted Successfully!" });
    } else {
      res.status(500).json(err);
    }
  });
};
