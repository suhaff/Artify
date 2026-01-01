const params = new URLSearchParams(window.location.search);
const artId = parseInt(params.get("id"));

const art = artworks.find(a => a.id === artId);

if (!art) {
  document.body.innerHTML = "<h2>Artwork not found</h2>";
}

document.getElementById("art-image").src = art.image;
document.getElementById("art-title").textContent = art.title;
document.getElementById("art-artist").textContent = `By ${art.artist}`;
document.getElementById("art-description").textContent = art.description;
document.getElementById("art-price").textContent = `$${art.price}`;

// Like (frontend only)
document.getElementById("like-btn").onclick = () => {
  alert("❤️ You liked this artwork!");
};

// Add to cart
document.getElementById("add-cart-btn").onclick = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(art);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
};

// Buy now
document.getElementById("buy-now-btn").onclick = () => {
  localStorage.setItem("cart", JSON.stringify([art]));
  window.location.href = "checkout.html";
};
