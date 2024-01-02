
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelector('.slides');
  const totalSlides = document.querySelectorAll('.slide').length;
  currentSlide = (index + totalSlides) % totalSlides;
  slides.style.transform = `translateX(${-currentSlide * 100}%)`;
  }

prevButton.addEventListener("click",()=>{
  showSlide(currentSlide - 1);
});

nextButton.addEventListener("click", () => {
  showSlide(currentSlide + 1);
});
