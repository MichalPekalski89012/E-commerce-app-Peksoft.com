import {onAuthStateChanged, db, auth, userColRef, doc, updateDoc, readDocumentById,readUserCartData } from "../index.js";

let deliveryOptionValue = "";
let paymentOptionValue = "";
let userId;
let cartCost = 0;
let cartArray;
let ordersArray;

const deliveryOptionRadios = document.getElementsByName("delivery-option");
const paymentOptionRadios = document.getElementsByName("payment-option");
const placeOrderButton = document.querySelector(".place-order-button");
const cartCostSummary = document.querySelector(".cart-cost-summary");
const deliveryAddressForm = document.querySelector(".deliver-address-form");
const productList = document.querySelector(".product-list");




onAuthStateChanged(auth,(user)=>{
  if(user){
    userId = user.uid;
    readDocumentById("users",userId).then(userData=>{
      ordersArray = userData.orders;
      displayDeliveryAddress(userData.address.street,userData.address.city,userData.address.postCode);
    });

    readUserCartData(userId).then(cartData=>{
      cartArray = cartData;
      displayProductsInCart(cartData);
      displayCartCost(cartData);
  });
  }
});


deliveryOptionRadios.forEach(option =>{
  option.addEventListener("change",()=>{
    deliveryOptionValue=option.value;
    console.log(deliveryOptionValue);
  });
});

paymentOptionRadios.forEach(option =>{
  option.addEventListener("change",()=>{
    paymentOptionValue=option.value;
    console.log(paymentOptionValue);
  });
});

function displayDeliveryAddress(street,city,postalCode){
  deliveryAddressForm.street.value=street;
  deliveryAddressForm.city.value=city;
  deliveryAddressForm.postCode.value=postalCode;
}

function displayProductsInCart(cartData){
  cartData.forEach(product=>{
    productList.innerHTML += `<div class="product-container">
    <p>${product.name}</p>
    <p>${product.price}</p>
  </div>`;
  });
}

function displayCartCost(cartData){
  cartData.forEach(product=>{
    cartCost += parseFloat(product.price);
  });
  cartCostSummary.innerText = `Wartość koszyka: ${cartCost}`;
}

function placeOrder(deliveryOption,paymentOption,address,products,priceSummary,userId){
  ordersArray.push({products: products,
    address: address,
    deliveryType: deliveryOption,
    paymentMethod: paymentOption,
    priceSummary: priceSummary});
    
  updateDoc(doc(userColRef, userId),{
    orders: ordersArray
  });
}

placeOrderButton.addEventListener("click",()=>{
  const address = {
    street: deliveryAddressForm.street.value,
    city: deliveryAddressForm.city.value,
    postCode: deliveryAddressForm.postCode.value
  };
  placeOrder(deliveryOptionValue,paymentOptionValue,address,cartArray,cartCost,userId);
  
  const docRef = doc(db,"users",userId);
    updateDoc(docRef,{
      cart: []
    }).then(()=>{
      alert('Zamówienie zostało pomyślnie złożone!');
    }).catch(err => {
      console.log(err);
    });
});


