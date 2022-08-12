const jwt = require("jsonwebtoken");
const { connection } = require("../db");

const SECRET = "guard-recruiting-app" || process.env.SECRET;

const addGuard = (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      phone,
      dob,
      gender,
      emergencyContact,
      guardDeviceId,
    } = req.body;
    connection.query(
      `SELECT * FROM guard WHERE email='${email} OR phone='${phone}'`,
      (err, rows) => {
        if (!err && rows.length !== 0) {
          res.status(409).json({
            success: false,
            message: "Guard Already Exists!",
          });
        } else {
          connection.query(
            `INSERT INTO guard (firstName, middleName, lastName, email, password, phone, dob, gender, emergencyContact, guardDeviceId) VALUES ('${firstName}', '${middleName}', '${lastName}', '${email}', '${password}', '${phone}', '${dob}', '${gender}', '${emergencyContact}', '${guardDeviceId}')`,
            (err, rows) => {
              if (!err) {
                res.status(201).json({
                  success: true,
                  message: "Guard Registered Successfully!",
                  guardProfile: {
                    guard: {
                      guardID: rows.insertId,
                      firstName,
                      middleName,
                      lastName,
                      email,
                      phone,
                      dob,
                      gender,
                      emergencyContact,
                      guardDeviceId,
                    },
                    address: {},
                    documents: {},
                    bank: {},
                  },
                });
              } else {
                res.status(400).json({
                  success: false,
                  message: "Please Try Again!",
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Guard Insertion Failure!",
      error: error.message,
    });
  }
};

const addCompany = (req, res) => {
  try {
    const { companyName, phone, email, password, companyDeviceId } = req.body;
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
            `INSERT INTO company (companyName, phone, email, password, companyDeviceId) VALUES ('${companyName}', '${phone}', '${email}', '${password}', '${companyDeviceId}')`,
            (err, rows) => {
              if (!err) {
                res.status(201).json({
                  success: true,
                  message: "Company Registered Successfully!",
                  companyId: rows.insertId,
                });
              } else {
                res.status(400).json({
                  success: false,
                  message: "Please Try Again!",
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Company Insertion Failure!",
      error: error.message,
    });
  }
};

const loginAdmin = (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    if (isAdmin === 1) {
      connection.query(
        `SELECT * FROM admin WHERE email='${email}' AND password='${password}'`,
        function (err, rows) {
          if (err || rows.length === 0) {
            res.status(401).json({
              success: false,
              message: "Invalid Credentials!",
            });
          } else {
            const adminToken = jwt.sign(
              {
                id: rows[0].adminID,
                isAdmin: rows[0].isAdmin,
                isGuard: rows[0].isGuard,
                isCompany: rows[0].isCompany,
              },
              SECRET,
              {
                expiresIn: "30d",
              }
            );
            res.status(200).json({
              success: true,
              message: "Admin Logged In!",
              id: rows[0].adminID,
              email: rows[0].email,
              password,
              adminToken,
            });
          }
        }
      );
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Admin Not Found!",
      error: error.message,
    });
  }
};

const loginGuard = (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    if (isAdmin === 0) {
      connection.query(
        `SELECT * FROM guard WHERE email='${email}' AND password='${password}' AND status!='disabled'`,
        function (err, rows) {
          if (err || rows.length === 0) {
            res.status(401).json({
              success: false,
              message: "Invalid Credentials!",
            });
          } else {
            const guardToken = jwt.sign(
              {
                id: rows[0].guardID,
                isAdmin: rows[0].isAdmin,
                isGuard: rows[0].isGuard,
                isCompany: rows[0].isCompany,
              },
              SECRET,
              {
                expiresIn: "30d",
              }
            );
            res.status(200).json({
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
                device_id: rows[0].guardDeviceId,
              },
              guardToken,
            });
          }
        }
      );
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Guard Not Found!",
      error: error.message,
    });
  }
};

const loginCompany = (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    if (isAdmin === 0) {
      connection.query(
        `SELECT * FROM company WHERE email='${email}' AND password='${password}' AND comStatus!='disabled'`,
        function (err, rows) {
          if (err || rows.length === 0) {
            res.status(401).json({
              success: false,
              message: "Invalid Credentials!",
            });
          } else {
            const companyToken = jwt.sign(
              {
                id: rows[0].companyID,
                isAdmin: rows[0].isAdmin,
                isGuard: rows[0].isGuard,
                isCompany: rows[0].isCompany,
              },
              SECRET,
              {
                expiresIn: "30d",
              }
            );
            res.status(200).json({
              success: true,
              message: "Company Logged In!",
              companyProfile: {
                company: {
                  companyID: rows[0].companyID,
                  name: rows[0].companyName,
                  phone: rows[0].phone,
                  email: rows[0].email,
                  password: rows[0].password,
                  device_id: rows[0].companyDeviceId,
                },
              },
              companyToken,
            });
          }
        }
      );
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Company Not Found!",
      error: error.message,
    });
  }
};

module.exports = {
  addGuard,
  addCompany,
  loginAdmin,
  loginGuard,
  loginCompany,
};
