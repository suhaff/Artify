const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "../login.html";
}

// Decode JWT payload
const payload = JSON.parse(atob(token.split(".")[1]));

const email = payload.sub;
const role = payload.role;

// Role-based page protection
const path = window.location.pathname;

if (path.includes("/admin/") && role !== "ADMIN") {
  alert("Access denied");
  window.location.href = "../index.html";
}

if (path.includes("/seller/") && role !== "SELLER") {
  alert("Access denied");
  window.location.href = "../index.html";
}

if (path.includes("/buyer/") && role !== "BUYER") {
  alert("Access denied");
  window.location.href = "../index.html";
}

/* ------------------
   MODAL UI
------------------ */

const modal = document.getElementById("accountModal");

document.getElementById("accountBtn").onclick = () => {
  modal.classList.remove("hidden");

  document.getElementById("accEmail").textContent = email;
  document.getElementById("accRole").textContent = role;
};

document.getElementById("closeAccount").onclick = () => {
  modal.classList.add("hidden");
};

document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("token");
  window.location.href = "../login.html";
};

/* ------------------
   SELLER REQUEST
------------------ */

const sellerBtn = document.getElementById("sellerBtn");

if (role !== "BUYER") {
  sellerBtn.style.display = "none";
}

sellerBtn.onclick = async () => {
  const res = await fetch("http://localhost:8080/api/users/request-seller", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  if (res.ok) {
    alert("Seller request sent");
  } else {
    alert("Request failed");
  }
};
