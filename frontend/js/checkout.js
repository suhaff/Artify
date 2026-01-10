const cart = JSON.parse(localStorage.getItem("cart")) || [];
const itemsContainer = document.getElementById("orderItems");
const totalText = document.getElementById("orderTotal");

let total = 0;

if (cart.length === 0) {
  itemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  totalText.innerText = "";
} else {
  cart.forEach(item => {
    total += item.price;

    const div = document.createElement("div");
    div.innerHTML = `${item.title} — RM ${item.price}`;
    itemsContainer.appendChild(div);
  });

  totalText.innerText = `Total: RM ${total}`;
}

// PLACE ORDER
document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  alert("Order placed successfully!");

  // Clear cart
  localStorage.removeItem("cart");

  // Redirect to home
  window.location.href = "index.html";
});
