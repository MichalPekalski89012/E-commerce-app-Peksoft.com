import { createUserWithEmailAndPassword } from "../index.js";

const signupForm = document.querySelector("signup");

signupForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const name = signupForm.name.value;
  const surname = signupForm.surname.value;
  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      signupForm.reset();
    })
    .catch(err => {
      console.log(err.message);
    })
});