import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCV7WoefK0VeL9N08EgZlVt6YJEnxTAZ9g",
  authDomain: "educacion-7a1a8.firebaseapp.com",
  databaseURL: "https://educacion-7a1a8-default-rtdb.firebaseio.com",
  projectId: "educacion-7a1a8",
  storageBucket: "educacion-7a1a8.appspot.com",
  messagingSenderId: "860074970119",
  appId: "1:860074970119:web:274c3f90257e04b700aea2",
  measurementId: "G-7DTRER7P8G",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const messaging = getMessaging(app);
export const db = getDatabase(app);
