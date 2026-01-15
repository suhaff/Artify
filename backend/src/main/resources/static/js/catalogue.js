// ===============================
// EXISTING STATIC ARTWORKS (UNCHANGED)
// ===============================
const artworks = [
  {
    title: "Angel",
    artist: "Lugman",
    location: "Digital Illustration",
    price: 1500,
    image: "assets/art/Luqman-Angel.jpg"
  },
  {
    title: "Silent",
    artist: "Abaddy Ghanem",
    location: "Middle East",
    price: 950,
    image: "assets/art/abaddy-ghanem-j_S8cdk7yK8-unsplash.jpg"
  },
  {
    title: "Blue Stillness",
    artist: "Antoine Pouligny",
    location: "France",
    price: 1100,
    image: "assets/art/antoine-pouligny-2k1ANsGGMv0-unsplash.jpg"
  },
  {
    title: "Urban",
    artist: "Christian Lue",
    location: "Germany",
    price: 980,
    image: "assets/art/christian-lue-NozWWLzEb0E-unsplash.jpg"
  },
  {
    title: "Echoes",
    artist: "Clay Banks",
    location: "USA",
    price: 870,
    image: "assets/art/clay-banks-635ZeE2-LWE-unsplash.jpg"
  },
  {
    title: "Drift",
    artist: "Daniel Gomez",
    location: "Mexico",
    price: 1020,
    image: "assets/art/daniel-gomez-3HBZ7mNPh5M-unsplash.jpg"
  },
  {
    title: "Silence",
    artist: "David Becker",
    location: "Austria",
    price: 890,
    image: "assets/art/david-becker-pdG4u2Cj4g4-unsplash.jpg"
  },
  {
    title: "Abstract",
    artist: "Eduard Pretsi",
    location: "Italy",
    price: 1200,
    image: "assets/art/eduard-pretsi-Hocy-u2_T1o-unsplash.jpg"
  },
  {
    title: "Rhythm",
    artist: "Jean Carlo",
    location: "Brazil",
    price: 930,
    image: "assets/art/jean-carlo-emer-PPk5cX78qys-unsplash.jpg"
  },
  {
    title: "Land",
    artist: "Unknown",
    location: "Nature",
    price: 1050,
    image: "assets/art/land-o-lakes-inc-TQSvFz7NHuo-unsplash.jpg"
  }
];

// ===============================
// SELLER-ADDED PRODUCTS (DYNAMIC)
// ===============================
const sellerProducts =
  JSON.parse(localStorage.getItem("artify_products")) || [];

// Convert seller products to catalogue-compatible format
const mappedSellerProducts = sellerProducts.map(p => ({
  title: p.title,
  artist: "Independent Artist",
  location: "Digital",
  price: p.price,
  image: p.image,
  _id: p.id,       // used for stock updates
  _isSeller: true  // flag to identify dynamic products
}));

// ===============================
// MERGED LIST (SELLER FIRST)
// ===============================
const allArtworks = [...mappedSellerProducts, ...artworks];

// ===============================
// RENDER GRID
// ===============================
const grid = document.getElementById("artGrid");

allArtworks.forEach(art => {
  const card = document.createElement("div");
  card.className = "art-card";
  card.innerHTML = `
    <img src="${art.image}">
    <div class="art-overlay">
      <h4>${art.title}</h4>
      <p>RM ${art.price}</p>
    </div>
  `;
  card.onclick = () => openModal(art);
  grid.appendChild(card);
});

// ===============================
// MODAL LOGIC
// ===============================
let currentArt = null;

function openModal(art) {
  currentArt = art;

  document.getElementById("modalImage").src = art.image;
  document.getElementById("modalTitle").innerText = art.title;
  document.getElementById("modalArtist").innerText = art.artist;
  document.getElementById("modalLocation").innerText = art.location;
  document.getElementById("modalPrice").innerText = art.price;

  document.getElementById("artModal").style.display = "flex";

  const heart = document.querySelector(".like-btn");
  heart.classList.remove("liked");
  heart.innerText = "♡";

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (wishlist.find(item => item.title === art.title)) {
    heart.classList.add("liked");
    heart.innerText = "♥";
  }
}

function closeModal() {
  document.getElementById("artModal").style.display = "none";
}

// ===============================
// WISHLIST
// ===============================
function toggleLike(btn) {
  const title = document.getElementById("modalTitle").innerText;
  const image = document.getElementById("modalImage").src;

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const exists = wishlist.find(item => item.title === title);

  if (!exists) {
    wishlist.push({ title, image });
    btn.classList.add("liked");
    btn.innerText = "♥";
  } else {
    wishlist = wishlist.filter(item => item.title !== title);
    btn.classList.remove("liked");
    btn.innerText = "♡";
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// ===============================
// CART + BUY LOGIC
// ===============================
function addToCart() {
  const title = document.getElementById("modalTitle").innerText;
  const price = Number(document.getElementById("modalPrice").innerText);
  const image = document.getElementById("modalImage").src;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = cart.find(item => item.title === title);
  if (!exists) {
    cart.push({ title, price, image });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

// Buy Now (affects seller stock only if dynamic product)
document.querySelector(".buy-btn").onclick = () => {
  if (!currentArt) return;

  if (currentArt._isSeller) {
    let products =
      JSON.parse(localStorage.getItem("artify_products")) || [];

    const p = products.find(p => p.id === currentArt._id);
    if (!p || p.stock <= 0) {
      alert("Out of stock");
      return;
    }

    p.stock--;
    p.sold++;
    localStorage.setItem("artify_products", JSON.stringify(products));
  }

  alert("Purchase successful!");
  closeModal();
};
