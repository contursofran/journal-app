import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
});

export { admin };
