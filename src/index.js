//import { initializeApp } from 'firebase/app';
// import { collection, getFirestore, onSnapshot,
//   addDoc,deleteDoc,doc,query,where, orderBy,
//   serverTimestamp,getDoc,updateDoc } from 'firebase/firestore';
// import { getAuth,createUserWithEmailAndPassword,
//   signOut,signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';

import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';

import { collection, getFirestore, onSnapshot,
  addDoc,deleteDoc,doc,query,where, orderBy,
  serverTimestamp,getDoc,updateDoc} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';

import { getAuth,createUserWithEmailAndPassword,
  signOut,signInWithEmailAndPassword,onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyAJ9KxuSqSgMPSoQXmqfwHx5AHbCAypzzU",
  authDomain: "pracadyplomowa-9cce3.firebaseapp.com",
  projectId: "pracadyplomowa-9cce3",
  storageBucket: "pracadyplomowa-9cce3.appspot.com",
  messagingSenderId: "792784674664",
  appId: "1:792784674664:web:cd8ed1d588c2da1b8580dd"
};

const app = initializeApp(firebaseConfig); // inicjalizacja połączenia do backendu Firebase

const db = getFirestore();
const auth = getAuth();
const productsColRef = collection(db,'products');
const userColRef = collection(db,'users');

export {app, db, productsColRef,userColRef, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, getDoc, updateDoc, getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged,auth};

