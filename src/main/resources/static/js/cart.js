const cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cartItems");
const totalText = document.getElementById("totalPrice");

let total = 0;

if (cart.length === 0) {
  container.innerHTML = "<p>Your cart is empty.</p>";
}

cart.forEach(item => {
  total += item.price;

  const div = document.createElement("div");
  div.style.marginBottom = "20px";
  div.innerHTML = `
    <strong>${item.title}</strong> — RM ${item.price}
  `;
  container.appendChild(div);
});

totalText.innerText = "Total: RM " + total;
