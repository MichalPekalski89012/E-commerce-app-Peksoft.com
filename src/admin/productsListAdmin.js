import { doc, onSnapshot, productsColRef, query, where } from "../index.js";

// strona administracyjna która listuję wszystkie produktu i umożliwa ich edycję bądz też usunięcie danego produktu
const categoryList = document.querySelector('.js-category-list');
const subcategoryList = document.querySelector('.js-subcategory-list');
const productListContainer = document.querySelector('.js-product-container');
let categoryValue = '';
let subcategoryValue = '';
let subcategoryHtml = '';


categoryList.addEventListener('change',()=>{
  categoryValue = categoryList.value;
  changeSubcategory(categoryValue);

});


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
      <option value="headset">słuchawki</option>
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
      subcategoryHtml=`<option value="hats">czapki</option>
      <option value="tShirts">koszulki</option>
      <option value="hoodies">bluzy</option>`;
      break;

    default:
      console.log("tests");
  }
  subcategoryList.innerHTML = subcategoryHtml;
}

subcategoryList.addEventListener('change',()=>{
  subcategoryValue = subcategoryList.value;
  displaySubcategoryProducts(subcategoryValue);
});

function displaySubcategoryProducts(subcategory){
  productListContainer.innerHTML = '';
  let q = query(productsColRef,where('subcategory','==',String(subcategoryValue))); //zapytanie do bazy
  let productsFromSubcategory = [];
  onSnapshot(q,(snapshot)=>{ //wyciagniece danych z bazy
    snapshot.docs.forEach((doc)=>{
      // productsFromSubcategory.push({...doc.data()});
      //productsFromSubcategory.push(doc.data().name);
      //console.log(productsFromSubcategory);
      productListContainer.innerHTML += `<p>${doc.data().name} ${doc.data().price}</p>`;
    });
  });
}