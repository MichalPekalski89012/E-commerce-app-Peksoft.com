import {signInWithEmailAndPassword,auth,userColRef,query,doc, onSnapshot,where} from "../index.js";

const loginForm = document.querySelector(".login");
const userData = document.querySelector(".user-data");
const userName = document.querySelector(".user-name");

loginForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth,email,password).then((cred)=>{
    const userId = cred.user.uid;
    console.log(`Użytkownik ${userId} zalogowany`);
    readUserData(userId);
  }).catch((err)=>{
    console.log(err);
  });
  //wyczytanie danych na podstawie id gracza kolekcja users-documentID = user ID
});

function readUserData(userId){
  let q = query(userColRef,where('__name__','==',userId));
  onSnapshot(q,(snapshot)=>{
    snapshot.docs.forEach(doc => {
      userName.innerText = `Witaj ${doc.data().name} ${doc.data().surname}!`;
      userData.innerHTML = `<header>adres dostawy:</header>
      <p>${doc.data().address.street}</p>
      <p>${doc.data().address.postCode} ${doc.data().address.city}</p>
      <header>numer telefonu:</header>
      <p>${doc.data().phoneNumber}</p>`;
    });
  });
}
