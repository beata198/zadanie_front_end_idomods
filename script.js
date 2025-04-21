//MOBILE NAVBAR
const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const menuOverlay = document.querySelector(".menu-overlay");
const menuMobile = document.querySelector(".sidebar");
const menuLinks = document.querySelectorAll(".sidebar li a");

let isOpen = false;

const toggleMenu = (state) => {
  isOpen = state;
  menuMobile.classList.toggle("active", state);
  menuOverlay.classList.toggle("active", state);
  document.body.style.overflow = state ? "hidden" : "";
};

openMenu.addEventListener("click", () => toggleMenu(true));
closeMenu.addEventListener("click", () => toggleMenu(false));

menuLinks.forEach((link) => {
  link.addEventListener("click", () => toggleMenu(false));
});

menuOverlay.addEventListener("click", () => toggleMenu(false));
