import {signInWithEmailAndPassword, onAuthStateChanged,auth,userColRef,query,doc, onSnapshot,where,signOut} from "../index.js";

const loginForm = document.querySelector(".login");
const userData = document.querySelector(".user-data");
const userName = document.querySelector(".user-name");
const logoutButton = document.querySelector(".logout");

loginForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth,email,password).then((cred)=>{
    loginForm.style.visibility = "hidden";
  }).catch((err)=>{
    console.log(err);
  });
});

function readUserData(userId){
  let q = query(userColRef,where('__name__','==',userId));
  onSnapshot(q,(snapshot)=>{
    snapshot.docs.forEach(doc => {
      userName.innerText = `Witaj ${doc.data().name} ${doc.data().surname}!`;
      userData.innerHTML = `<header>dane Użytkownika</header>
      <p>--------------------------</p>
        <header>adres dostawy:</header>
        <p>${doc.data().address.street}</p>
        <p>${doc.data().address.postCode} ${doc.data().address.city}</p>
        <header>numer telefonu:</header>
        <p>${doc.data().phoneNumber}</p>
      <p>--------------------------</p>`;
    });
  });
  
  
}


onAuthStateChanged(auth,(user)=>{
  if (user){
    logoutButton.style.visibility = "visible";
    loginForm.style.visibility = "hidden";
    const userId = user.uid;
    readUserData(userId);
    window.location.href = "/clientPages/client-control-panel.html";
  } else {
    userName.innerText = "użytkownik wylogowany";
    loginForm.style.visibility = "visible";
    logoutButton.style.visibility = "hidden";
  }
});

logoutButton.addEventListener("click",()=>{
  signOut(auth).then(()=>{
    location.reload();
  });
});