// lista ulubionych produktów użytkownika
import {onAuthStateChanged, auth, productsColRef, userColRef, query, doc, onSnapshot, where} from "../index.js";

const wishlistContainer = document.querySelector(".wishlist-container");
let wishlistArray = [];

function readUserWishlist(userId){
  let q = query(userColRef,where('__name__','==',userId));
  onSnapshot(q,(snapshot)=>{
    snapshot.docs.forEach(doc => {
      wishlistArray = doc.data().wishlist;
      displayWishlistedProducts(wishlistArray);
    });
  });
}

function displayWishlistedProducts(wishlistArray){
  console.log(wishlistArray);
  wishlistArray.forEach(product=>{
    console.log(product);
    let q = query(productsColRef,where('__name__','==',product));
    onSnapshot(q,(snapshot)=>{
      snapshot.docs.forEach(doc =>{
        wishlistContainer.innerHTML += `<p>${doc.data().name}</p>`;
      });
    });
  });
}


onAuthStateChanged(auth,(user)=>{
  if(user){
    const userId = user.uid;
    readUserWishlist(userId);
  }
});