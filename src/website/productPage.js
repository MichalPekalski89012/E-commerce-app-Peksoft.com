import { doc, onSnapshot, productsColRef, query, where } from "../index.js";

let url_string = window.location.href;
let url = new URL(url_string);
let productId = url.searchParams.get("productId");
const name = document.querySelector(".name");
const price = document.querySelector(".price");
const description = document.querySelector(".description");
const parametersTable = document.querySelector(".paramaeters-table");
readData(productId);

function readData(id){
  let q = query(productsColRef,where('__name__','==',id));
  onSnapshot(q,(snapshot)=>{
    snapshot.docs.forEach(doc => {
      description.innerText = doc.data().description;
      name.innerText = doc.data().name;
      price.innerText = doc.data().price;
    });
  });
}