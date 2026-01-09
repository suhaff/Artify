const API = "http://localhost:8080/api";

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    document.getElementById("error").innerText = "Invalid login";
    return;
  }

  const user = await res.json();

  // Save session
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("role", user.role);

  // Redirect by role
  if (user.role === "BUYER") {
    window.location.href = "buyer/dashboard.html";
  } else if (user.role === "SELLER") {
    window.location.href = "seller/dashboard.html";
  } else if (user.role === "ADMIN") {
    window.location.href = "admin/dashboard.html";
  }
});
