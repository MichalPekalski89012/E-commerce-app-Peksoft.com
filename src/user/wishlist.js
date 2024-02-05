// lista ulubionych produktów użytkownika
import {onAuthStateChanged, auth, productsColRef, userColRef, query, doc, onSnapshot, where,readDocumentById} from "../index.js";

const wishlistContainer = document.querySelector(".wishlist-container");
let wishlistArray = [];

onAuthStateChanged(auth,(user)=>{
  if(user){
    const userId = user.uid;
    readDocumentById("users",userId).then(userData=>{
      displayWishlistedProducts(userData.wishlist);
    });
  }
});


function displayWishlistedProducts(wishlistArray){
  if (!wishlistArray){
    wishlistContainer.innerHTML = "Lista jest pusta :("
  }
  else{
    wishlistArray.forEach(product=>{
      console.log(product);
      let q = query(productsColRef,where('__name__','==',product));
      onSnapshot(q,(snapshot)=>{
        snapshot.docs.forEach(doc =>{
          wishlistContainer.innerHTML += `<a href="/product-page.html?productId=${product}">${doc.data().name}</a><br>`;
        });
      });
    });
  }
  
}