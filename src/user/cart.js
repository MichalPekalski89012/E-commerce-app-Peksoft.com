// wszelkie operacje związane z koszykiem użytkownika
import {onAuthStateChanged, auth, productsColRef, userColRef, query, doc, onSnapshot, where,updateDoc,db,arrayRemove} from "../index.js";

let userId = "";
let cartArray = [];
const cartContainer = document.querySelector(".cart-container");

onAuthStateChanged(auth,(user)=>{
  if(user){
    userId = user.uid;
    readUserCart(userId);
  }
});

function readUserCart(userId){
  let q = query(userColRef,where('__name__','==',userId));
  onSnapshot(q,(snapshot)=>{
    snapshot.docs.forEach(doc => {
      cartArray = doc.data().cart;
      displayCart(cartArray);
      console.log(cartArray);
      console.log(userId);
    });
  });
}

function displayCart(cartArray){
  if (!cartArray){return;}
  cartArray.forEach(product=>{
    console.log(product);
    let q = query(productsColRef,where('__name__','==',product));
    onSnapshot(q,(snapshot)=>{
      snapshot.docs.forEach(doc =>{
        cartContainer.innerHTML += `<div class="product-container" style="display: flex;">
        <p>${doc.data().name} ${doc.data().price}</p>
        <button class="delete-product-button" data-product-id="${product}">usuń</button>
      </div>`;
      });
    });
  });
}

document.addEventListener("click",(e)=>{
  const target = e.target.closest(".delete-product-button");
  const productId = target.dataset.productId;
  if(target){
    console.log(`produkt o id:${productId} usuniety`);
    updateDoc(doc(userColRef, userId),{
      cart: arrayRemove(productId)
    }).then(function() {
      console.log("Value removed from the array successfully.");
    })
    .catch(function(error) {
      console.error("Error removing value from array: ", error);
    });
  }
});


