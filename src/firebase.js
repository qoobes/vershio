import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";
import "firebase/storage";

const clientCredentials = {
  apiKey: process.env.REACT_APP_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
  // Check that `window` is in scope for the analytics module!
  if (typeof window !== "undefined") {
    // Enable analytics. https://firebase.google.com/docs/analytics/get-started
    if ("measurementId" in clientCredentials) {
      firebase.analytics();
      firebase.performance();
    }
  }
}

export default firebase;
