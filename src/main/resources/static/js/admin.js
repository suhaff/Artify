const users = JSON.parse(localStorage.getItem("users"));
const container = document.getElementById("requests");

users.filter(u => u.sellerRequest).forEach(u => {
  const div = document.createElement("div");
  div.innerHTML = `
    <p>${u.name} (${u.email})</p>
    <button onclick="approve(${u.id})">Approve Seller</button>
  `;
  container.appendChild(div);
});

function approve(id) {
  const user = users.find(u => u.id === id);
  user.role = "seller";
  user.sellerRequest = false;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Seller approved");
  location.reload();
}
