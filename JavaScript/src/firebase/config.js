import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyClfbCQWqIga336sREfNfuaw_OVv6AKnVo",
  authDomain: "advancedprogramminglanguages.firebaseapp.com",
  projectId: "advancedprogramminglanguages",
  storageBucket: "advancedprogramminglanguages.firebasestorage.app",
  messagingSenderId: "559739640450",
  appId: "1:559739640450:web:413b0593b13f6938dff29b"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 