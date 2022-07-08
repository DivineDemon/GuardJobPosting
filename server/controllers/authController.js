const jwt = require("jsonwebtoken");
const { connection } = require("../db");

const SECRET = "guard-recruiting-app" || process.env.SECRET;

const addGuard = (req, res) => {
  try {
    connection.query(
      `INSERT INTO guard (firstName, middleName, lastName, email, password, phone, dob, gender, emergencyContact) VALUES ('${req.body.firstName}', '${req.body.middleName}', '${req.body.lastName}', '${req.body.email}', '${req.body.password}', '${req.body.phone}', '${req.body.dob}', '${req.body.gender}', '${req.body.emergencyContact}')`,
      (err, rows, fields) => {
        if (!err) {
          res.status(201).json({
            success: true,
            guardProfile: {
              guard: {
                guardID: rows.insertId,
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                dob: req.body.dob,
                gender: req.body.gender,
                emergencyContact: req.body.emergencyContact,
              },
              address: {},
              documents: {},
              bank: {},
            },
          });
        } else {
          res.status(500);
          throw new Error(err);
        }
      }
    );
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const addCompany = (req, res) => {
  const { companyName, phone, email, password } = req.body;
  connection.query(
    `SELECT * FROM company WHERE email='${email}' OR phone='${phone}'`,
    (err, rows) => {
      if (!err && rows.length !== 0) {
        res.status(409).json({
            success: false,
            message: "Company Already Exists!",
        });
      } else {
        connection.query(
          `INSERT INTO company (companyName, phone, email, password) VALUES ('${companyName}', '${phone}', '${email}', '${password}')`,
          (err, rows) => {
            if (!err) {
              res.status(201).json({
                success: true,
                message: "Company Registered Successfully!",
                companyId: rows.insertId,
              });
            } else {
              res.status(500);
              throw new Error(err);
            }
          }
        );
      }
    }
  );
};

const loginAdmin = (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    if (isAdmin === 1) {
      connection.query(
        `SELECT * FROM admin WHERE email='${email}'`,
        function (err, rows) {
          if (
            !err &&
            rows[0].password === password &&
            rows[0].email === email
          ) {
            const adminToken = jwt.sign(
              {
                id: rows[0].adminID,
                isAdmin: rows[0].isAdmin,
                isGuard: rows[0].isGuard,
                isCompany: rows[0].isCompany,
              },
              SECRET,
              {
                expiresIn: "7d",
              }
            );
            res.status(201).json({
              success: true,
              message: "Admin Logged In!",
              id: rows[0].adminID,
              email: rows[0].email,
              password,
              adminToken,
            });
          } else {
            res.status(404);
            throw new Error("Admin Not Found!");
          }
        }
      );
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const loginGuard = (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    if (isAdmin === 0) {
      connection.query(
        `SELECT * FROM guard WHERE email='${email}'`,
        function (err, rows) {
          if (
            !err &&
            rows[0].password === password &&
            rows[0].email === email
          ) {
            const guardToken = jwt.sign(
              {
                id: rows[0].guardID,
                isAdmin: rows[0].isAdmin,
                isGuard: rows[0].isGuard,
                isCompany: rows[0].isCompany,
              },
              SECRET,
              {
                expiresIn: "7d",
              }
            );
            res.status(201).json({
              success: true,
              message: "Guard Logged In!",
              guard: {
                guardID: rows[0].guardID,
                firstName: rows[0].firstName,
                middleName: rows[0].middleName,
                lastName: rows[0].lastName,
                email: rows[0].email,
                password: rows[0].password,
                phone: rows[0].phone,
                dob: rows[0].dob,
                gender: rows[0].gender,
                emergencyContact: rows[0].emergencyContact,
                status: rows[0].status,
              },
              guardToken,
            });
          } else {
            res.status(404);
            throw new Error("Guard Not Found!");
          }
        }
      );
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const loginCompany = (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    if (isAdmin === 0) {
      connection.query(
        `SELECT * FROM company WHERE email='${email}'`,
        function (err, rows) {
          if (
            !err &&
            rows[0].password === password &&
            rows[0].email === email
          ) {
            const companyToken = jwt.sign(
              {
                id: rows[0].companyID,
                isAdmin: rows[0].isAdmin,
                isGuard: rows[0].isGuard,
                isCompany: rows[0].isCompany,
              },
              SECRET,
              {
                expiresIn: "7d",
              }
            );
            res.status(201).json({
              success: true,
              message: "Company Logged In!",
              companyProfile: {
                company: {
                  companyID: rows[0].companyID,
                  name: rows[0].companyName,
                  phone: rows[0].phone,
                  email: rows[0].email,
                  password: rows[0].password,
                },
              },
              companyToken,
            });
          } else {
            res.status(404);
            throw new Error("Company Not Found!");
          }
        }
      );
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

module.exports = {
  addGuard,
  addCompany,
  loginAdmin,
  loginGuard,
  loginCompany,
};
