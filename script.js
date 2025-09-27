// Auto-rotating screenshots
document.querySelectorAll("[data-slides]").forEach(slideshow => {
  const slides = slideshow.querySelectorAll("img");
  let index = 0;
  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 3000);
});

// Popup modal
const popup = document.getElementById("popup");
const popupImg = popup.querySelector(".popup-img");
const popupTitle = popup.querySelector(".popup-title");
const popupIcon = popup.querySelector(".popup-icon");
const closeBtn = popup.querySelector(".popup-close");
const prevBtn = popup.querySelector(".popup-prev");
const nextBtn = popup.querySelector(".popup-next");

let currentGameSlides = [];
let currentIndex = 0;

document.querySelectorAll(".slideshow img").forEach(img => {
  img.addEventListener("click", () => {
    const gameCard = img.closest(".game-card");
    if (gameCard.getAttribute("data-ready") === "false") return;

    popupTitle.textContent = gameCard.getAttribute("data-game");
    popupIcon.src = gameCard.getAttribute("data-icon");

    // FIX: Only get slides inside this slideshow
    const slideshow = img.closest("[data-slides]");
    currentGameSlides = Array.from(slideshow.querySelectorAll("img")).map(sl => sl.dataset.src);

    currentIndex = currentGameSlides.indexOf(img.dataset.src);
    popupImg.src = currentGameSlides[currentIndex];

    popup.style.display = "flex";
  });
});

// Close popup
closeBtn.addEventListener("click", () => popup.style.display = "none");
popup.addEventListener("click", e => { if (e.target === popup) popup.style.display = "none"; });

// Navigation
prevBtn.addEventListener("click", () => {
  if (currentGameSlides.length <= 1) return;
  currentIndex = (currentIndex - 1 + currentGameSlides.length) % currentGameSlides.length;
  popupImg.src = currentGameSlides[currentIndex];
});

nextBtn.addEventListener("click", () => {
  if (currentGameSlides.length <= 1) return;
  currentIndex = (currentIndex + 1) % currentGameSlides.length;
  popupImg.src = currentGameSlides[currentIndex];
});

// Handle "Coming Soon"
document.querySelectorAll('.game-card').forEach(card => {
  if (card.getAttribute('data-ready') === "false") {
    card.querySelector('h3').textContent = "?";
    card.querySelector('.game-icon').src = "images/question.png";

    card.querySelectorAll('.slideshow img').forEach(img => {
      img.src = "images/question.png";
      img.alt = "Coming Soon";
      img.dataset.src = "images/question.png";
    });

    card.querySelector('p').textContent = "Coming Soon";

    const btn = card.querySelector('.game-btn');
    btn.textContent = "Coming Soon";
    btn.href = "#";
    btn.classList.add('disabled');
  }
});
