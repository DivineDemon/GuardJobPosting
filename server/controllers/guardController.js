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

export const addGuard = (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    phone,
    dob,
    gender,
  } = req.body;
  connection.query(
    `INSERT INTO guard (firstName, middleName, lastName, email, password, phone, dob, gender) VALUES ('${firstName}', '${middleName}', '${lastName}', '${email}', '${password}', '${phone}', '${dob}', '${gender}')`,
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

export const deleteGuard = (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM guard WHERE id='${id}'`, (err, rows) => {
    if (!err) {
      res.status(201).json({ message: "Guard Deleted Successfully!" });
    } else {
      res.status(500).json(err);
    }
  });
};
