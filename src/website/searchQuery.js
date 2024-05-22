import { doc, onSnapshot, productsColRef, query, where, onAuthStateChanged, auth, readDocumentById,updateDoc, userColRef, limit,getDocs,db, arrayRemove,storage,ref,getDownloadURL,listAll} from "../index.js";

let url_string = window.location.href;
let url = new URL(url_string);
let searched = url.searchParams.get("searchQuery");
const productList = document.querySelector('.products-list');
let productsNamesArray = [];

function FindProductsName(){
    let q = query(productsColRef,where('name', '>=', ''));
    onSnapshot(q,(snapshot)=>{
      snapshot.docs.forEach(doc => {
        //console.log(doc.data().name)
        productsNamesArray.push(String(doc.data().name));
      });
      productsListing(productsNamesArray,searched);
    });
    
}

FindProductsName()



function productsListing(array,searched){
    let arrayOfNames = [];
    array.forEach(productName =>{
        let searchedProduct = String(searched)
        let result = productName.includes(searchedProduct);
        if(result){
          arrayOfNames.push(productName);
          console.log(arrayOfNames);
          let q = query(productsColRef,where('name', '==',productName));
          onSnapshot(q,(snapshot)=>{
          snapshot.docs.forEach(doc => {
          console.log(doc.data().name);
          let productId = doc.id;
          let defaultImageRef = ref(storage,`${doc.data().imageReferenceFolder}/default.png`);
          getDownloadURL(defaultImageRef).then((url) => {
            productList.innerHTML += `<div class="product-container">
          <img src="${url}" alt="">
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
            <p>${doc.data().price} zł</p>
            <button class="add-to-cart-button" data-product-id="${productId}">Dodaj do koszyka</button>
          </div>
          
        </div>`;
          }).catch((error) => {
              console.log(error);
            });
        //   productList.innerHTML += `<div class="product-container">
        //   <img src="/images/test/39042.png" alt="">
        //   <div class="product-details">
        //     <p><a href="/product-page.html?productId=${doc.id}">${doc.data().name}</a></p>
        //     <div class="product-rating">
        //       <img src="/images/icons/stars.png" alt="">
        //       <img src="/images/icons/stars.png" alt="">
        //       <img src="/images/icons/stars.png" alt="">
        //       <img src="/images/icons/stars.png" alt="">
        //       <img src="/images/icons/starUnfilled.png" alt="">
              
        //     </div>
        //     <ul>
        //       ${displayProductParameters(doc.data().parameters)}
        //     </ul> 
        //   </div>
        //   <div class="buy-box">
        //     <p>${doc.data().price} zł</p>
        //     <button class="add-to-cart-button" data-product-id="${productId}">Dodaj do koszyka</button>
        //   </div>
          
        // </div>`
      });
    });
  }
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
