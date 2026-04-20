if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

let currentUser = localStorage.getItem("username");
let currentRole = localStorage.getItem("role");
let id = localStorage.getItem('editPetId');
let pets = JSON.parse(localStorage.getItem('pets')) || [];
let pet = pets.find(p => p.id === id);

if (pet && currentRole !== "admin" && pet.createdBy !== currentUser) {
    alert("You can only edit your own pets.");
    location.href = "index.html";
}

if (currentRole !== "admin") {
    document.getElementById("ownerField").style.display = "none";
    document.getElementById("owner").removeAttribute("required");
}

if (pet) {
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
}

function updatePet(event) {
    event.preventDefault();
    pet.petName = petName.value;
    pet.type = type.value;
    pet.owner = currentRole === "admin" ? owner.value : currentUser;
    localStorage.setItem('pets', JSON.stringify(pets));
    location.href = 'index.html';
}
