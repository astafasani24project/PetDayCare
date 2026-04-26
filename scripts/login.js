if (localStorage.getItem("loggedIn") === "true") {
    window.location.href = "index.html";
}

let mode = "login";

function switchTab(tab) {
    mode = tab;
    document.getElementById("loginTab").classList.toggle("active", tab === "login");
    document.getElementById("registerTab").classList.toggle("active", tab === "register");
    document.getElementById("submitBtn").textContent = tab === "login" ? "Login" : "Create Account";
    document.getElementById("subtitle").textContent =
        tab === "login" ? "Please log in to continue" : "Create an account to get started";
    document.getElementById("errorMsg").classList.add("d-none");
}

function showError(msg) {
    let error = document.getElementById("errorMsg");
    error.textContent = msg;
    error.classList.remove("d-none");
}

function submitForm(event) {
    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (mode === "login") {
        if (username === "admin" && password === "1234") {
            loginAs("admin", "admin");
            return;
        }
        let user = users.find(u => u.username === username && u.password === password);
        if (user) {
            loginAs(user.username, "user");
        } else {
            showError("Wrong username or password.");
        }
    } else {
        if (username === "admin") {
            showError("That username is reserved.");
            return;
        }
        if (users.some(u => u.username === username)) {
            showError("Username already taken.");
            return;
        }
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        loginAs(username, "user");
    }
}

function loginAs(username, role) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    window.location.href = "index.html";
}
