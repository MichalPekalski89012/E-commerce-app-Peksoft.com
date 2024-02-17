import {onAuthStateChanged, auth, userColRef, query, doc, onSnapshot, where,updateDoc,db,signOut} from "../index.js";

let userId = "";
let userEmail = "";
let data = "";
let isUserChangingData = false;
const userDataContainer = document.querySelector(".user-data-container");
const changeDataButton = document.querySelector(".change-data-button");
const wishlistButton = document.querySelector(".wishlist-button");
const cartButton = document.querySelector(".cart-button");
const logoutButton = document.querySelector(".logout-button");
const userGreetingPar = document.querySelector(".user-greeting-p");

onAuthStateChanged(auth,(user)=>{
  if(user){
    userId = user.uid;
    userEmail = user.email;
    readUserData(userId);
  }
});

function readUserData(userId){
  let q = query(userColRef,where('__name__','==',userId));
  onSnapshot(q,(snapshot)=>{
    snapshot.docs.forEach(doc => {
      data = doc.data();
      displayUserData(data);
    });
  });
}

function displayUserData(data){
  userGreetingPar.innerText = `Witaj, ${data.name}!`
  userDataContainer.innerHTML = `<h2>Adres dostawcy</h2>
  <p>ulica: ${data.address.street}</p>
  <p>miasto: ${data.address.city}</p>
  <p>kod pocztowy: ${data.address.postCode}</p>
  <h2>Dane kontaktowe</h2>
  <p>numer telefonu: ${data.phoneNumber}</p>
  <p>e-mail: ${userEmail}</p>`;
}

changeDataButton.addEventListener("click",()=>{
  isUserChangingData = !isUserChangingData;
  
  if(!isUserChangingData){
    userDataContainer.innerHTML = `<form class="edit-user-data-form">
   <input type="text" name="street" placeholder="Ulica"><br>
   <input type="text" name="city" placeholder="Miasto"><br>
   <input type="text" name="postalCode" placeholder="Kod pocztowy"><br>
   <input type="text" name="phoneNumber" placeholder="numer telefonu"><br>
   <button>aktualizuj dane</button>
  </form>`;
  }else{
    displayUserData(data);
  }
   
});

wishlistButton.addEventListener("click",()=>{
  window.location.href = "/clientPages/wishlist.html";
});

cartButton.addEventListener("click",()=>{
  window.location.href = "/clientPages/cart.html";
});

document.addEventListener("submit",(e)=>{
  e.preventDefault();
  const target = e.target.closest(".edit-user-data-form");
  if(target){
    const docRef = doc(db,"users",userId);
    updateDoc(docRef,{
      address:{
        street : e.target.street.value,
        city : e.target.city.value,
        postCode : e.target.postalCode.value
      },
      phoneNumber : e.target.phoneNumber.value,
    }).then(()=>{
      displayUserData(data);
    }).catch(err => {
      console.log(err.message);
    });
  }

});

logoutButton.addEventListener("click",e=>{
  signOut(auth).then(()=>{
    window.location.href = "/home-page.html"
  }).catch((err)=>{
    console.log(err);
  });
});