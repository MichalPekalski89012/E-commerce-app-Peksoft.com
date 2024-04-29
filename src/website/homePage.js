import { doc, onSnapshot, productsColRef, query, where, onAuthStateChanged, auth, readDocumentById,updateDoc, userColRef, limit} from "../index.js";

const recommendedList = document.querySelector(".recomended-list");

displayPopularProducts();
function displayPopularProducts(){
  let q = query(productsColRef,where('category', '==', 'hardware'),limit(3));
  onSnapshot(q,(snapshot)=>{
    snapshot.docs.forEach(doc => {
      let productId = doc.id;
      recommendedList.innerHTML += `<div class="recomended-product">
      <img src="/images/test/39042.png" alt="" class="product-image">
      <h3><a href="/product-page.html?productId=${productId}">${doc.data().name}</a></h3>
      <p>${doc.data().price} zł</p>
    </div>`;
    });
  });
}