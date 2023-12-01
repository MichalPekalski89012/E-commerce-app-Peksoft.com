// podstrona generująca listę produktów w zależnosći od tego jaką kategorię wybrał użytkownik
import { subcategory } from "/src/website/categoryPage.js";
import { doc, onSnapshot, productsColRef, query, where } from "../index.js";

const productList = document.querySelector('.products-list');
productsListing(subcategory)

function productsListing(subcategory){
  let q = query(productsColRef,where('subcategory','==',String(subcategory)));
  onSnapshot(q,(snapshot)=>{
    snapshot.docs.forEach(doc => {
      productList.innerHTML += `<div class="product-container">
      <p>${doc.data().name} ${doc.data().price}</p>
    </div>`;
    });
  });
}
