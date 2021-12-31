// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANdywBwuxB8I8qHonuy8dTVj8lBVlKBnc",
  authDomain: "node-img-upload-a9fad.firebaseapp.com",
  projectId: "node-img-upload-a9fad",
  storageBucket: "node-img-upload-a9fad.appspot.com",
  messagingSenderId: "809228663688",
  appId: "1:809228663688:web:6c0dc8bf213dc489d9183d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default app;
export { storage };
