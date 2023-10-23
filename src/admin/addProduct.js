// cały kod który będzie dodawał produkty do Firebase
import { productsColRef,addDoc} from "../index.js";

const categoryList = document.querySelector('.js-category-list');
const subcategoryList = document.querySelector('.js-subcategory-list');
let categoryValue = '';

categoryList.addEventListener('change',()=>{
  categoryValue = categoryList.value;
  //console.log(`to jest kategoria:${categoryValue}`);
  changeSubcategory(categoryValue);

});

let subcategoryHtml = '';

function changeSubcategory(category){
  switch(category){
    case 'laptops':
      subcategoryHtml = `<option value="acerLaptops">Acer</option>
      <option value="asusLaptops">Asus</option>
      <option value="dellLaptops">Dell</option>
      <option value="hpLaptops">HP</option>`;
      break;

    case 'consoles':
      subcategoryHtml = `<option value="playstation">playstation</option>
      <option value="xbox">xbox</option>
      <option value="switch">switch</option>
      <option value="otherConsoles">inne</option>`;
      break;

    case 'hardware':
      subcategoryHtml = `<option value="storageDrive">Dyski HDD i SSD</option>
      <option value="gpu">karty Graficzne</option>
      <option value="cpu">procesory</option>
      <option value="motherboard">płyty główne</option>
      <option value="ram">pamięć RAM</option>
      <option value="pcCase">obudowy komputerowe</option>
      <option value="powerSupply">zasilacze</option>
      <option value="cooling">chłodzenia</option>`;
      break;

    case 'peripherals':
      subcategoryHtml=`<option value="mouse">myszki</option>
      <option value="keyboard">klawiatury</option>
      <option value="monitor">monitory</option>
      <option value="controllers">kontrolery</option>`;
      break;

    case 'accessories':
      subcategoryHtml=`<option value="mousePads">podkładki pod mysz</option>
      <option value="usbCable">kable USB</option>
      <option value="hdmiCable">kable HDMI</option>
      <option value="displayPortCable">kable DisplayPort</option>`;
      break;

    case 'collectibles':
      subcategoryHtml=`<option value="figures">figurki</option>
      <option value="hats">czapki</option>
      <option value="tShirts">koszulki</option>
      <option value="hoodies">bluzy</option>`;
      break;

    default:
      console.log("tests");
  }
  subcategoryList.innerHTML = subcategoryHtml;
}












const addProductForm = document.querySelector('.js-add-product-form');

addProductForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  addDoc(productsColRef, {
    name: addProductForm.name.value,
    price: addProductForm.price.value,
    category: addProductForm.category.value,
    subcategory: addProductForm.subcategory.value
  }).then(()=>{
    addProductForm.reset();
  });
  
});

