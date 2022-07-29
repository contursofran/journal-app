import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_PUBLIC_APIKEY,
  authDomain: import.meta.env.VITE_PUBLIC_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PUBLIC_PROJECTID,
  storageBucket: import.meta.env.VITE_PUBLIC_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_PUBLIC_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_PUBLIC_APPID,
  measurementId: import.meta.env.VITE_PUBLIC_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
