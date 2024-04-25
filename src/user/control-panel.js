import {onAuthStateChanged, auth, userColRef, query, doc, onSnapshot, where,updateDoc,db,signOut,readDocumentById,getDoc} from "../index.js";

let userId = "";
const changeDataButton = document.querySelector(".change-data-button");
const logoutButton = document.querySelector(".logout-button");
const userGreetingPar = document.querySelector(".user-greeting-p");
const wishlistedProductsList = document.querySelector(".wishlisted-products-list");
const ordersList = document.querySelector(".orders-list");
const reviewsDataContainer = document.querySelector(".reviews-data-container");
const updateDataForm = document.querySelector(".update-data-form");
const deliveryDataContainer = document.querySelector(".delivery-data-container");

onAuthStateChanged(auth,(user)=>{
  if(user){
    userId = user.uid;
    readDocumentById("users",userId).then((doc) => {
      displayWishlistedProducts(doc.wishlist);
      displayOrders(doc.orders);
      displayDeliveryAddress(userId);
    });
  }
});

function displayWishlistedProducts(wishlist){
  wishlist.forEach(product => {
      readDocumentById("products", product).then((productDoc) =>{
        wishlistedProductsList.innerHTML += `<div class="wishlisted-product">
        <img src="/images/test/39042.png" alt="">
        <p><a href="/product-page.html?productId=${product}" class="link">${productDoc.name}</a></p>
      </div>`;
      });
  });
}

function displayDeliveryAddress(user){
  readDocumentById("users",user).then((userData)=>{
    deliveryDataContainer.innerHTML = `
    <h4>Dane do przesyłki</h4>
    <p>${userData.address.street}</p>
    <p>${userData.address.postCode}, ${userData.address.city}</p>
    <p>${userData.phoneNumber}</p>
    `;
  })
}

function displayOrders(orders){
  let productsArray; 
  orders.forEach(order =>{
    productsArray = order.products;
    console.log(order.products);
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
  <div class="ordered-products-container"></div>
</div>`;
  });
  const tester = document.querySelector(".ordered-products-container");
  productsArray.forEach(product=>{
    readDocumentById("products",product).then(productData=>{
      tester.innerHTML += `<div class="ordered-product-container">
      <img src="/images/test/39042.png" alt="product-photo" class="ordered-product-image">
      <div class="ordered-product-info">
        <h4>${productData.name}</h4>
        <p>${productData.price}zł</p>
      </div>
    </div>`;
    reviewsDataContainer.innerHTML += `<div class="product-to-review-container">
    <img src="/images/test/39042.png" alt="">
    <h4>${productData.name}</h4>
    <button class="rate-product-button">Oceń produkt</button>
  </div>`;
    });
  });
}


logoutButton.addEventListener("click",e=>{
  signOut(auth).then(()=>{
    window.location.href = "/index.html"
  }).catch((err)=>{
    console.log(err);
  });
});

updateDataForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const docRef = doc(db,"users",userId);
  updateDoc(docRef,{
    address:{
      city: updateDataForm.city.value,
      street: updateDataForm.street.value,
      postCode: updateDataForm.postCode.value
    },
    phoneNumber: updateDataForm.phoneNumber.value 
  })

  updateDataForm.reset();
});
