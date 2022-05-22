import { connection } from "../db.js";
const rowsPerPage = process.env.ROWS || 25;

export const getBanks = (req, res) => {
  connection.query("SELECT * FROM bank", (err, rows) => {
    if (err) {
      res.status(500).json(err);
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
          res.status(500).json(err);
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

export const getBank = (req, res) => {
  connection.query(
    `SELECT * FROM bank WHERE bankID=${req.params.id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json(rows);
      } else {
        res.status(500).json(err);
      }
    }
  );
};

export const addBank = (req, res) => {
  const { name, accountTitle, accountNo, bsb, abn } = req.body;
  connection.query(
    `INSERT INTO bank (bankName, accountTitle, accountNo, bsb, abn) VALUES ('${name}', '${accountTitle}', ${accountNo}, ${bsb}, ${abn})`,
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

export const deleteBank = (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM bank WHERE bankID=${id}`, (err, rows) => {
    if (!err) {
      res.status(201).json({ message: "Bank Deleted Successfully!" });
    } else {
      res.status(500).json(err);
    }
  });
};

export const updateBank = (req, res) => {
  const { id } = req.params;
  const { name, accountTitle, accountNo, bsb, abn } = req.body;
  connection.query(
    `UPDATE bank SET bankName='${name}', accountTitle='${accountTitle}', accountNo=${accountNo}, bsb=${bsb}, abn=${abn} WHERE bankID=${id}`,
    (err, rows) => {
      if (!err) {
        res.status(201).json({ message: "Bank Updated Successfully!" });
      } else {
        res.status(500).json(err);
      }
    }
  );
};
