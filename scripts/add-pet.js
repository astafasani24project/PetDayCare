if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

let currentUser = localStorage.getItem("username");
let currentRole = localStorage.getItem("role");

if (currentRole !== "admin") {
    document.getElementById("ownerField").style.display = "none";
    document.getElementById("owner").removeAttribute("required");
    document.getElementById("owner").value = currentUser;
}

async function addPet(event) {
    event.preventDefault();
    
    let petData = {
        id: 'PET-' + Date.now(),
        petName: petName.value,
        type: type.value,
        owner: currentRole === "admin" ? owner.value : currentUser,
        createdBy: currentUser
    };

    try {
        await fetchWithAuth(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(petData)
        });
        location.href = 'index.html';
    } catch (err) {
        console.error("Failed to add pet", err);
        alert("Failed to add pet.");
    }
}
