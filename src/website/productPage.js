import { doc, onSnapshot, productsColRef, query, where,readDocumentById,onAuthStateChanged,auth,updateDoc,userColRef } from "../index.js";

let url_string = window.location.href;
let url = new URL(url_string);
let productId = url.searchParams.get("productId");
let cartArray;
let wishlistArray;
let userId;
let parametersArray;

const name = document.querySelector(".name");
const price = document.querySelector(".price");
const description = document.querySelector(".description");
const parametersTable = document.querySelector(".parameters-table");
const addToCartButton = document.querySelector(".add-product-to-cart");
const addToWishlistButton = document.querySelector(".add-product-to-wishlist");

onAuthStateChanged(auth,(user)=>{
  if(user){
    userId=user.uid;
    readDocumentById("users",user.uid).then(userData=>{
      cartArray = userData.cart;
      wishlistArray = userData.wishlist;
    });
    
  }
});

readDocumentById("products",productId).then(data=>{
  displayProductData(data);
  displayProductParameters(data.parameters);
});

function displayProductData(productData){
  description.innerText = productData.description;
  name.innerText = productData.name;
  price.innerText = `${productData.price} zł`;
}

addToCartButton.addEventListener("click",(e)=>{
  e.preventDefault();
  cartArray.push(productId);
  pushIfNotExists(cartArray,productId);
  updateDoc(doc(userColRef, userId),{
    cart: cartArray
  });
});

addToWishlistButton.addEventListener("click",(e)=>{
  e.preventDefault();
  pushIfNotExists(wishlistArray,productId);
  updateDoc(doc(userColRef, userId),{
    wishlist: wishlistArray
  });
});

function pushIfNotExists(array,productId){
  if (array.indexOf(productId) === -1) {
    array.push(productId);
  }
}

function displayProductParameters(productParam){
  for (let key of Object.keys(productParam)) {
    parametersTable.innerHTML += `<tr>
    <td>${key}</td>
    <td>${productParam[key]}</td>
  </tr>`;
 }
}

document.addEventListener("DOMContentLoaded", function() {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const currentPhoto = document.getElementById("current-photo");

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", function() {
      const newSrc = thumbnail.getAttribute("src");
      const newAlt = thumbnail.getAttribute("alt");
      currentPhoto.setAttribute("src", newSrc);
      currentPhoto.setAttribute("alt", newAlt);
    });
  });
});