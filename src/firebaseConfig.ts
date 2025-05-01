
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDOm6tbDKYpR_Kfx_iRaCU2MtsZn3Cl9gw',
  authDomain: 'travel-booking-8b898.firebaseapp.com',
  projectId: 'travel-booking-8b898',
  storageBucket: 'travel-booking-8b898.firebasestorage.app',
  messagingSenderId: '837714192379',
  appId: '1:837714192379:web:72f2befc6bf988cf284d5e',
  measurementId: 'G-XQ1H5WJ04T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);

export { collection, addDoc };
