const express = require("express");

const getCompanyCards = (req, res) => {
  const { company_id } = req.params;
  connection.query(
    `SELECT * FROM paymentcard WHERE fk_company=${company_id}`,
    (err, rows) => {
      if (!err) {
        res.status(200).json({
          status: true,
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

module.exports = {
  getCompanyCards,
};
