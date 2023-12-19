// podstrona generująca listę produktów w zależnosći od tego jaką kategorię wybrał użytkownik
import { doc, onSnapshot, productsColRef, query, where } from "../index.js";

const productList = document.querySelector('.products-list');

let url_string = window.location.href;
let url = new URL(url_string);
let subcategory = url.searchParams.get("subcategory");

productsListing(subcategory);

function productsListing(subcategory){
  let q = query(productsColRef,where('subcategory','==',String(subcategory)));
  onSnapshot(q,(snapshot)=>{
    snapshot.docs.forEach(doc => {
      productList.innerHTML += `<div class="product-container">
      <p><a href="/product-page.html?productId=${doc.id}">${doc.data().name}</a></p> 
      <p>${doc.data().price}</p>
    </div>`;
    });
  });
}
