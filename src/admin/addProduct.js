// cały kod który będzie dodawał produkty do Firebase
import { productsColRef,addDoc} from "../index.js";




const addProductForm = document.querySelector('.js-add-product-form');

addProductForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  addDoc(productsColRef, {
    name: addProductForm.name.value,
    price: addProductForm.price.value,
  }).then(()=>{
    addProductForm.reset();
  });
  
});

