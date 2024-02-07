// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { useMemo } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCXR96Or6JL7Us00jV8WNtH7hJCvJo3fWY',
  authDomain: 'moviedb-e43e9.firebaseapp.com',
  projectId: 'moviedb-e43e9',
  storageBucket: 'moviedb-e43e9.appspot.com',
  messagingSenderId: '173054158559',
  appId: '1:173054158559:web:30020dfbf88f1408572b6a',
  measurementId: 'G-39TDT3TM0E',
};

export interface InitializedFirebaseApp {
  app: FirebaseApp;
  analytics: Analytics;
  auth: Auth;
  db: Firestore;
}

// Initialize Firebase
export const useFirebaseApp = (): InitializedFirebaseApp => {
  return useMemo(() => {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);
    const firestore = getFirestore(app);

    return {
      app,
      analytics,
      auth,
      db: firestore,
    };
  }, []);
};
