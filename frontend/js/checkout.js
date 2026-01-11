const cart = JSON.parse(localStorage.getItem("cart")) || [];
const user = JSON.parse(localStorage.getItem("currentUser"));
const token = localStorage.getItem("token");

const itemsContainer = document.getElementById("orderItems");
const totalText = document.getElementById("orderTotal");

let subtotal = 0;
let discount = 0;
let total = 0;

/* =========================
   RENDER CART
========================= */
if (cart.length === 0) {
  itemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  totalText.innerText = "";
} else {
  cart.forEach(item => {
    subtotal += item.price;

    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.gap = "10px";
    div.style.marginBottom = "12px";

    div.innerHTML = `
      <img src="${item.image}" width="60" height="60" style="border-radius:8px;object-fit:cover">
      <span style="flex:1">${item.title}</span>
      <strong>RM ${item.price}</strong>
    `;

    itemsContainer.appendChild(div);
  });

  total = subtotal;
  totalText.innerText = `Total: RM ${total}`;
}

/* =========================
   COUPONS
========================= */
const coupons = {
  ARTIFY10: 200,     // RM 200 off
  WELCOME15: 0.15   // 15% off
};

function applyCoupon() {
  const code = document.getElementById("coupon").value.toUpperCase();

  if (!coupons[code]) {
    alert("Invalid coupon code");
    return;
  }

  if (coupons[code] < 1) {
    discount = subtotal * coupons[code];
  } else {
    discount = coupons[code];
  }

  total = subtotal - discount;
  totalText.innerText = `Total: RM ${total.toFixed(2)}`;

  alert("Coupon applied!");
}

/* =========================
   PLACE ORDER (BACKEND)
========================= */
document.getElementById("checkoutForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  if (!user || !token) {
    alert("Please login to place an order");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  try {
    const response = await fetch("http://localhost:8080/api/orders/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token   // 🔥 REQUIRED
      },
      body: JSON.stringify({
        userId: user.id,
        name,
        email,
        address,
        total,
        items: cart
      })
    });

    if (!response.ok) {
      const err = await response.text();
      alert("Order failed: " + err);
      return;
    }

    localStorage.removeItem("cart");
    alert("Order placed successfully!");
    window.location.href = "index.html";

  } catch (error) {
    alert("Server not reachable");
    console.error(error);
  }
});
