import { doc, onSnapshot, productsColRef, query, where,readDocumentById } from "../index.js";

let url_string = window.location.href;
let url = new URL(url_string);
let productId = url.searchParams.get("productId");
let productData;
const name = document.querySelector(".name");
const price = document.querySelector(".price");
const description = document.querySelector(".description");
const parametersTable = document.querySelector(".paramaeters-table");


readDocumentById("products",productId).then(data=>{
  productData = data;
  displayProductData(productData);
});


//readData(productId);

// function readData(id){
  
//   let q = query(productsColRef,where('__name__','==',id));
//   onSnapshot(q,(snapshot)=>{
//     snapshot.docs.forEach(doc => {
//       description.innerText = doc.data().description;
//       name.innerText = doc.data().name;
//       price.innerText = doc.data().price;
//     });
//   });
// }

function displayProductData(productData){
  description.innerText = productData.description;
  name.innerText = productData.name;
  price.innerText = productData.price;
}