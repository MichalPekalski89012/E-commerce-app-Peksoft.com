import {signInWithEmailAndPassword, auth, doc, createUserWithEmailAndPassword, setDoc,db} from "../index.js";

const loginForm = document.querySelector(".login");
const signupForm = document.querySelector(".register");
let userId= "";

loginForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  signInWithEmailAndPassword(auth,email,password).then((cred)=>{
    window.location.href = "/clientPages/client-control-panel.html";
  }).catch((err)=>{
    console.log(err);
  });
});


signupForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const name = signupForm.name.value;
  const surname = signupForm.surname.value;
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  
  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log("user registered");
      userId = cred.user.uid;
      console.log(`id usera: ${userId}`)
      setUserData(userId,name,surname);
      signupForm.reset();
      // window.location.href = "/clientPages/client-control-panel.html";
    })
    .catch(err => {
      console.log(`problem z rejestracją: ${err.message}`);
    });
  
  
});

function setUserData(userId,name,surname){
  console.log("test");
  const userRef = doc(db,"users",userId);
  setDoc(userRef,{
    name: name,
    surname: surname,
    phoneNumber: " ",
    address: {
      city: " ",
      street: " ",
      postCode: " "
    },
    wishlist: [],
    cart: [],
    orders: []
  }).then(() => {
    console.log("Stworzono dokument!");
    window.location.href = "/index.html";
  })
  .catch((error) => {
    console.error("problem z tworzeniem dokumentu: ", error);
  });
}

