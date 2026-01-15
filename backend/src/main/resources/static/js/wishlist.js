const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const grid = document.getElementById("wishlistGrid");

if (wishlist.length === 0) {
  grid.innerHTML = "<p style='text-align:center;'>Your wishlist is empty.</p>";
}

wishlist.forEach(item => {
  const card = document.createElement("div");
  card.className = "art-card";
  card.innerHTML = `
    <img src="${item.image}">
    <div class="art-overlay">
      <h4>${item.title}</h4>
      <p>Liked Item</p>
    </div>
  `;
  grid.appendChild(card);
});
