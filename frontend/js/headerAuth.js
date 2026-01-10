const authArea = document.getElementById("authArea");
const user = JSON.parse(localStorage.getItem("currentUser"));

if (!authArea) {}

if (!user) {
  authArea.innerHTML = `
    <a href="login.html">Login</a> /
    <a href="register.html">Sign Up</a>
  `;
} else {
  authArea.innerHTML = `
    <div class="my-account">
      <button onclick="toggleMenu()">My Account</button>
      <div class="account-dropdown" id="menu">
        <p>${user.name}</p>
        <p>${user.email}</p>
        <p>Role: ${user.role}</p>
        <button onclick="logout()">Logout</button>
      </div>
    </div>
  `;
}

function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  window.location.reload();
}
