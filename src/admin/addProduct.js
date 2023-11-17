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
      <td><input type="text" name="parameter1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Układ graficzny</td>
      <td><input type="text" name="parameter2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Pamięć RAM</td>
      <td><input type="text" name="parameter3" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dysk</td>
      <td><input type="text" name="parameter4" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Łączność</td>
      <td><input type="text" name="parameter5" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Napęd optyczny</td>
      <td><input type="text" name="parameter6" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Złącza</td>
      <td><input type="text" name="parameter7" class="parameter-input"></td>
    </tr>
    <tr>
      <td>kolor</td>
      <td><input type="text" name="parameter8" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter9" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dołączone akcesoria</td>
      <td><input type="text" name="parameter10" class="parameter-input"></td>
    </tr>`;
      break;
    case 'acerLaptops':
    case 'asusLaptops':
    case 'dellLaptops':
    case 'hpLaptops':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Procesor</td>
      <td><input type="text" name="parameter1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Układ graficzny</td>
      <td><input type="text" name="parameter2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Pamięć RAM</td>
      <td><input type="text" name="parameter3" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dysk</td>
      <td><input type="text" name="parameter4" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Typ ekranu</td>
      <td><input type="text" name="parameter5" class="parameter-input"></td>
    </tr>
    <tr>
      <td>rozdzielczość ekranu</td>
      <td><input type="text" name="parameter6" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Złącza</td>
      <td><input type="text" name="parameter7" class="parameter-input"></td>
    </tr>
    <tr>
      <td>kolor</td>
      <td><input type="text" name="parameter8" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter9" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dołączone akcesoria</td>
      <td><input type="text" name="parameter10" class="parameter-input"></td>
    </tr>`;
    break;
    case 'storageDrive':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Pojemność</td>
      <td><input type="text" name="parameter1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Format</td>
      <td><input type="text" name="parameter2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Interfejs</td>
      <td><input type="text" name="parameter3" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Prędkość odczytu</td>
      <td><input type="text" name="parameter4" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Prędkość zapisu</td>
      <td><input type="text" name="parameter5" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rodzaj kości pamięci</td>
      <td><input type="text" name="parameter6" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Złącza</td>
      <td><input type="text" name="parameter7" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Niezawodność MTBF</td>
      <td><input type="text" name="parameter8" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Radiator</td>
      <td><input type="text" name="parameter9" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter10" class="parameter-input"></td>
    </tr>`;
    break;
    case 'gpu':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Pamięć</td>
      <td><input type="text" name="parameter1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Efektywne taktowanie pamięci</td>
      <td><input type="text" name="parameter2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Taktowanie rdzenia</td>
      <td><input type="text" name="parameter3" class="parameter-input"></td>
    </tr>
    <tr>
      <td>rodzaj wyjść</td>
      <td><input type="text" name="parameter4" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rekomendowana moc zasilacza</td>
      <td><input type="text" name="parameter5" class="parameter-input"></td>
    </tr>
    <tr>
      <td>złącze zasilania</td>
      <td><input type="text" name="parameter6" class="parameter-input"></td>
    </tr>
    <tr>
      <td>długość</td>
      <td><input type="text" name="parameter7" class="parameter-input"></td>
    </tr>
    <tr>
      <td>szerokość</td>
      <td><input type="text" name="parameter8" class="parameter-input"></td>
    </tr>
    <tr>
      <td>wysokość</td>
      <td><input type="text" name="parameter9" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter10" class="parameter-input"></td>
    </tr>`;
    break;
    case 'cpu':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Gniazdo procesora(Socket)</td>
      <td><input type="text" name="parameter1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Obsługiwany chipset</td>
      <td><input type="text" name="parameter2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rekomendowany chipset</td>
      <td><input type="text" name="parameter3" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Taktowanie rdzenia</td>
      <td><input type="text" name="parameter4" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Liczba rdzeni fizycznych</td>
      <td><input type="text" name="parameter5" class="parameter-input"></td>
    </tr>
    <tr>
      <td>liczba wątków</td>
      <td><input type="text" name="parameter6" class="parameter-input"></td>
    </tr>
    <tr>
      <td>rodzaj obsługiwanej pamięci RAM</td>
      <td><input type="text" name="parameter7" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Pobór mocy</td>
      <td><input type="text" name="parameter8" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Pamięć podręczna</td>
      <td><input type="text" name="parameter9" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter10" class="parameter-input"></td>
    </tr>`;
    break;
    case 'motherboard':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Chłodzenie sekcji zasilania radiatorem</td>
      <td><input type="text" name="parameter1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Obsługiwane rodziny procesorów</td>
      <td><input type="text" name="parameter2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Gniazdo procesora</td>
      <td><input type="text" name="parameter3" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Chipset</td>
      <td><input type="text" name="parameter4" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Architektura procesora</td>
      <td><input type="text" name="parameter5" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Typ obsługiwanej pamięci</td>
      <td><input type="text" name="parameter6" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Liczba banków pamięci</td>
      <td><input type="text" name="parameter7" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Wewnętrzne złącza</td>
      <td><input type="text" name="parameter8" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Zewnętrzne złącza</td>
      <td><input type="text" name="parameter9" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter10" class="parameter-input"></td>
    </tr>`;
    break;
    case 'ram':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Rodzaj pamięci</td>
      <td><input type="text" name="parameter1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Pojemność całkowita</td>
      <td><input type="text" name="parameter2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Pojemność kości</td>
      <td><input type="text" name="parameter3" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Liczba modułów</td>
      <td><input type="text" name="parameter4" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Taktowanie</td>
      <td><input type="text" name="parameter5" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Opóźnienia (cycle latency)</td>
      <td><input type="text" name="parameter6" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Timingi</td>
      <td><input type="text" name="parameter7" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Napięcie</td>
      <td><input type="text" name="parameter8" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Obsługiwane profile OC</td>
      <td><input type="text" name="parameter9" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter10" class="parameter-input"></td>
    </tr>`;
    break;
    case 'pcCase':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Typ obudowy</td>
      <td><input type="text" name="parameter1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Panel boczny</td>
      <td><input type="text" name="parameter2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Podświetlenie</td>
      <td><input type="text" name="parameter3" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Standard płyty głównej</td>
      <td><input type="text" name="parameter4" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Standard zasilacza</td>
      <td><input type="text" name="parameter5" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Miejsca na wewnętrzne dyski/napędy</td>
      <td><input type="text" name="parameter6" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Maksymalna długość karty graficznej</td>
      <td><input type="text" name="parameter7" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Maksymalna wysokość chłodzenia CPU</td>
      <td><input type="text" name="parameter8" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Wyprowadzone złącza</td>
      <td><input type="text" name="parameter9" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter10" class="parameter-input"></td>
    </tr>`;
    break;
    case 'powerSupply':
    parametersTableHtml = `<tr>
    <th>Parametr</th>
    <th>Wartość</th>
  </tr>
  <tr>
    <td>Moc maksymalna</td>
    <td><input type="text" name="parameter1" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Standard</td>
    <td><input type="text" name="parameter2" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Wyprowadzone złącza</td>
    <td><input type="text" name="parameter3" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Certyfikat</td>
    <td><input type="text" name="parameter4" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Zabezpieczenia</td>
    <td><input type="text" name="parameter5" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Typ okablowania</td>
    <td><input type="text" name="parameter6" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Kolor</td>
    <td><input type="text" name="parameter7" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Dołączone akcesoria</td>
    <td><input type="text" name="parameter8" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Gwarancja</td>
    <td><input type="text" name="parameter9" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Dodatkowe informacje</td>
    <td><input type="text" name="parameter10" class="parameter-input"></td>
  </tr>`;
    break;  
    case 'cooling':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Kompatybilność</td>
      <td><input type="text" name="parameter1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rozmiar radiatora</td>
      <td><input type="text" name="parameter2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Ciepłowody</td>
      <td><input type="text" name="parameter3" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Liczba wentylatorów</td>
      <td><input type="text" name="parameter4" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Kontrola obrotów</td>
      <td><input type="text" name="parameter5" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Prędkość obrotowa</td>
      <td><input type="text" name="parameter6" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rodzaj łożyska</td>
      <td><input type="text" name="parameter7" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rozmiar wentylatora</td>
      <td><input type="text" name="parameter8" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Złącze</td>
      <td><input type="text" name="parameter9" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter10" class="parameter-input"></td>
    </tr>`;
    break;
    case 'mouse':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Łączność</td>
      <td><input type="text" name="parameter1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Sensor</td>
      <td><input type="text" name="parameter2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rozdzielczość</td>
      <td><input type="text" name="parameter3" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Liczba przycisków</td>
      <td><input type="text" name="parameter4" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Interfejs</td>
      <td><input type="text" name="parameter5" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Długość przewodu</td>
      <td><input type="text" name="parameter6" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Profil</td>
      <td><input type="text" name="parameter7" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Podświetlenie</td>
      <td><input type="text" name="parameter8" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Wymiary</td>
      <td><input type="text" name="parameter9" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter10" class="parameter-input"></td>
    </tr>`;
    break;
    case 'keyboard':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Rodzaj przełączników</td>
      <td><input type="text" name="parameter1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Łączność</td>
      <td><input type="text" name="parameter2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Interfejs</td>
      <td><input type="text" name="parameter3" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Klawisze numeryczne</td>
      <td><input type="text" name="parameter4" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Klawisze multimedialne / funkcyjne</td>
      <td><input type="text" name="parameter5" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Obsługa makr</td>
      <td><input type="text" name="parameter6" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Podświetlenie klawiszy</td>
      <td><input type="text" name="parameter7" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Kolor podświetlenia klawiszy</td>
      <td><input type="text" name="parameter8" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Złącza</td>
      <td><input type="text" name="parameter9" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter10" class="parameter-input"></td>
    </tr>`;
    break;
    case 'headset':
    parametersTableHtml = `<tr>
    <th>Parametr</th>
    <th>Wartość</th>
  </tr>
  <tr>
    <td>Łączność</td>
    <td><input type="text" name="parameter1" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Budowa słuchawek</td>
    <td><input type="text" name="parameter2" class="parameter-input"></td>
  </tr>
  <tr>
    <td>System audio</td>
    <td><input type="text" name="parameter3" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Pasmo przenoszenia słuchawek</td>
    <td><input type="text" name="parameter4" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Impedancja słuchawek</td>
    <td><input type="text" name="parameter5" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Czułość słuchawek</td>
    <td><input type="text" name="parameter6" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Regulacja głośności</td>
    <td><input type="text" name="parameter7" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Wbudowany mikrofon</td>
    <td><input type="text" name="parameter8" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Czułość mikrofonu</td>
    <td><input type="text" name="parameter9" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Dodatkowe informacje</td>
    <td><input type="text" name="parameter10" class="parameter-input"></td>
  </tr>`;
    break;
    case 'monitor':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Przekątna ekranu</td>
      <td><input type="text" name="parameter1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Powłoka matrycy</td>
      <td><input type="text" name="parameter2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rodzaj matrycy</td>
      <td><input type="text" name="parameter3" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Typ ekranu</td>
      <td><input type="text" name="parameter4" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rozdzielczość ekranu</td>
      <td><input type="text" name="parameter5" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Format obrazu</td>
      <td><input type="text" name="parameter6" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Częstotliwość odświeżania ekranu</td>
      <td><input type="text" name="parameter7" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Liczba wyświetlanych kolorów</td>
      <td><input type="text" name="parameter8" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Technologia synchronizacji</td>
      <td><input type="text" name="parameter9" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter10" class="parameter-input"></td>
    </tr>`;
    break;
    case 'controllers':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Platforma</td>
      <td><input type="text" name="parameter1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Łączność</td>
      <td><input type="text" name="parameter2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Interfejs</td>
      <td><input type="text" name="parameter3" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Zasięg</td>
      <td><input type="text" name="parameter4" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Liczba przycisków</td>
      <td><input type="text" name="parameter5" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Przyciski</td>
      <td><input type="text" name="parameter6" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Wibracje</td>
      <td><input type="text" name="parameter7" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Touchpad</td>
      <td><input type="text" name="parameter8" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Kolor</td>
      <td><input type="text" name="parameter9" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter10" class="parameter-input"></td>
    </tr>`;
    break;
    case 'mousePads':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Materiał</td>
      <td><input type="text" name="parameter1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Szerokość</td>
      <td><input type="text" name="parameter2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Wysokość</td>
      <td><input type="text" name="parameter3" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Grubość</td>
      <td><input type="text" name="parameter4" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Kolor</td>
      <td><input type="text" name="parameter5" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter6" class="parameter-input"></td>
    </tr>`;
    break;
    case 'usbCable':
    parametersTableHtml = `<tr>
    <th>Parametr</th>
    <th>Wartość</th>
  </tr>
  <tr>
    <td>Zastosowanie</td>
    <td><input type="text" name="parameter1" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Złącza kątowe</td>
    <td><input type="text" name="parameter2" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Złącze 1</td>
    <td><input type="text" name="parameter3" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Złącze 2</td>
    <td><input type="text" name="parameter4" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Standard</td>
    <td><input type="text" name="parameter5" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Przepustowość</td>
    <td><input type="text" name="parameter6" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Obsługiwane zasilanie</td>
    <td><input type="text" name="parameter7" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Maks. natężenie</td>
    <td><input type="text" name="parameter8" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Długość</td>
    <td><input type="text" name="parameter9" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Dodatkowe informacje</td>
    <td><input type="text" name="parameter10" class="parameter-input"></td>
  </tr>`;
    break;
    case 'hdmiCable':
    case 'displayPortCable':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Zastosowanie</td>
      <td><input type="text" name="parameter1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Złącza kątowe</td>
      <td><input type="text" name="parameter2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Złącze 1</td>
      <td><input type="text" name="parameter3" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Złącze 2</td>
      <td><input type="text" name="parameter4" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Standard</td>
      <td><input type="text" name="parameter5" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Przepustowość</td>
      <td><input type="text" name="parameter6" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Obsługiwana rozdzielczość</td>
      <td><input type="text" name="parameter7" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Obsługiwane standardy i technologie</td>
      <td><input type="text" name="parameter8" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Długość</td>
      <td><input type="text" name="parameter9" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter10" class="parameter-input"></td>
    </tr>`;
    break;
    case 'hats':
    case 'tShirts':
    case 'hoodies':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Typ gadżetu</td>
      <td><input type="text" name="parameter1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Seria produktów</td>
      <td><input type="text" name="parameter2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Skład zestawu</td>
      <td><input type="text" name="parameter3" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Materiał</td>
      <td><input type="text" name="parameter4" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Kolor</td>
      <td><input type="text" name="parameter5" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="parameter6" class="parameter-input"></td>
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

