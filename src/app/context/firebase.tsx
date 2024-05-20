import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.resolve(__dirname, '../../../.env')});

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   databaseURL: process.env.DATABASE_URL,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyCA2yN25hnHw4jkt0_obznhHoQG_uavKKg",
  authDomain: "test-5f227.firebaseapp.com",
  databaseURL: "https://test-5f227-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-5f227",
  storageBucket: "test-5f227.appspot.com",
  messagingSenderId: "357273634188",
  appId: "1:357273634188:web:6e22382a73f898081b42a9",
  measurementId: "G-P6D5WCPGY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);