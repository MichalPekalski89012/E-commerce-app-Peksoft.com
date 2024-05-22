import { doc, onSnapshot, productsColRef, query, where,readDocumentById,onAuthStateChanged,auth,updateDoc,userColRef,storage,ref,getDownloadURL,listAll } from "../index.js";

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
const test = document.querySelector('.current-photo-container');

onAuthStateChanged(auth,(user)=>{
  if(user){
    userId=user.uid;
    readDocumentById("users",user.uid).then(userData=>{
      cartArray = userData.cart;
      wishlistArray = userData.wishlist;
    });
    
  }
});

function getImagesReferences(reference){
  let count = 0;
  let storageRef = ref(storage,reference);
  let defaultImageRef = ref(storage,`${reference}/default.png`);
  getDownloadURL(defaultImageRef)
    .then((url) => {
      console.log("test")
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
      const img = document.getElementById(`current-photo`);
      img.setAttribute('src', url);
    })
    .catch((error) => {
      console.log(error);
    });



  listAll(storageRef).then((result)=> {
    result.items.forEach((imageRef)=> {
    console.log(imageRef);
    test++;
    displayProductImage(imageRef,count);
  });
    }).catch(function(error) {
      console.log("error przy pobieraniu referencji:",error);
    });
}



function displayProductImage(reference,count){
    getDownloadURL(reference)
    .then((url) => {
      console.log("test")
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
      const img = document.getElementById(`image-${count}`);
      img.setAttribute('src', url);
    })
    .catch((error) => {
      console.log(error);
    });
}





readDocumentById("products",productId).then(data=>{
  displayProductData(data);
  displayProductParameters(data.parameters);
  getImagesReferences(data.imageReferenceFolder);
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