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

async function submitForm(event) {
    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;

    let userData = { username, password };
    
    // Using the base API_URL
    let userApiUrl = API_URL.replace('/pets', '/users');

    if (mode === "login") {
        try {
            let res = await fetch(`${userApiUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            
            if (res.ok) {
                let user = await res.json();
                loginAs(user.username, user.role, user.token);
            } else {
                showError("Wrong username or password.");
            }
        } catch (err) {
            console.error(err);
            showError("Failed to connect to the server.");
        }
    } else {
        if (username === "admin") {
            showError("That username is reserved.");
            return;
        }

        try {
            let res = await fetch(`${userApiUrl}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (res.ok) {
                showError("Registration successful! Please login.");
                switchTab('login');
            } else {
                let errorText = await res.text();
                showError(errorText || "Registration failed.");
            }
        } catch (err) {
            console.error(err);
            showError("Failed to connect to the server.");
        }
    }
}

function loginAs(username, role, token) {
    if (token) localStorage.setItem("token", token);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    window.location.href = "index.html";
}
