/* =========================
   LOAD CART
========================= */
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const itemsContainer = document.getElementById("orderItems");
const totalText = document.getElementById("orderTotal");

let subtotal = 0;
let discount = 0;
let total = 0;

/* =========================
   RENDER CART
========================= */
function renderCart() {
  itemsContainer.innerHTML = "";
  subtotal = 0;

  if (cart.length === 0) {
    itemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalText.innerText = "";
    return;
  }

  cart.forEach(item => {
    subtotal += item.price;

    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.gap = "10px";
    div.style.marginBottom = "12px";

    div.innerHTML = `
      <img src="${item.image}" width="60" height="60"
           style="border-radius:8px;object-fit:cover">
      <span style="flex:1">${item.title}</span>
      <strong>RM ${item.price}</strong>
    `;

    itemsContainer.appendChild(div);
  });

  total = subtotal;
  totalText.innerText = `Total: RM ${total.toFixed(2)}`;
}

renderCart();

/* =========================
   COUPONS
========================= */
const coupons = {
  ARTIFY10: 200,
  WELCOME15: 0.15
};

function applyCoupon() {
  const code = document.getElementById("coupon").value.toUpperCase();

  if (!coupons[code]) {
    alert("Invalid coupon code");
    return;
  }

  discount = coupons[code] < 1
    ? subtotal * coupons[code]
    : coupons[code];

  total = subtotal - discount;
  totalText.innerText = `Total: RM ${total.toFixed(2)}`;

  alert("Coupon applied!");
}

/* =========================
   PLACE ORDER (REAL LOGIC)
========================= */
document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !email || !address) {
    alert("Please fill all required fields");
    return;
  }

  /* =========================
     1️⃣ SAVE ORDER (BUYER)
  ========================= */
  const orders = JSON.parse(localStorage.getItem("artify_orders")) || [];

  orders.unshift({
    id: Date.now(),
    buyerEmail: user.email,
    items: cart,
    total,
    date: new Date().toLocaleDateString()
  });

  localStorage.setItem("artify_orders", JSON.stringify(orders));

  /* =========================
     2️⃣ UPDATE SELLER PRODUCTS
  ========================= */
  let products = JSON.parse(localStorage.getItem("artify_products")) || [];

  cart.forEach(item => {
    const product = products.find(p => p.title === item.title);
    if (product && product.stock > 0) {
      product.stock -= 1;
      product.sold += 1;
    }
  });

  localStorage.setItem("artify_products", JSON.stringify(products));

  /* =========================
     3️⃣ CLEANUP + REDIRECT
  ========================= */
  localStorage.removeItem("cart");

  alert("Order placed successfully!");
  window.location.href = "my-orders.html";
});
