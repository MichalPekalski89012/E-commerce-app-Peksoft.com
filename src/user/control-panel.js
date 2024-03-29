import {onAuthStateChanged, auth, userColRef, query, doc, onSnapshot, where,updateDoc,db,signOut,readDocumentById,getDoc} from "../index.js";

let userId = "";
const changeDataButton = document.querySelector(".change-data-button");
const logoutButton = document.querySelector(".logout-button");
const userGreetingPar = document.querySelector(".user-greeting-p");
const wishlistedProductsList = document.querySelector(".wishlisted-products-list");
const ordersList = document.querySelector(".orders-list");
//const orderedProducts = document.querySelector(".ordered-products-container");

//console.log(orderedProducts)
onAuthStateChanged(auth,(user)=>{
  if(user){
    userId = user.uid;
    readDocumentById("users",userId).then((doc) => {
      displayWishlistedProducts(doc.wishlist);
      displayOrders(doc.orders);
    });
  }
});

function displayWishlistedProducts(wishlist){
  wishlist.forEach(product => {
      readDocumentById("products", product).then((productDoc) =>{
        wishlistedProductsList.innerHTML += `<div class="wishlisted-product">
        <img src="/images/test/39042.png" alt="">
        <p>${productDoc.name}</p>
      </div>`;
      });
  });
}

function displayOrders(orders){ 
  orders.forEach(order =>{
    ordersList.innerHTML +=`<div class="order">
    <div class="status-container">
      <div class="status">
        <img src="/images/icons/ptaszek.png" alt="status-icon" class="status-icon">
        <p>Przyjęte do realizacji</p>
      </div>
      <div class="divider"></div>
      <div class="status">
        <img src="/images/icons/ptaszek.png" alt="status-icon" class="status-icon">
        <p>W trakcie realizacji</p>
      </div>
      <div class="divider"></div>
      <div class="status">
        <img src="/images/icons/ptaszek.png" alt="status-icon" class="status-icon">
        <p>Wysłane</p>
      </div>
      <div class="divider in-progress"></div>
      <div class="status in-progress">
        <img src="/images/icons/ptaszek.png" alt="status-icon" class="status-icon">
        <p>Zakończone</p>
      </div>
  </div>
  <div class="delivery-details-container">
    <h3>Dostawa</h3>
    <div class="delivery-type-container">
      <p>${order.deliveryType}</p>
    </div>
    <h3>Płatność</h3>
    <div class="payment-method-container">
      <p>${order.paymentMethod}</p>
    </div>
    <h3>Adres dostawy</h3>
    <div class="delivery-address-container"> 
      <p>${order.address.street}</p>
      <p>${order.address.postCode} ${order.address.city}</p>
    </div>
  </div>
  <h3>Zamówione produkty</h3>
  <div class="ordered-products-container">
  <div class="ordered-product-container">
  <img src="/images/test/39042.png" alt="product-photo" class="ordered-product-image">
  <div class="ordered-product-info">
    <h4>RTX 3080</h4>
    <p>4500zł</p>
  </div>
</div>
  </div>
</div>`;
  });
}


// logoutButton.addEventListener("click",e=>{
//   signOut(auth).then(()=>{
//     window.location.href = "/home-page.html"
//   }).catch((err)=>{
//     console.log(err);
//   });
// });