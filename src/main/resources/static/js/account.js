const token = localStorage.getItem("token");
if (!token) location.href = "login.html";

/* ---------- Decode JWT ---------- */
const payload = JSON.parse(atob(token.split(".")[1]));
const email = payload.sub;
const role = payload.role;

/* ---------- Role Protection ---------- */
const path = window.location.pathname;
if (path.includes("admin") && role !== "ADMIN") location.href="index.html";
if (path.includes("seller") && role !== "SELLER") location.href="index.html";

/* ---------- Account Modal ---------- */
const modal = document.getElementById("accountModal");
const accountBtn = document.getElementById("accountBtn");
const closeAccount = document.getElementById("closeAccount");

if (accountBtn) {
  accountBtn.onclick = () => {
    modal.classList.remove("hidden");
    document.getElementById("accEmail").innerText = email;
    document.getElementById("accRole").innerText = role;
  };
}

if (closeAccount) {
  closeAccount.onclick = () => modal.classList.add("hidden");
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.clear();
    location.href = "login.html";
  };
}

/* ---------- Menu Buttons ---------- */
const ordersBtn = document.getElementById("myOrdersBtn");
if (ordersBtn) ordersBtn.onclick = () => location.href = "orders.html";

const complaintBtn = document.getElementById("complaintBtn");
if (complaintBtn) complaintBtn.onclick = () => location.href = "complaint.html";

/* ---------- Become Seller ---------- */
const sellerBtn = document.getElementById("sellerBtn");
if (sellerBtn && role !== "BUYER") sellerBtn.style.display = "none";

if (sellerBtn) {
  sellerBtn.onclick = () => {
    if (document.getElementById("sellerModal")) return;

    document.body.insertAdjacentHTML("beforeend", `
      <div id="sellerModal" style="
        position:fixed; inset:0;
        background:rgba(0,0,0,.6);
        display:flex;
        align-items:center;
        justify-content:center;
        z-index:9999;">
        
        <div style="
          background:white;
          width:420px;
          padding:40px;
          border-radius:18px;
          box-shadow:0 40px 80px rgba(0,0,0,.25);
          position:relative;">

          <span id="closeSeller" style="
            position:absolute;
            top:15px;
            right:18px;
            cursor:pointer;
            font-size:22px;">×</span>

          <h2>Open Your Art Shop</h2>

          <input id="shopName" placeholder="Shop Name"
            style="width:100%;padding:14px;margin:15px 0;border-radius:10px;border:1px solid #ccc">

          <input id="taxId" placeholder="Tax ID"
            style="width:100%;padding:14px;margin-bottom:25px;border-radius:10px;border:1px solid #ccc">

          <button id="submitSellerBtn" style="
            width:100%;
            padding:14px;
            border:none;
            border-radius:12px;
            background:#6b6cff;
            color:white;
            font-size:16px;
            cursor:pointer;">
            Submit
          </button>
        </div>
      </div>
    `);

    document.getElementById("closeSeller").onclick = () => {
      document.getElementById("sellerModal").remove();
    };

    document.getElementById("submitSellerBtn").onclick = submitSeller;
  };
}

/* ---------- Send Seller Request ---------- */
async function submitSeller(){
  const shop = document.getElementById("shopName").value;
  const tax = document.getElementById("taxId").value;

  if (!shop || !tax) {
    alert("Please fill all fields");
    return;
  }

  const res = await fetch("http://localhost:8080/api/users/become-seller", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ shopName: shop, taxId: tax })
  });

  if (res.ok) {
    alert("You are now a Seller. Please login again.");
    localStorage.clear();
    location.href = "login.html";
  } else {
    alert("Request failed");
  }
}
