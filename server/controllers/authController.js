import jwt from "jsonwebtoken";
import { connection } from "../db.js";

const SECRET = "guard-recruiting-app" || process.env.SECRET;

export const addGuard = (req, res) => {
  try {
    connection.query(
      `INSERT INTO guard (firstName, middleName, lastName, email, password, phone, dob, gender, emergencyContact) VALUES ('${req.body.firstName}', '${req.body.middleName}', '${req.body.lastName}', '${req.body.email}', '${req.body.password}', '${req.body.phone}', '${req.body.dob}', '${req.body.gender}', '${req.body.emergencyContact}')`,
      (err, rows, fields) => {
        if (!err) {
          res.status(201).json({
            success: true,
            data: {
              guard: {
                info: req.body,
              },
              address: {},
              documents: {},
              bank: {},
            },
          });
        } else {
          res.status(500).json(err);
        }
      }
    );
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

export const addCompany = (req, res) => {
  const { name, phone, email, password } = req.body;
  connection.query(
    `INSERT INTO company (name, phone, email, password) VALUES ('${name}', '${phone}', '${email}', '${password}')`,
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

export const loginAdmin = (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    if (isAdmin === 1) {
      connection.query(
        `SELECT * FROM admin WHERE email='${email}'`,
        function (err, rows) {
          if (!err && rows[0].password === password) {
            const accessToken = jwt.sign(
              {
                id: rows[0].adminID,
                isAdmin: rows[0].isAdmin,
              },
              SECRET,
              {
                expiresIn: "3d",
              }
            );
            res.status(201).json({
              success: true,
              message: "Admin Logged In!",
              id: rows[0].adminID,
              email: rows[0].email,
              password,
              accessToken,
            });
          } else {
            res
              .status(404)
              .json({ success: false, message: "Admin Not Found!" });
          }
        }
      );
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

export const loginGuard = (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    if (isAdmin === 0) {
      connection.query(
        `SELECT * FROM guard WHERE email='${email}'`,
        function (err, rows) {
          if (!err && rows[0].password === password) {
            const accessToken = jwt.sign(
              {
                id: rows[0].guardID,
                isAdmin: rows[0].isAdmin,
              },
              SECRET,
              {
                expiresIn: "3d",
              }
            );
            res.status(201).json({
              success: true,
              message: "Guard Logged In!",
              id: rows[0].guardID,
              email: rows[0].email,
              password: rows[0].password,
              accessToken,
            });
          } else {
            res
              .status(404)
              .json({ success: false, message: "Guard Not Found!" });
          }
        }
      );
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

export const loginCompany = (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    if (isAdmin === 0) {
      connection.query(
        `SELECT * FROM company WHERE email=${email}`,
        function (err, rows) {
          if (!err && rows[0].password === password) {
            const accessToken = jwt.sign(
              {
                id: rows[0].companyID,
                isAdmin: rows[0].isAdmin,
              },
              SECRET,
              {
                expiresIn: "3d",
              }
            );
            res.status(201).json({
              success: true,
              message: "Company Logged In!",
              id: rows[0].companyID,
              email: rows[0].email,
              password: rows[0].password,
              accessToken,
            });
          } else {
            res
              .status(404)
              .json({ success: false, message: "Company Not Found!" });
          }
        }
      );
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};
