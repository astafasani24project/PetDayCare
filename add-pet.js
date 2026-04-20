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

function addPet(event) {
    event.preventDefault();
    let pets = JSON.parse(localStorage.getItem('pets')) || [];
    pets.push({
        id: 'PET-' + Date.now(),
        petName: petName.value,
        type: type.value,
        owner: currentRole === "admin" ? owner.value : currentUser,
        createdBy: currentUser
    });
    localStorage.setItem('pets', JSON.stringify(pets));
    location.href = 'index.html';
}
