const express = require("express");

const getCompanyCards = (req, res) => {
  try {
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
          res.status(404).json({
            success: false,
            message: "No Company Cards Found!",
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

const addCompanyCard = (req, res) => {
  try {
    const { company_id } = req.params;
    const { cardNumber, expDate, cvv } = req.body;
    connection.query(
      `INSERT INTO paymentcard (cardNumber, expDate, cvv, fk_company) VALUES (${cardNumber}, '${expDate}', ${cvv}, ${company_id})`,
      (err, rows) => {
        if (!err) {
          res.status(201).json({
            success: true,
            message: "Card Added Successfully!",
            card: {
              id: rows[0].insertId,
            },
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Card Insertion Failed!",
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

module.exports = {
  getCompanyCards,
  addCompanyCard,
};
