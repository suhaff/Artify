document.getElementById("signupForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const user = {
        fullName: document.getElementById("fullName").value,
        age: parseInt(document.getElementById("age").value),
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    try {
        const res = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        if (!res.ok) throw new Error("Signup failed");

        alert("Account created successfully!");
        document.getElementById("signupModal").style.display = "none";

    } catch (err) {
        alert(err.message);
    }
});
