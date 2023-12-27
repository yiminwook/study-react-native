import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB_-90dS00A7Jp47wYCwyVtDFqHGlbV0sA',
  authDomain: 'first-975bf.firebaseapp.com',
  projectId: 'first-975bf',
  storageBucket: 'first-975bf.appspot.com',
  messagingSenderId: '514155009761',
  appId: '1:514155009761:web:e6317132f0b1985264c9a0',
  measurementId: 'G-FFDJB9RN0D',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
