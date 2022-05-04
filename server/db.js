import mysql from "mysql";

const db_config = {
  host: "us-cdbr-east-05.cleardb.net",
  user: "b777740e0c5b5e",
  password: "e975f755",
  database: "heroku_d11cc74f6c0497d",
  multipleStatements: true,
};

function handleDisconnect() {
  const connect = mysql.createConnection(db_config);
  connect.connect((err) => {
    if (!err) {
      console.log("MySQL DB Connected!");
    } else {
      console.log(err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  // Error Handling PROTOCOL_CONNECTION_LOST
  connect.on("error", function (err) {
    console.log(err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
  return connect;
}

export const connection = handleDisconnect();
