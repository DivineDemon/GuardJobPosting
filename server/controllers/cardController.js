const express = require("express");

const getCompanyCards = (req, res) => {
  const { company_id } = req.params;
  connection.query(
    `SELECT * FROM paymentcard WHERE fk_company=${company_id}`,
    (err, rows) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Retrieved All Company Cards!",
          data: rows,
        });
      } else {
        res.status(500);
        throw new Error(err);
      }
    }
  );
};

const addCompanyCard = (req, res) => {
    const { company_id } = req.params;
    const { cardNumber, expDate, cvv } = req.body;
    connection.query(`INSERT INTO paymentcard (cardNumber, expDate, cvv, fk_company) VALUES (${cardNumber}, '${expDate}', ${cvv}, ${company_id})`, (err, rows) => {
        if (!err) {
            res.status(201).json({
                success: true,
                message: "Card Added Successfully!",
                card: {
                    id: rows[0].insertId,
                    data: rows,
                }
            })
        } else {
            res.status(500);
            throw new Error(err);
        }
    })
}

module.exports = {
  getCompanyCards,
  addCompanyCard,
};
