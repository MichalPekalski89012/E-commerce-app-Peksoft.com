
import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';

import { collection, getFirestore, onSnapshot,
  addDoc,deleteDoc,doc,query,where, orderBy,
  serverTimestamp,getDoc,updateDoc,setDoc,arrayRemove,getDocs, limit} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';

import { getAuth,createUserWithEmailAndPassword,
  signOut,signInWithEmailAndPassword,onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';

import {getStorage,ref,getDownloadURL,listAll} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js';
  
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
const searchInput = document.querySelector('.searchInput');
const storage = getStorage();

if(searchInput != null){
  searchInput.addEventListener('keyup',(e)=>{
    if (e.keyCode === 13) {
      window.location.href = `/search-result.html?searchQuery=${searchInput.value}`;
      searchInput.value = '';
    }
  });
}


export async function readDocumentById(coll,id){
  const snap = await getDoc(doc(db, coll, id));
  if (snap.exists()){
    return snap.data();
  }else{
    return Promise.reject(Error(`Nie ma takiego dokumentu: ${coll}.${id}`));
  }
    
}

export async function readUserCartData(userId) {
  const userSnap = await getDoc(doc(db, "users", userId));
  let cartItemsData = [];
  if (userSnap.exists()) {
    let productIdArray = userSnap.data().cart;

    const promises = [];

    productIdArray.forEach((product) => {
      let q = query(productsColRef, where("__name__", "==", product));
      promises.push(getDocs(q));
    });

    const arrayOfQuerySnapshots = await Promise.all(promises);

    arrayOfQuerySnapshots.forEach((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        cartItemsData.push(doc.data());
      });
    });

    return cartItemsData;
  } else {
    return Promise.reject(Error(`Nie ma takiego dokumentu: ${coll}.${id}`));
  }
}



export {app, db, productsColRef,userColRef, onSnapshot, addDoc, 
  deleteDoc, doc, query, where, orderBy, serverTimestamp, getDoc, 
  updateDoc, getAuth, createUserWithEmailAndPassword, signOut, 
  signInWithEmailAndPassword, onAuthStateChanged, auth,setDoc,
  arrayRemove,limit,getDocs,storage,ref,getDownloadURL,listAll};

