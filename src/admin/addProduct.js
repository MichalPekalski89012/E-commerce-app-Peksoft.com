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
      <td><input type="text" name="Procesor" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Układ graficzny</td>
      <td><input type="text" name="Układ graficzny" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Pamięć RAM</td>
      <td><input type="text" name="Pamięć RAM" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dysk</td>
      <td><input type="text" name="Dysk" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Łączność</td>
      <td><input type="text" name="Łączność" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Napęd optyczny</td>
      <td><input type="text" name="Napęd optyczny" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Złącza</td>
      <td><input type="text" name="Złącza" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Kolor</td>
      <td><input type="text" name="Kolor" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dołączone akcesoria</td>
      <td><input type="text" name="Dołączone akcesoria" class="parameter-input"></td>
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
      <td><input type="text" name="Procesor" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Układ graficzny</td>
      <td><input type="text" name="Układ graficzny" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Pamięć RAM</td>
      <td><input type="text" name="Pamięć RAM" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dysk</td>
      <td><input type="text" name="Dysk" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Typ ekranu</td>
      <td><input type="text" name="Typ ekranu" class="parameter-input"></td>
    </tr>
    <tr>
      <td>rozdzielczość ekranu</td>
      <td><input type="text" name="rozdzielczość ekranu" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Złącza</td>
      <td><input type="text" name="Złącza" class="parameter-input"></td>
    </tr>
    <tr>
      <td>kolor</td>
      <td><input type="text" name="kolor" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dołączone akcesoria</td>
      <td><input type="text" name="Dołączone akcesoria" class="parameter-input"></td>
    </tr>`;
    break;
    case 'storageDrive':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Pojemność</td>
      <td><input type="text" name="Pojemność" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Format</td>
      <td><input type="text" name="Format" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Interfejs</td>
      <td><input type="text" name="Interfejs" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Prędkość odczytu</td>
      <td><input type="text" name="Prędkość odczytu" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Prędkość zapisu</td>
      <td><input type="text" name="Prędkość zapisu" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rodzaj kości pamięci</td>
      <td><input type="text" name="Rodzaj kości pamięci" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Złącza</td>
      <td><input type="text" name="Złącza" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Niezawodność MTBF</td>
      <td><input type="text" name="Niezawodność MTBF" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Radiator</td>
      <td><input type="text" name="Radiator" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
    </tr>`;
    break;
    case 'gpu':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Pamięć</td>
      <td><input type="text" name="Pamięć" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Efektywne taktowanie pamięci</td>
      <td><input type="text" name="Efektywne taktowanie pamięci" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Taktowanie rdzenia</td>
      <td><input type="text" name="Taktowanie rdzenia" class="parameter-input"></td>
    </tr>
    <tr>
      <td>rodzaj wyjść</td>
      <td><input type="text" name="rodzaj wyjść" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rekomendowana moc zasilacza</td>
      <td><input type="text" name="Rekomendowana moc zasilacza" class="parameter-input"></td>
    </tr>
    <tr>
      <td>złącze zasilania</td>
      <td><input type="text" name="złącze zasilania" class="parameter-input"></td>
    </tr>
    <tr>
      <td>długość</td>
      <td><input type="text" name="długość" class="parameter-input"></td>
    </tr>
    <tr>
      <td>szerokość</td>
      <td><input type="text" name="szerokość" class="parameter-input"></td>
    </tr>
    <tr>
      <td>wysokość</td>
      <td><input type="text" name="wysokość" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
    </tr>`;
    break;
    case 'cpu':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Gniazdo procesora(Socket)</td>
      <td><input type="text" name="Gniazdo procesora(Socket)" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Obsługiwany chipset</td>
      <td><input type="text" name="Obsługiwany chipset" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rekomendowany chipset</td>
      <td><input type="text" name="Rekomendowany chipset" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Taktowanie rdzenia</td>
      <td><input type="text" name="Taktowanie rdzenia" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Liczba rdzeni fizycznych</td>
      <td><input type="text" name="Liczba rdzeni fizycznych" class="parameter-input"></td>
    </tr>
    <tr>
      <td>liczba wątków</td>
      <td><input type="text" name="liczba wątków" class="parameter-input"></td>
    </tr>
    <tr>
      <td>rodzaj obsługiwanej pamięci RAM</td>
      <td><input type="text" name="rodzaj obsługiwanej pamięci RAM" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Pobór mocy</td>
      <td><input type="text" name="Pobór mocy" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Pamięć podręczna</td>
      <td><input type="text" name="Pamięć podręczna" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
    </tr>`;
    break;
    case 'motherboard':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Chłodzenie sekcji zasilania radiatorem</td>
      <td><input type="text" name="Chłodzenie sekcji zasilania radiatorem" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Obsługiwane rodziny procesorów</td>
      <td><input type="text" name="Obsługiwane rodziny procesorów" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Gniazdo procesora</td>
      <td><input type="text" name="Gniazdo procesora" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Chipset</td>
      <td><input type="text" name="Chipset" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Architektura procesora</td>
      <td><input type="text" name="Architektura procesora" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Typ obsługiwanej pamięci</td>
      <td><input type="text" name="Typ obsługiwanej pamięci" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Liczba banków pamięci</td>
      <td><input type="text" name="Liczba banków pamięc" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Wewnętrzne złącza</td>
      <td><input type="text" name="Wewnętrzne złącza" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Zewnętrzne złącza</td>
      <td><input type="text" name="Zewnętrzne złącza" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
    </tr>`;
    break;
    case 'ram':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Rodzaj pamięci</td>
      <td><input type="text" name="Rodzaj pamięci" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Pojemność całkowita</td>
      <td><input type="text" name="Pojemność całkowita" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Pojemność kości</td>
      <td><input type="text" name="Pojemność kości" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Liczba modułów</td>
      <td><input type="text" name="Liczba modułów" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Taktowanie</td>
      <td><input type="text" name="Taktowanie" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Opóźnienia (cycle latency)</td>
      <td><input type="text" name="Opóźnienia (cycle latency)" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Timingi</td>
      <td><input type="text" name="Timingi" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Napięcie</td>
      <td><input type="text" name="Napięcie" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Obsługiwane profile OC</td>
      <td><input type="text" name="Obsługiwane profile OC" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
    </tr>`;
    break;
    case 'pcCase':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Typ obudowy</td>
      <td><input type="text" name="Typ obudowy" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Panel boczny</td>
      <td><input type="text" name="Panel boczny" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Podświetlenie</td>
      <td><input type="text" name="Podświetlenie" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Standard płyty głównej</td>
      <td><input type="text" name="Standard płyty głównej" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Standard zasilacza</td>
      <td><input type="text" name="Standard zasilacza" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Miejsca na wewnętrzne dyski/napędy</td>
      <td><input type="text" name="Miejsca na wewnętrzne dyski/napędy" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Maksymalna długość karty graficznej</td>
      <td><input type="text" name="Maksymalna długość karty graficznej" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Maksymalna wysokość chłodzenia CPU</td>
      <td><input type="text" name="Maksymalna wysokość chłodzenia CPU" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Wyprowadzone złącza</td>
      <td><input type="text" name="Wyprowadzone złącza" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
    </tr>`;
    break;
    case 'powerSupply':
    parametersTableHtml = `<tr>
    <th>Parametr</th>
    <th>Wartość</th>
  </tr>
  <tr>
    <td>Moc maksymalna</td>
    <td><input type="text" name="Moc maksymalna" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Standard</td>
    <td><input type="text" name="Standard" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Wyprowadzone złącza</td>
    <td><input type="text" name="Wyprowadzone złącza" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Certyfikat</td>
    <td><input type="text" name="Certyfikat" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Zabezpieczenia</td>
    <td><input type="text" name="Zabezpieczenia" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Typ okablowania</td>
    <td><input type="text" name="Typ okablowania" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Kolor</td>
    <td><input type="text" name="Kolor" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Dołączone akcesoria</td>
    <td><input type="text" name="Dołączone akcesoria" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Gwarancja</td>
    <td><input type="text" name="Gwarancja" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Dodatkowe informacje</td>
    <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
  </tr>`;
    break;  
    case 'cooling':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Kompatybilność</td>
      <td><input type="text" name="Kompatybilność" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rozmiar radiatora</td>
      <td><input type="text" name="Rozmiar radiatora" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Ciepłowody</td>
      <td><input type="text" name="Ciepłowody" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Liczba wentylatorów</td>
      <td><input type="text" name="Liczba wentylatorów" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Kontrola obrotów</td>
      <td><input type="text" name="Kontrola obrotów" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Prędkość obrotowa</td>
      <td><input type="text" name="Prędkość obrotowa" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rodzaj łożyska</td>
      <td><input type="text" name="Rodzaj łożyska" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rozmiar wentylatora</td>
      <td><input type="text" name="Rozmiar wentylatora" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Złącze</td>
      <td><input type="text" name="Złącze" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
    </tr>`;
    break;
    case 'mouse':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Łączność</td>
      <td><input type="text" name="Łączność" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Sensor</td>
      <td><input type="text" name="Sensor" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rozdzielczość</td>
      <td><input type="text" name="Rozdzielczość" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Liczba przycisków</td>
      <td><input type="text" name="Liczba przycisków" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Interfejs</td>
      <td><input type="text" name="Interfejs" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Długość przewodu</td>
      <td><input type="text" name="Długość przewodu" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Profil</td>
      <td><input type="text" name="Profil" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Podświetlenie</td>
      <td><input type="text" name="Podświetlenie" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Wymiary</td>
      <td><input type="text" name="Wymiary" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
    </tr>`;
    break;
    case 'keyboard':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Rodzaj przełączników</td>
      <td><input type="text" name="Rodzaj przełączników" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Łączność</td>
      <td><input type="text" name="Łączność" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Interfejs</td>
      <td><input type="text" name="Interfejs" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Klawisze numeryczne</td>
      <td><input type="text" name="Klawisze numeryczne" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Klawisze multimedialne / funkcyjne</td>
      <td><input type="text" name="Klawisze multimedialne / funkcyjne" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Obsługa makr</td>
      <td><input type="text" name="Obsługa makr" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Podświetlenie klawiszy</td>
      <td><input type="text" name="Podświetlenie klawiszy" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Kolor podświetlenia klawiszy</td>
      <td><input type="text" name="Kolor podświetlenia klawiszy" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Złącza</td>
      <td><input type="text" name="Złącza" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
    </tr>`;
    break;
    case 'headset':
    parametersTableHtml = `<tr>
    <th>Parametr</th>
    <th>Wartość</th>
  </tr>
  <tr>
    <td>Łączność</td>
    <td><input type="text" name="Łączność" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Budowa słuchawek</td>
    <td><input type="text" name="Budowa słuchawek" class="parameter-input"></td>
  </tr>
  <tr>
    <td>System audio</td>
    <td><input type="text" name="System audio" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Pasmo przenoszenia słuchawek</td>
    <td><input type="text" name="Pasmo przenoszenia słuchawek" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Impedancja słuchawek</td>
    <td><input type="text" name="Impedancja słuchawek" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Czułość słuchawek</td>
    <td><input type="text" name="Czułość słuchawek" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Regulacja głośności</td>
    <td><input type="text" name="Regulacja głośności" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Wbudowany mikrofon</td>
    <td><input type="text" name="Wbudowany mikrofon" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Czułość mikrofonu</td>
    <td><input type="text" name="Czułość mikrofonu" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Dodatkowe informacje</td>
    <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
  </tr>`;
    break;
    case 'monitor':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Przekątna ekranu</td>
      <td><input type="text" name="Przekątna ekranu" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Powłoka matrycy</td>
      <td><input type="text" name="Powłoka matrycy" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rodzaj matrycy</td>
      <td><input type="text" name="Rodzaj matrycy" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Typ ekranu</td>
      <td><input type="text" name="Typ ekranu" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Rozdzielczość ekranu</td>
      <td><input type="text" name="Rozdzielczość ekranu" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Format obrazu</td>
      <td><input type="text" name="Format obrazu" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Częstotliwość odświeżania ekranu</td>
      <td><input type="text" name="Częstotliwość odświeżania ekranu" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Liczba wyświetlanych kolorów</td>
      <td><input type="text" name="Liczba wyświetlanych kolorów" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Technologia synchronizacji</td>
      <td><input type="text" name="Technologia synchronizacji" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
    </tr>`;
    break;
    case 'controllers':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Platforma</td>
      <td><input type="text" name="Platforma" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Łączność</td>
      <td><input type="text" name="Łączność" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Interfejs</td>
      <td><input type="text" name="Interfejs" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Zasięg</td>
      <td><input type="text" name="Zasięg" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Liczba przycisków</td>
      <td><input type="text" name="Liczba przycisków" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Przyciski</td>
      <td><input type="text" name="Przyciski" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Wibracje</td>
      <td><input type="text" name="Wibracje" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Touchpad</td>
      <td><input type="text" name="Touchpad" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Kolor</td>
      <td><input type="text" name="Kolor" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
    </tr>`;
    break;
    case 'mousePads':
      parametersTableHtml = `<tr>
      <th>Parametr</th>
      <th>Wartość</th>
    </tr>
    <tr>
      <td>Materiał</td>
      <td><input type="text" name="Materiał" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Szerokość</td>
      <td><input type="text" name="Szerokość" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Wysokość</td>
      <td><input type="text" name="Wysokość" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Grubość</td>
      <td><input type="text" name="Grubość" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Kolor</td>
      <td><input type="text" name="Kolor" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
    </tr>`;
    break;
    case 'usbCable':
    parametersTableHtml = `<tr>
    <th>Parametr</th>
    <th>Wartość</th>
  </tr>
  <tr>
    <td>Zastosowanie</td>
    <td><input type="text" name="Zastosowanie" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Złącza kątowe</td>
    <td><input type="text" name="Złącza kątowe" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Złącze 1</td>
    <td><input type="text" name="Złącze 1" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Złącze 2</td>
    <td><input type="text" name="Złącze 2" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Standard</td>
    <td><input type="text" name="Standard" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Przepustowość</td>
    <td><input type="text" name="Przepustowość" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Obsługiwane zasilanie</td>
    <td><input type="text" name="Obsługiwane zasilanie" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Maks. natężenie</td>
    <td><input type="text" name="Maks. natężenie" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Długość</td>
    <td><input type="text" name="Długość" class="parameter-input"></td>
  </tr>
  <tr>
    <td>Dodatkowe informacje</td>
    <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
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
      <td><input type="text" name="Zastosowanie" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Złącza kątowe</td>
      <td><input type="text" name="Złącza kątowe" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Złącze 1</td>
      <td><input type="text" name="Złącze 1" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Złącze 2</td>
      <td><input type="text" name="Złącze 2" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Standard</td>
      <td><input type="text" name="Standard" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Przepustowość</td>
      <td><input type="text" name="Przepustowość" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Obsługiwana rozdzielczość</td>
      <td><input type="text" name="Obsługiwana rozdzielczość" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Obsługiwane standardy i technologie</td>
      <td><input type="text" name="Obsługiwane standardy i technologie" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Długość</td>
      <td><input type="text" name="Długość" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
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
      <td><input type="text" name="Typ gadżetu" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Seria produktów</td>
      <td><input type="text" name="Seria produktów" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Skład zestawu</td>
      <td><input type="text" name="Skład zestawu" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Materiał</td>
      <td><input type="text" name="Materiał" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Kolor</td>
      <td><input type="text" name="Kolor" class="parameter-input"></td>
    </tr>
    <tr>
      <td>Dodatkowe informacje</td>
      <td><input type="text" name="Dodatkowe informacje" class="parameter-input"></td>
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
    parameters: parametersObject()
  }).then(()=>{
    addProductForm.reset();
  });
  
});

function parametersObject(){
  const parametersObj={};
  const parameterInputs = document.querySelectorAll(".parameter-input");
  parameterInputs.forEach(inputElement=>{
    let nameAttributeValue = inputElement.getAttribute('name');
    parametersObj[nameAttributeValue]=inputElement.value;
  });
  return parametersObj;
}
