const API = "http://localhost:8080/api/auth";

// REGISTER
document.getElementById("signupForm")?.addEventListener("submit", async e => {
  e.preventDefault();

  const payload = {
    name: fullName.value,
    age: Number(age.value),
    address: address.value,
    phone: phone.value,
    email: email.value,
    password: password.value
  };

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    alert(await res.text());
    return;
  }

  alert("Account created successfully. Please login.");
  window.location.href = "login.html";
});

// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async e => {
  e.preventDefault();

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  if (!res.ok) {
    alert("Invalid credentials");
    return;
  }

  const data = await res.json();

  // SESSION STORAGE ONLY
  localStorage.setItem("token", data.token);
  localStorage.setItem("currentUser", JSON.stringify(data));

  window.location.href = "index.html";
});
