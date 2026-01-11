document.addEventListener("DOMContentLoaded", () => {

  const authArea = document.getElementById("authArea");
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");

  if (!authArea) return;

  /* =========================
     NOT LOGGED IN
  ========================= */
  if (!user || !token) {
    authArea.innerHTML = `
      <a href="login.html" class="auth-link">Login</a>
      <span>/</span>
      <a href="register.html" class="auth-link">Sign Up</a>
    `;
    return;
  }

  /* =========================
     LOGGED IN
  ========================= */
  authArea.innerHTML = `
    <button class="account-btn" id="accountBtn">My Account</button>

    <div class="account-dropdown" id="accountDropdown">
      <p><strong>${user.name}</strong></p>
      <p>${user.email}</p>
      <p>Role: ${user.role}</p>

      <hr>

      <a href="orders.html" class="account-link">My Orders</a>
      <a href="complaint.html" class="account-link">Raise Complaint</a>
      <a href="seller-request.html" class="account-link">Become a Seller</a>

      <hr>

      <button id="logoutBtn" class="logout-btn">Logout</button>
    </div>
  `;

  /* Toggle dropdown */
  const btn = document.getElementById("accountBtn");
  const dropdown = document.getElementById("accountDropdown");

  btn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });

  /* Click outside closes it */
  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });

  /* Logout */
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    window.location.href = "index.html";
  });

});
