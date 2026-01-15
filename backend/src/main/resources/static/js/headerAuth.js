document.addEventListener("DOMContentLoaded", () => {

  const authArea = document.getElementById("authArea");
  if (!authArea) return;

  const user = JSON.parse(localStorage.getItem("currentUser"));

  /* =========================
     NOT LOGGED IN
  ========================= */
  if (!user) {
    authArea.innerHTML = `
      <a href="login.html" class="auth-link">Login</a>
      <span>/</span>
      <a href="register.html" class="auth-link">Sign Up</a>
    `;
    return;
  }

  const email = user.email;
  const role = user.role;

  /* =========================
     LOGGED IN UI
  ========================= */
  authArea.innerHTML = `
    <button class="account-btn" id="accountBtn">My Account</button>

    <div class="account-dropdown" id="accountDropdown">
      <p><strong>${email}</strong></p>
      <p>Role: ${role}</p>

      <hr>

      <div id="menuLinks"></div>

      <hr>

      <button id="logoutBtn" class="logout-btn">Logout</button>
    </div>
  `;

  const menu = document.getElementById("menuLinks");

  /* =========================
     BUYER MENU
  ========================= */
  if (role === "BUYER") {
    menu.innerHTML = `
      <a href="my-orders.html" class="account-link">My Orders</a>
      <a href="wishlist.html" class="account-link">Wishlist</a>
      <a href="cart.html" class="account-link">Cart</a>
      <a href="checkout.html" class="account-link">Checkout</a>
      <a href="complaint.html" class="account-link">Raise Complaint</a>
      <a href="#" id="sellerBtn" class="account-link">Become a Seller</a>
    `;
  }

  /* =========================
     SELLER MENU
  ========================= */
  if (role === "SELLER") {
    menu.innerHTML = `
      <a href="seller-dashboard.html" class="account-link">Dashboard</a>
      <a href="seller-products.html" class="account-link">My Products</a>
      <a href="seller-reviews.html" class="account-link">Reviews</a>
      <a href="seller-analytics.html" class="account-link">Analytics</a>
      <a href="seller-withdraw.html" class="account-link">Withdrawals</a>
    `;
  }

  /* =========================
     ADMIN MENU (OPTIONAL)
  ========================= */
  if (role === "ADMIN") {
    menu.innerHTML = `
      <a href="admin-dashboard.html" class="account-link">Admin Panel</a>
      <a href="admin-complaints.html" class="account-link">Complaints</a>
      <a href="admin-sellers.html" class="account-link">Seller Requests</a>
    `;
  }

  /* =========================
     DROPDOWN TOGGLE
  ========================= */
  const btn = document.getElementById("accountBtn");
  const dropdown = document.getElementById("accountDropdown");

  btn.onclick = (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
  };

  document.addEventListener("click", () => {
    dropdown.classList.remove("show");
  });

  /* =========================
     LOGOUT
  ========================= */
  document.getElementById("logoutBtn").onclick = () => {
    localStorage.clear();
    window.location.href = "index.html";
  };

});
