import { connection } from "../db.js";

export const getGuardAddresses = (req, res) => {
  connection.query("SELECT * FROM guardaddress", (err, rows) => {
    if (!err) {
      res.status(201).json(rows);
    } else {
      res.status(500).json(err);
    }
  });
};

export const getGuardAddress = (req, res) => {
  connection.query(
    `SELECT * FROM guardaddress WHERE guardAddressId=${req.params.id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json(rows);
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const addGuardAddress = (req, res) => {
  const { state, city, postalCode } = req.body;
  const { guard_id } = req.params;
  connection.query(
    `INSERT INTO guardaddress (state, city, postalCode, fk_guard) VALUES ('${state}', '${city}', '${postalCode}', ${guard_id})`,
    (err, rows, fields) => {
      if (!err) {
        res.status(201).json({
          success: true,
          message: "Guard Address Inserted Successfully!",
          data: rows,
          id: rows.insertId,
        });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const deleteGuardAddress = (req, res) => {
  const { id } = req.params;
  connection.query(
    `DELETE FROM guardaddress WHERE guardAddressId=${id}`,
    (err, rows) => {
      if (!err) {
        res
          .status(201)
          .json({ message: "Guard Address Deleted Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const updateGuardAddress = (req, res) => {
  const { address_id, guard_id } = req.params;
  connection.query(
    `UPDATE guardaddress SET state='${req.body.state}', city='${req.body.city}', postalCode='${req.body.postalCode}', fk_guard=${guard_id} WHERE guardAddressId=${address_id}`,
    (err, rows) => {
      if (!err) {
        res
          .status(201)
          .json({ message: "Guard Address Updated Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};
