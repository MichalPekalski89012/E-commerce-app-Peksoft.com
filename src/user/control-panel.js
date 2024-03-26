import {onAuthStateChanged, auth, userColRef, query, doc, onSnapshot, where,updateDoc,db,signOut,readDocumentById} from "../index.js";

let userId = "";
const changeDataButton = document.querySelector(".change-data-button");
const logoutButton = document.querySelector(".logout-button");
const userGreetingPar = document.querySelector(".user-greeting-p");
const wishlistedProductsList = document.querySelector(".wishlisted-products-list");

onAuthStateChanged(auth,(user)=>{
  if(user){
    userId = user.uid;
    readDocumentById("users",userId).then((doc) => {
      displayWishlistedProducts(doc.wishlist);
    });
  }
});

function displayWishlistedProducts(wishlist){
  wishlist.forEach(element => {
      readDocumentById("products", element).then((productDoc) =>{
        wishlistedProductsList.innerHTML += `<div class="wishlisted-product">
        <img src="/images/test/39042.png" alt="">
        <p>${productDoc.name}</p>
      </div>`;
      });
  });
}

// document.addEventListener("submit",(e)=>{
//   e.preventDefault();
//   const target = e.target.closest(".edit-user-data-form");
//   if(target){
//     const docRef = doc(db,"users",userId);
//     updateDoc(docRef,{
//       address:{
//         street : e.target.street.value,
//         city : e.target.city.value,
//         postCode : e.target.postalCode.value
//       },
//       phoneNumber : e.target.phoneNumber.value,
//     }).then(()=>{
//       displayUserData(data);
//     }).catch(err => {
//       console.log(err.message);
//     });
//   }

// });

logoutButton.addEventListener("click",e=>{
  signOut(auth).then(()=>{
    window.location.href = "/home-page.html"
  }).catch((err)=>{
    console.log(err);
  });
});