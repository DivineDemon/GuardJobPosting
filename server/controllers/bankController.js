const { connection } = require("../db");
const rowsPerPage = process.env.ROWS || 25;

const getBanks = (req, res) => {
  connection.query("SELECT * FROM bank", (err, rows) => {
    if (err) {
      res.status(500);
      throw new Error(err);
    }

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
          res.status(500);
          throw new Error(err);
        }

        let iterator = page - 5 < 1 ? 1 : page - 5;
        let endingLink =
          iterator + 9 <= numOfPages ? iterator + 9 : page + numOfPages;
        if (endingLink < page + 4) {
          iterator -= page + 4 - numOfPages;
        }

        res.send(rows);
      }
    );
  });
};

const getBank = (req, res) => {
  connection.query(
    `SELECT * FROM bank WHERE bankID=${req.params.id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json(rows);
      } else {
        res.status(500);
        throw new Error(err);
      }
    }
  );
};

const addBank = (req, res) => {
  const { name, accountTitle, accountNo, bsb, abn } = req.body;
  const { guard_id } = req.params; // guard ID
  connection.query(
    `SELECT * FROM bank WHERE guard_id=${guard_id}`,
    (err, rows) => {
      if (rows.length > 0) {
        connection.query(
          `UPDATE bank SET bankName='${name}', accountTitle='${accountTitle}', accountNo=${accountNo}, bsb=${bsb}, abn=${abn}, WHERE guard_id=${guard_id}`,
          (err, rows) => {
            if (!err) {
              res.status(200).json({
                success: true,
                message: "Bank Details Updated Successfully!",
                data: rows,
              });
            } else {
              res.status(500);
              throw new Error(err);
            }
          }
        );
      } else {
        connection.query(
          `INSERT INTO bank (bankName, accountTitle, accountNo, bsb, abn, guard_id) VALUES ('${name}', '${accountTitle}', ${accountNo}, ${bsb}, ${abn}, ${guard_id})`,
          (err, rows) => {
            if (!err) {
              res.status(200).json({
                success: true,
                message: "Successfully Added Bank Details!",
                data: rows,
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

const deleteBank = (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM bank WHERE bankID=${id}`, (err, rows) => {
    if (!err) {
      res
        .status(201)
        .json({ success: true, message: "Bank Deleted Successfully!" });
    } else {
      res.status(500);
      throw new Error(err);
    }
  });
};

module.exports = {
  getBanks,
  getBank,
  addBank,
  deleteBank,
};
