const { connection } = require("../db");
const rowsPerPage = process.env.ROWS || 25;

const getBanks = (req, res) => {
  connection.query("SELECT * FROM bank", (err, rows) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    } else if (!rows.length) {
      res.status(404).json({
        success: true,
        message: "No Banks Found!",
        data: [],
        error: err.message,
      });
    } else {
      const numOfRows = rows.length;
      const numOfPages = Math.ceil(numOfRows / rowsPerPage);
      let page = req.query.page ? Number(req.query.page) : 1;
      if (page > numOfPages) {
        res.send("/?page=" + encodeURIComponent(numOfPages));
      } else if (page < 1) {
        res.send("/?page=" + encodeURIComponent("1"));
      }

      const startingLimit = (page - 1) * rowsPerPage;
      connection.query(
        `SELECT * FROM bank LIMIT ${startingLimit}, ${rowsPerPage}`,
        (err, rows) => {
          if (err) {
            res.status(404).json({
              success: false,
              message: "No Banks Found!",
              error: err.message,
            });
          }

          let iterator = page - 5 < 1 ? 1 : page - 5;
          let endingLink =
            iterator + 9 <= numOfPages ? iterator + 9 : page + numOfPages;
          if (endingLink < page + 4) {
            iterator -= page + 4 - numOfPages;
          }

          res.json({
            success: true,
            message: "Successfully Retrieved All Banks!",
            data: [rows],
          });
        }
      );
    }
  });
};

const getBank = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM bank WHERE bankID=${req.params.id}`,
      (err, rows) => {
        if (!err) {
          res.status(201).json({
            success: true,
            message: "Bank Retrieved Successfully!",
            data: rows,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Bank Not Found!",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addBank = (req, res) => {
  try {
    const { name, accountTitle, accountNo, bsb, tfn } = req.body;
    const { guard_id } = req.params; // guard ID
    connection.query(
      `SELECT * FROM bank WHERE guard_id=${guard_id}`,
      (err, rows) => {
        if (rows.length > 0) {
          connection.query(
            `UPDATE bank SET bankName='${name}', accountTitle='${accountTitle}', accountNo=${accountNo}, bsb=${bsb}, tfn=${tfnn}, WHERE guard_id=${guard_id}`,
            (err, rows) => {
              if (!err) {
                res.status(200).json({
                  success: true,
                  message: "Bank Details Updated Successfully!",
                });
              } else {
                res.status(404).json({
                  success: false,
                  message: "Bank Not Found! Cannot Update!",
                });
              }
            }
          );
        } else {
          connection.query(
            `INSERT INTO bank (bankName, accountTitle, accountNo, bsb, tfn, guard_id) VALUES ('${name}', '${accountTitle}', ${accountNo}, ${bsb}, ${tfn}, ${guard_id})`,
            (err, rows) => {
              if (!err) {
                res.status(200).json({
                  success: true,
                  message: "Successfully Added Bank Details!",
                });
              } else {
                res.status(409).json({
                  success: false,
                  message: "Bank Already Exists!",
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
      message: error.message,
    });
  }
};

const deleteBank = (req, res) => {
  try {
    const { id } = req.params;
    connection.query(`DELETE FROM bank WHERE bankID=${id}`, (err, rows) => {
      if (!err) {
        res
          .status(200)
          .json({ success: true, message: "Bank Deleted Successfully!" });
      } else {
        res.status(404).json({
          success: false,
          message: "Bank Not Found!",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getBanks,
  getBank,
  addBank,
  deleteBank,
};
