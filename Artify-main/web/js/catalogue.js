const catalogue = document.getElementById("catalogue");

artworks.forEach(art => {
  const item = document.createElement("div");
  item.className = "art-item";
  item.onclick = () => {
    window.location.href = `art.html?id=${art.id}`;
  };

  item.innerHTML = `
    <img src="${art.image}" alt="${art.title}">
    <div class="art-info">
      <h3>${art.title}</h3>
      <p>${art.artist}</p>
      <p class="price">$${art.price}</p>
    </div>
  `;

  catalogue.appendChild(item);
});
