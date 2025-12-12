
AOS.init({
  once: true,
});

// navbar menu events
const links = document.querySelector("nav ul");
document.querySelector(".menu_btn").addEventListener("click", () => {
  document.querySelector(".menu_btn").classList.toggle("active");
  links.classList.toggle("active");
});
