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
  }

  /* =========================
     LOGGED IN
  ========================= */
  else {
    authArea.innerHTML = `
      <button class="account-btn" id="accountBtn">My Account</button>

      <div class="account-dropdown" id="accountDropdown">
        <p><strong>${user.name}</strong></p>
        <p>${user.email}</p>
        <p>Role: ${user.role}</p>
        <button id="logoutBtn">Logout</button>
      </div>
    `;

    document.getElementById("accountBtn").addEventListener("click", () => {
      document.getElementById("accountDropdown").classList.toggle("show");
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });
  }

});
