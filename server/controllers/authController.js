import jwt from "jsonwebtoken";
import { connection } from "../db.js";

const SECRET = "guard-recruiting-app" || process.env.SECRET;

export const addGuard = (req, res) => {
  try {
    connection.query(
      `INSERT INTO guard (firstName, middleName, lastName, email, password, phone, dob, gender, emergencyContact, username) VALUES ('${req.body.firstName}', '${req.body.middleName}', '${req.body.lastName}', '${req.body.email}', '${req.body.password}', '${req.body.phone}', '${req.body.dob}', '${req.body.gender}', '${req.body.emergencyContact}', '${req.body.username}')`,
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
  const { name, phone, email, username, password } = req.body;
  connection.query(
    `INSERT INTO company (name, phone, email, username, password) VALUES ('${name}', '${phone}', '${email}', '${username}', '${password}')`,
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
    const { username, password, isAdmin } = req.body;
    if (isAdmin === 1) {
      connection.query(
        `SELECT * FROM admin WHERE username='${username}'`,
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
              username: rows[0].username,
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
    const { username, password, isAdmin } = req.body;
    if (isAdmin === 0) {
      connection.query(
        `SELECT * FROM guard WHERE username='${username}'`,
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
              username: rows[0].username,
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
    const { username, password, isAdmin } = req.body;
    if (isAdmin === 0) {
      connection.query(
        `SELECT * FROM company WHERE username=${username}`,
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
              name: rows[0].name,
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
