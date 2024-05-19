// wszelkie operacje związane z koszykiem użytkownika
import {onAuthStateChanged, auth, productsColRef, userColRef, query, doc, onSnapshot, where,updateDoc,db,arrayRemove,storage,ref,getDownloadURL} from "../index.js";

let userId = "";
export let cartArray = [];
let priceSummaryValue = 0;
const cartContainer = document.querySelector(".cart-container");
const checkoutButton = document.querySelector(".checkout-button");
const priceSummaryText = document.querySelector(".price-summary-text")

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
      // 
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
      //   cartContainer.innerHTML += `<div class="product-container">
      //   <img src="/images/test/39042.png" alt="">
      //   <p>${doc.data().name} ${doc.data().price}</p>
      //   <button class="delete-product-button" data-product-id="${product}">usuń</button>
      // </div>`;
        let defaultImageRef = ref(storage,`${doc.data().imageReferenceFolder}/default.png`);
        getDownloadURL(defaultImageRef).then((url) => {
          cartContainer.innerHTML += `<div class="product-container">
          <img src="${url}" alt="">
          <p>${doc.data().name} ${doc.data().price}</p>
          <button class="delete-product-button" data-product-id="${product}">usuń</button>
        </div>`;
      })
      .catch((error) => {
        console.log(error);
      });
      priceSummaryValue += parseFloat(doc.data().price);
      });
      priceSummaryText.innerHTML = `${priceSummaryValue} zł`;
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

checkoutButton.addEventListener("click",(e)=>{
  window.location.href = "/clientPages/checkout.html"
});
