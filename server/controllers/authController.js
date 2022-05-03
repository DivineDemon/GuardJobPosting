import aes from "crypto-js/aes.js";
import jwt from "jsonwebtoken";
import { connection } from "../db.js";

const SECRET = "guard-recruit" || process.env.SECRET;

export const addGuard = (req, res) => {
  const password = req.body.password;
  const enc_password = aes.encrypt(password, SECRET).toString();

  try {
    connection.query(
      `INSERT INTO guard (firstName, middleName, lastName, email, password, phone, dob, gender, emergencyContact, username) VALUES ('${req.body.firstName}', '${req.body.middleName}', '${req.body.lastName}', '${req.body.email}', '${enc_password}', '${req.body.phone}', '${req.body.dob}', '${req.body.gender}', '${req.body.emergencyContact}', '${req.body.username}')`,
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

export const loginUser = (req, res) => {
  try {
    const form_password = aes.encrypt(req.body.password, SECRET).toString();
    if (req.body.isAdmin) {
      connection.query(
        `SELECT * FROM admin WHERE username='${req.body.username}' AND password='${form_password}'`,
        (err, rows) => {
          if (!err) {
            const accessToken = jwt.sign(
              {
                username: req.body.username,
                isAdmin: req.body.isAdmin,
              },
              SECRET,
              {
                expiresIn: "3d",
              }
            );
            res.status(201).json({
              success: true,
              username: req.body.username,
              form_password,
              accessToken,
            });
            console.log(rows);
          } else {
            res
              .status(404)
              .json({ success: false, message: "Admin Not Found!" });
          }
        }
      );
    } else {
      connection.query(
        `SELECT * FROM guard WHERE username='${req.body.username}' AND password='${form_password}'`,
        (err, rows, fields) => {
          if (!err) {
            const accessToken = jwt.sign(
              {
                username: req.body.username,
                isAdmin: req.body.isAdmin,
              },
              SECRET,
              {
                expiresIn: "3d",
              }
            );
            res.status(201).json({
              success: true,
              username: req.body.username,
              form_password,
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
