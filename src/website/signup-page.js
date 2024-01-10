import { auth, createUserWithEmailAndPassword, db,setDoc,doc,userColRef} from "../index.js";

const signupForm = document.querySelector(".signup");
let userId= "";

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
      setUserData(userId,name,surname);
      signupForm.reset();
    })
    .catch(err => {
      console.log(err.message);
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
    wishlist: [" "],
    cart: [" "]
  }).then(() => {
    console.log("Document successfully written!");
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
  });
}



// if(isUserCreated){
//   console.log("test");
//   await setDoc(doc(db,"users",userId),{
//     name: nameValue,
//     surname: surnameValue
//  });
// }



