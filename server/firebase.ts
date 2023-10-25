import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS || "");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
});

export { admin };
