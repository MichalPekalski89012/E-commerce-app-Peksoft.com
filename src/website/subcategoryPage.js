// podstrona generująca listę produktów w zależnosći od tego jaką kategorię wybrał użytkownik
import { doc, onSnapshot, productsColRef, query, where, onAuthStateChanged, auth, readDocumentById,updateDoc, userColRef, limit} from "../index.js";

const productList = document.querySelector('.products-list');
const popularProductsSection = document.querySelector(".popular-products-list");
const priceSlider = document.querySelector(".price-slider");
const maxPriceText = document.querySelector(".max-price-text");
let url_string = window.location.href;
let url = new URL(url_string);
let subcategory = url.searchParams.get("subcategory");
let cartArray;
let wishlistArray;
let userId;
let productIdArray = [];

maxPriceText.innerText = `${priceSlider.value} zł`;

onAuthStateChanged(auth,(user)=>{
  if(user){
    userId=user.uid;
    readDocumentById("users",user.uid).then(userData=>{
      cartArray = userData.cart;
      wishlistArray = userData.wishlist;
    });
    
  }
});

priceSlider.oninput = function() {
  maxPriceText.innerText = `${this.value} zł`;
}


displayPopularProducts(subcategory);
productsListing(subcategory);

function productsListing(subcategory){
  let q = query(productsColRef,where('subcategory', '==', String(subcategory)));
  onSnapshot(q,(snapshot)=>{
    snapshot.docs.forEach(doc => {
    let productId = doc.id;
    productList.innerHTML += `<div class="product-container">
    <img src="/images/test/39042.png" alt="">
    <div class="product-details">
      <p><a href="/product-page.html?productId=${doc.id}">${doc.data().name}</a></p>
      <div class="product-rating">
        <img src="/images/icons/stars.png" alt="">
        <img src="/images/icons/stars.png" alt="">
        <img src="/images/icons/stars.png" alt="">
        <img src="/images/icons/stars.png" alt="">
        <img src="/images/icons/starUnfilled.png" alt="">
        
      </div>
      <ul>
        ${displayProductParameters(doc.data().parameters)}
      </ul> 
    </div>
    <div class="buy-box">
      <p>${doc.data().price}</p>
      <button class="add-to-cart-button" data-product-id="${productId}">Dodaj do koszyka</button>
    </div>
    
  </div>`
    });
  });
}

function displayProductParameters(params){
  if(!params){return;}
  let productParams = '';
  let count = 0;
  for (let key of Object.keys(params)) {
    if (count >= 5) {
      break; 
    }
    productParams+= `<li>${key} ${params[key]}</li>`;
    count++;
    
 }
 return productParams;
}

function pushIfNotExists(array,productId){
  if (array.indexOf(productId) === -1) {
    array.push(productId);
  }
}

document.addEventListener("click",(e)=>{
  const target = e.target.closest(".add-to-cart-button");
  const productId = target.dataset.productId;
  if(target){
    console.log(`produkt o id:${productId} dodany do koszyka`);
    pushIfNotExists(cartArray,productId)
    updateDoc(doc(userColRef, userId),{
      cart: cartArray
    });
  }
});

//test

function displayPopularProducts(){
  let q = query(productsColRef,where('subcategory', '==', String(subcategory)),limit(4));
  onSnapshot(q,(snapshot)=>{
    snapshot.docs.forEach(doc => {
      let productId = doc.id;
    popularProductsSection.innerHTML += `<div class="popular-product">
    <img src="/images/test/39042.png" alt="Product 1" class="popular-product-image">
    <hr>
    <h2><a href="/product-page.html?productId=${productId}">${doc.data().name}</a></h2>
    <p>${doc.data().price}zł</p>
    <div class="user-actions populars">
    <img src="/images/icons/wishlistIconProductListing.png" alt="Add to wishlist" class="wishlist-button-small">
            <button class="quick-buy-button">Szybki Zakup</button>
          </div>
</div>`;
    });
  });
}