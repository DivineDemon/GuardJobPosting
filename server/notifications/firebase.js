const { initializeApp, messaging } = require("firebase-admin");

const serviceAccount = {
  type: "service_account",
  project_id: "koala-base",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: "firebase-adminsdk-4owlv@koala-base.iam.gserviceaccount.com",
  client_id: "105829812696654302044",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4owlv%40koala-base.iam.gserviceaccount.com",
};

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
