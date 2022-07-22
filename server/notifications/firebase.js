const { initializeApp, messaging } = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

const sendNotification = (message) => {
  // Initializing Notification Engine
  initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://koala-base-default-rtdb.firebaseio.com",
  });

  // Sending Notification
  messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully Sent Notification!", response);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = {
  sendNotification,
};
