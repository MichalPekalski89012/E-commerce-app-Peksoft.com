// kod generujący zawartość strony kategori. Bedzie generować m.in.
// polecane w danej kategorii
// listę podkategorii
export let subcategory = localStorage.getItem('subcategoryValue');

document.querySelectorAll(".subcategory-redirect").forEach((link)=>{
  link.addEventListener("click", ()=>{
    subcategory = link.dataset.subcategory;
    localStorage.setItem('subcategoryValue', subcategory);
  });
});