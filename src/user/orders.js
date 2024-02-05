
import {onAuthStateChanged, auth,readDocumentById} from "../index.js";

const ordersList = document.querySelector(".orders-list");

let userId;

onAuthStateChanged(auth,(user)=>{
  if(user){
    userId = user.uid;
    console.log(userId);
    readDocumentById("users",userId).then(userData=>{
      displayUserOrders(userData.orders);
    });
  }
});

function displayUserOrders(ordersArray){
  ordersArray.forEach((order,index) => {
    ordersList.innerHTML += `<div class="order-element">
    <header>Dostawa</header>
    <p>${order.deliveryType}</p>
    <header>Adres dostawy</header>
    <p>${order.address.street}</p>
    <p>${order.address.postCode} ${order.address.city}</p>
    <p>nr telefonu</p>
    <p>e-mail</p>
    <header>Płatność</header>
    <p>${order.paymentMethod}</p>
    <div class="products-list">
      <p>${order.products[index].name} ${order.products[index].price}</p>
    </div>
    <p>${order.priceSummary}zł</p>
  </div>`;
  });
}