const user = JSON.parse(localStorage.getItem("user"));
const role = localStorage.getItem("role");

if (!user || !role) {
  alert("Please login first");
  window.location.href = "../login.html";
}
