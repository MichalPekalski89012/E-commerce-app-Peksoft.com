// cały kod który będzie dodawał produkty do Firebase
import { productsColRef,addDoc} from "../index.js";

const categoryList = document.querySelector('.js-category-list');
const subcategoryList = document.querySelector('.js-subcategory-list');
const parametersTable = document.querySelector('.js-parameters-table');
let categoryValue = '';
let parametersTableHtml = '';
categoryList.addEventListener('change',()=>{
  categoryValue = categoryList.value;
  
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

subcategoryList.addEventListener('change',()=>{
  console.log(subcategoryList.value);
  switchParemetersTable(subcategoryList.value);
});



function switchParemetersTable(subcategory){
  switch(subcategory){
    case 'playstation':
    case 'xbox':
    case 'switch':
    case 'otherConsoles':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Procesor</td>
      <td><input type="text" name="parameter1"></td>
    </tr>
    <tr>
      <td>Układ graficzny</td>
      <td><input type="text" name="parameter2"></td>
    </tr>
    <tr>
      <td>Pamięć RAM</td>
      <td><input type="text" name="parameter3"></td>
    </tr>
    <tr>
      <td>Dysk</td>
      <td><input type="text" name="parameter4"></td>
    </tr>
    <tr>
      <td>Łączność</td>
      <td><input type="text" name="parameter5"></td>
    </tr>
    <tr>
      <td>Napęd optyczny</td>
      <td><input type="text" name="parameter6"></td>
    </tr>
    <tr>
      <td>Złącza</td>
      <td><input type="text" name="parameter7"></td>
    </tr>
    <tr>
      <td>kolor</td>
      <td><input type="text" name="parameter8"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter9"></td>
    </tr>
    <tr>
      <td>Dołączone akcesoria</td>
      <td><input type="text" name="parameter10"></td>
    </tr>`;
      break;
  }
  parametersTable.innerHTML = parametersTableHtml;
}


const addProductForm = document.querySelector('.js-add-product-form');

addProductForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  addDoc(productsColRef, {
    name: addProductForm.name.value,
    price: addProductForm.price.value,
    category: addProductForm.category.value,
    subcategory: addProductForm.subcategory.value,
    description: addProductForm.description.value,
    parameters: {
      parameter1: addProductForm.parameter1.value,
      parameter2: addProductForm.parameter2.value,
      parameter3: addProductForm.parameter3.value,
      parameter4: addProductForm.parameter4.value,
      parameter5: addProductForm.parameter5.value,
      parameter6: addProductForm.parameter6.value,
      parameter7: addProductForm.parameter7.value,
      parameter8: addProductForm.parameter8.value,
      parameter9: addProductForm.parameter9.value,
      parameter10: addProductForm.parameter10.value
    }
  }).then(()=>{
    addProductForm.reset();
  });
  
});

