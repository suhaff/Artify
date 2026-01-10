const users = JSON.parse(localStorage.getItem("users")) || [];
const current = JSON.parse(localStorage.getItem("currentUser"));

// 1. NOT LOGGED IN
if (!current) {
  window.location.href = "../login.html";
}

// 2. FIND USER
const user = users.find(u => u.id === current.id);

// 3. USER NOT FOUND (CORRUPTED SESSION)
if (!user) {
  localStorage.removeItem("currentUser");
  window.location.href = "../login.html";
}

// 4. ROLE-BASED PAGE PROTECTION
const page = window.location.pathname;

if (page.includes("/admin/") && user.role !== "admin") {
  alert("Access denied");
  window.location.href = "../index.html";
}

if (page.includes("/seller/") && user.role !== "seller") {
  alert("Access denied");
  window.location.href = "../index.html";
}

if (page.includes("/buyer/") && user.role !== "buyer") {
  alert("Access denied");
  window.location.href = "../index.html";
}

// 5. MY ACCOUNT UI LOGIC
function toggleAccount() {
  document.getElementById("accountBox").classList.toggle("show");

  document.getElementById("info").innerText =
`${user.name}, ${user.age}
${user.address}
${user.email}
${user.phone}`;

  document.getElementById("role").innerText =
    user.role === "admin"
      ? "Admin"
      : `User (${user.role})`;

  const sellerBtn = document.getElementById("sellerBtn");
  if (sellerBtn && user.role !== "buyer") {
    sellerBtn.style.display = "none";
  }
}

// 6. BUYER REQUEST SELLER
function requestSeller() {
  user.sellerRequest = true;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Seller request sent to admin");
}

// 7. LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "../index.html";
}
