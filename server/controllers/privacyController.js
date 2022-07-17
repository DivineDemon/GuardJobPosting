const getPolicy = (req, res) => {
  try {
    connection.query("SELECT * FROM privacypolicy", (err, rows) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Successfully Retrieved Privacy Policy!",
          privacyPolicy: {
            policy: rows[0].policy,
            protect: rows[0].protect,
            collect: rows[0].collect,
            links: rows[0].links,
            consent: rows[0].consent,
            refund: rows[0].refund,
          },
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Privacy Policy Not Found!",
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
  getPolicy,
};
