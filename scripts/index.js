if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

let username = localStorage.getItem("username") || "";
let role = localStorage.getItem("role") || "user";

document.getElementById("userLabel").textContent = username + (role === "admin" ? " (admin)" : "");

let searchInput = document.getElementById("searchInput");
let searchField = document.getElementById("searchField");

if (role !== "admin") {
    document.getElementById("ownerOption").remove();
}

function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "login.html";
}

const typeImage = {
    Dog: "images/dog.png", Cat: "images/cat.png", Bird: "images/bird.png", Fish: "images/fish.png",
    Rabbit: "images/rabbit.png", Hamster: "images/hamster.png", Turtle: "images/turtle.png"
};

let allPets = [];
let allPets = [];

let table = document.getElementById("tableBody");
let cardView = document.getElementById("cardView");
let tableView = document.getElementById("tableView");
let empty = document.getElementById("empty");

let view = localStorage.getItem("petsView") || "table";
applyView();

function setView(v) {
    view = v;
    localStorage.setItem("petsView", v);
    applyView();
    render();
}

function applyView() {
    document.getElementById("tableViewBtn").classList.toggle("active", view === "table");
    document.getElementById("cardViewBtn").classList.toggle("active", view === "cards");
    tableView.classList.toggle("d-none", view !== "table");
    cardView.classList.toggle("d-none", view !== "cards");
}

async function loadPets() {
    try {
        const res = await fetchWithAuth(API_URL);
        if (res.ok) {
            allPets = await res.json();
            render();
        }
    } catch (err) {
        console.error("Failed to fetch pets", err);
    }
}

async function loadPets() {
    try {
        const res = await fetchWithAuth(API_URL);
        if (res.ok) {
            allPets = await res.json();
            render();
        }
    } catch (err) {
        console.error("Failed to fetch pets", err);
    }
}

function render() {
    let pets = role === "admin" ? allPets : allPets.filter(p => p.createdBy === username);

    let query = searchInput.value.trim().toLowerCase();
    let field = searchField.value;
    if (query) {
        pets = pets.filter(p => String(p[field] ?? "").toLowerCase().includes(query));
    }

    table.innerHTML = "";
    cardView.innerHTML = "";

    if (pets.length === 0) {
        empty.classList.remove("d-none");
        empty.textContent = query ? "No pets match your search." : "No pets added yet.";
    } else {
        empty.classList.add("d-none");
    }

    pets.forEach(pet => {
        table.innerHTML += `
        <tr>
            <td>${pet.id}</td>
            <td>${pet.petName}</td>
            <td>${pet.type}</td>
            <td>${pet.owner}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editPet('${pet.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deletePet('${pet.id}')">Delete</button>
            </td>
        </tr>
        `;

        cardView.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="pet-card h-100 p-3">
                <div class="pet-card-emoji"><img src="${typeImage[pet.type] || ''}" alt="${pet.type}" style="width:64px;height:64px;object-fit:contain"></div>
                <h5 class="mb-1 text-center">${pet.petName}</h5>
                <p class="text-muted small text-center mb-2">${pet.type}</p>
                <p class="small mb-1"><b>Owner:</b> ${pet.owner}</p>
                <p class="small text-muted mb-3">${pet.id}</p>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-outline-primary flex-fill" onclick="editPet('${pet.id}')">Edit</button>
                    <button class="btn btn-sm btn-danger flex-fill" onclick="deletePet('${pet.id}')">Delete</button>
                </div>
            </div>
        </div>
        `;
    });
}

function editPet(id) {
    window.location.href = `edit-pet.html?id=${id}`;
    window.location.href = `edit-pet.html?id=${id}`;
}

async function deletePet(id) {
    try {
        await fetchWithAuth(`${API_URL}/${id}`, { method: 'DELETE' });
        allPets = allPets.filter(p => p.id !== id);
        render();
    } catch (err) {
        console.error("Failed to delete pet", err);
    }
async function deletePet(id) {
    try {
        await fetchWithAuth(`${API_URL}/${id}`, { method: 'DELETE' });
        allPets = allPets.filter(p => p.id !== id);
        render();
    } catch (err) {
        console.error("Failed to delete pet", err);
    }
}

loadPets();
loadPets();
