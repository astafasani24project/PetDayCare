if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

let currentUser = localStorage.getItem("username");
let currentRole = localStorage.getItem("role");

const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
let pet = null;

async function loadPet() {
    if (!id) {
        alert("No pet specified.");
        location.href = "index.html";
        return;
    }
    
    try {
        const res = await fetchWithAuth(`${API_URL}/${id}`);
        if (res.ok) {
            pet = await res.json();
            
            if (pet && currentRole !== "admin" && pet.createdBy !== currentUser) {
                alert("You can only edit your own pets.");
                location.href = "index.html";
                return;
            }

            petName.value = pet.petName;
            owner.value = pet.owner;

            const option = Array.from(document.querySelectorAll('.pet-select-option'))
                .find(el => el.textContent.trim() === pet.type);
            if (option) {
                document.getElementById('type').value = pet.type;
                const label = document.getElementById('typeLabel');
                label.innerHTML = option.innerHTML;
                label.classList.remove('text-muted');
            }
        } else {
            alert("Pet not found.");
            location.href = "index.html";
        }
    } catch (err) {
        console.error("Failed to load pet", err);
    }
}

if (currentRole !== "admin") {
    document.getElementById("ownerField").style.display = "none";
    document.getElementById("owner").removeAttribute("required");
}

loadPet();

async function updatePet(event) {
    event.preventDefault();
    if (!pet) return;

    pet.petName = petName.value;
    pet.type = type.value;
    pet.owner = currentRole === "admin" ? owner.value : currentUser;
    
    try {
        await fetchWithAuth(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pet)
        });
        location.href = 'index.html';
    } catch (err) {
        console.error("Failed to update pet", err);
        alert("Failed to update pet.");
    }
}
