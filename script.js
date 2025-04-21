//MOBILE NAVBAR
const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const menuOverlay = document.querySelector(".menu-overlay");
const menuMobile = document.querySelector(".sidebar");
const menuLinks = document.querySelectorAll(".sidebar li a");

console.log(menuMobile);
let isOpen = false;

openMenu.addEventListener("click", () => {
  if (!isOpen) {
    isOpen = true;
    menuMobile.classList.add("active");
    menuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
});

closeMenu.addEventListener("click", () => {
  isOpen = false;
  menuMobile.classList.remove("active");
  menuOverlay.classList.remove("active");
  document.body.style.overflow = "";
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    console.log("działa");
    isOpen = false;
    menuMobile.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });
});
