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

// set display limit products
const selectNumberProducts = document.getElementById("products");
const productsGrid = document.querySelector(".products__grid");
const banner = document.getElementById("banner");

let limitProducts = +selectNumberProducts.value;
let currentPage = 1;

selectNumberProducts.addEventListener("change", async () => {
  limitProducts = +selectNumberProducts.value;

  productsGrid.innerHTML = "";
  currentPage = 1;
  await fetchProducts(currentPage, limitProducts);
});

//create banner
const createBanner = () => {
  const bannerDiv = document.createElement("div");
  bannerDiv.id = "banner";
  bannerDiv.classList.add("banner");

  const content = document.createElement("div");

  const p = document.createElement("p");
  p.classList.add("banner__logo");
  p.textContent = "Forma’sint.";

  const p2 = document.createElement("p");
  p2.classList.add("banner__text");
  p2.textContent = "You'll look and feel like the champion.";

  content.appendChild(p);
  content.appendChild(p2);

  const button = document.createElement("button");
  const p3 = document.createElement("p");
  p3.textContent = "Check this out";
  const imgBtn = document.createElement("img");
  imgBtn.src = "/assets/icons/chevron_right.svg";

  button.appendChild(p3);
  button.appendChild(imgBtn);

  bannerDiv.appendChild(content);
  bannerDiv.appendChild(button);

  return bannerDiv;
};

// /create product element
const createProduct = (product) => {
  const productDiv = document.createElement("div");
  productDiv.classList.add(`product`, `product-${product.id}`);
  productDiv.dataset.id = product.id;
  productDiv.dataset.text = product.text;
  productDiv.dataset.src = product.image;

  const productId = document.createElement("p");
  productId.classList.add("product__id");
  productId.textContent = `ID: ${
    product.id >= 10 ? product.id : "0" + product.id
  }`;

  const productImg = document.createElement("img");
  productImg.classList.add("product__img");
  productImg.src = product.image;
  productImg.alt = product.text;

  productDiv.appendChild(productId);
  productDiv.appendChild(productImg);

  return productDiv;
};

const fetchProducts = async (page, limit) => {
  console.log(page, currentPage);
  try {
    const res = await fetch(
      `https://brandstestowy.smallhost.pl/api/random?pageNumber=${page}&pageSize=${limit}`
    );
    if (!res.ok) {
      throw new Error("Nie moża pobrać danych");
    }
    const data = await res.json();

    data.data.map((el) => {
      product = createProduct(el);
      productsGrid.appendChild(product);
    });

    if (!productsGrid.querySelector(".banner")) {
      const banner = createBanner();
      productsGrid.prepend(banner);
    }
  } catch (err) {
    productsGrid.textContent = err.message;
    console.log(err.message);
  }
};

fetchProducts(currentPage, limitProducts);
currentPage++;

window.addEventListener("scroll", async () => {
  const nearBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight;

  if (nearBottom) {
    await fetchProducts(currentPage, limitProducts);
    currentPage++;
  }
});

// Modal
const modalClose = document.querySelector(".modal__close");
const productModal = document.getElementById("product-modal");

const openModal = (id, img) => {
  productModal.querySelector(".modal__id").textContent = `ID: ${
    id >= 10 ? id : "0" + id
  }`;
  productModal.querySelector(".modal__image").src = img;
  console.log(img);

  productModal.classList.remove("hidden");
};

modalClose.addEventListener("click", () => {
  productModal.classList.add("hidden");
});

productsGrid.addEventListener("click", (e) => {
  const product = e.target.closest(".product");

  const id = product.dataset.id;
  const img = product.dataset.src;

  openModal(id, img);
});

productModal.addEventListener("click", (e) => {
  if (!e.target.closest(".modal__content")) {
    productModal.classList.add("hidden");
  }
});

// Fill logo on hover
const logo = document.querySelector(".navbar__logo");
const logoImg = document.querySelector(".logo-img");

logo.addEventListener("mouseenter", () => {
  logoImg.src = "/assets/icons/forma_fill.svg";
});

logo.addEventListener("mouseleave", () => {
  logoImg.src = "/assets/icons/forma_default.svg";
});

// Fill heart on hover
const hearts = document.querySelectorAll(".heart");

hearts.forEach((heart) => {
  heart.addEventListener("mouseenter", () => {
    heart.src = "/assets/icons/heart_fill.svg";
  });

  heart.addEventListener("mouseleave", () => {
    heart.src = "/assets/icons/heart_default.svg";
  });
});
