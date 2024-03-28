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
      displayOrders(doc.orders);
    });
  }
});

function displayWishlistedProducts(wishlist){
  wishlist.forEach(product => {
      readDocumentById("products", product).then((productDoc) =>{
        wishlistedProductsList.innerHTML += `<div class="wishlisted-product">
        <img src="/images/test/39042.png" alt="">
        <p>${productDoc.name}</p>
      </div>`;
      });
  });
}

function displayOrders(orders){
  orders.forEach(order =>{
    readDocumentById("users",order).then(orderData =>{
      
    });
  });
}

logoutButton.addEventListener("click",e=>{
  signOut(auth).then(()=>{
    window.location.href = "/home-page.html"
  }).catch((err)=>{
    console.log(err);
  });
});