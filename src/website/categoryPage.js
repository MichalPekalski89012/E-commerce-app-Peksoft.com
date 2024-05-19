import { doc, onSnapshot, productsColRef, query, where, onAuthStateChanged, auth, readDocumentById,updateDoc, userColRef, limit, storage, ref, getDownloadURL} from "../index.js";

let url_string = window.location.href;
let url = new URL(url_string);
let category = url.searchParams.get("category");

const salesContainer = document.querySelector(".sales-container");


displayDiscountedProducts(category);

function displayDiscountedProducts(category){
  let q = query(productsColRef,where('category', '==', String(category)),limit(4));
  onSnapshot(q,(snapshot)=>{
    snapshot.docs.forEach(doc => {
      let productId = doc.id;
  //     salesContainer.innerHTML += `<div class="discounted-product-container">
  //     <img src="/images/test/39042.png" alt="Product 1" class="popular-product-image">
  //     <hr>
  //     <h3><a href="/product-page.html?productId=${productId}">${doc.data().name}</a></h3>
  //     <div class="price-container">
  //     <p class="old-price">${doc.data().price} zł</p>
  //     <p class="new-price">${doc.data().price - 200} zł</p>
  //     </div>
    
  //   <div class="user-actions discounted">
  //     <img src="/images/icons/wishlistIconProductListing.png" alt="Add to wishlist" class="wishlist-button-small">
  //     <button class="quick-buy-button">Tani Zakup</button>
  //   </div>
  // </div>`;
    let defaultImageRef = ref(storage,`${doc.data().imageReferenceFolder}/default.png`);
    getDownloadURL(defaultImageRef)
      .then((url) => {
        salesContainer.innerHTML += `<div class="discounted-product-container">
      <img src="${url}" alt="Product 1" class="popular-product-image">
      <hr>
      <h3><a href="/product-page.html?productId=${productId}">${doc.data().name}</a></h3>
      <div class="price-container">
      <p class="old-price">${doc.data().price} zł</p>
      <p class="new-price">${doc.data().price - 200} zł</p>
      </div>
    
    <div class="user-actions discounted">
      <img src="/images/icons/wishlistIconProductListing.png" alt="Add to wishlist" class="wishlist-button-small">
      <button class="quick-buy-button">Tani Zakup</button>
    </div>
  </div>`;
      })
      .catch((error) => {
        console.log(error);
      });
    });
  });

}
