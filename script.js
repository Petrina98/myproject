// Flight log data (stored in localStorage)
let flightLogData = JSON.parse(localStorage.getItem("flightLogData")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Reference to DOM elements
const loginPage = document.getElementById("loginPage");
const flightLogPage = document.getElementById("flightLogPage");
const flightLogList = document.getElementById("flightLogList");

function login() {
    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;
    // Implement user authentication logic here (e.g., check against a predefined user)
    if (loginUsername === "user" && loginPassword === "password") {
        currentUser = loginUsername;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        loginPage.style.display = "none";
        flightLogPage.style.display = "block";
        displayFlightLogEntries();
    } else {
        alert("Invalid username or password.");
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem("currentUser");
    flightLogPage.style.display = "none";
    loginPage.style.display = "block";
}

function displayFlightLogEntries() {
    flightLogList.innerHTML = "";
    flightLogData.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Entry ${index + 1}: Tail Number: ${entry.tailNumber}, Flight ID: ${entry.flightID}, Takeoff: ${entry.takeoff}, Landing: ${entry.landing}, Duration: ${entry.duration} hours`;
        flightLogList.appendChild(listItem);
    });
}

function addFlightLogEntry() {
    const tailNumber = document.getElementById("tailNumber").value;
    const flightID = document.getElementById("flightID").value;
    const takeoff = document.getElementById("takeoff").value;
    const landing = document.getElementById("landing").value;
    const duration = document.getElementById("duration").value;
    const newEntry = {
        tailNumber,
        flightID,
        takeoff,
        landing,
        duration,
    };
    flightLogData.push(newEntry);
    localStorage.setItem("flightLogData", JSON.stringify(flightLogData));
    displayFlightLogEntries();
}

function updateFlightLogEntry() {
    const updateIndex = document.getElementById("updateIndex").value;
    if (!isNaN(updateIndex) && updateIndex >= 1 && updateIndex <= flightLogData.length) {
        const updatedEntry = {
            tailNumber: document.getElementById("tailNumber").value,
            flightID: document.getElementById("flightID").value,
            takeoff: document.getElementById("takeoff").value,
            landing: document.getElementById("landing").value,
            duration: document.getElementById("duration").value,
        };
        flightLogData[updateIndex - 1] = updatedEntry;
        localStorage.setItem("flightLogData", JSON.stringify(flightLogData));
        displayFlightLogEntries();
    } else {
        alert("Invalid entry index to update.");
    }
}

function deleteFlightLogEntry() {
    const deleteIndex = document.getElementById("deleteIndex").value;
    if (!isNaN(deleteIndex) && deleteIndex >= 1 && deleteIndex <= flightLogData.length) {
        flightLogData.splice(deleteIndex - 1, 1);
        localStorage.setItem("flightLogData", JSON.stringify(flightLogData));
        displayFlightLogEntries();
    } else {
        alert("Invalid entry index to delete.");
    }
}

function searchByFlightID() {
    const searchFlightID = document.getElementById("searchFlightID").value;
    const filteredEntries = flightLogData.filter((entry) =>
        entry.flightID.toLowerCase() === searchFlightID.toLowerCase()
    );
    flightLogList.innerHTML = "";
    filteredEntries.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Search Result ${index + 1}: Tail Number: ${entry.tailNumber}, Flight ID: ${entry.flightID}, Takeoff: ${entry.takeoff}, Landing: ${entry.landing}, Duration: ${entry.duration} hours`;
        flightLogList.appendChild(listItem);
    });
}

// Check if a user is already logged in
if (currentUser) {
    loginPage.style.display = "none";
    flightLogPage.style.display = "block";
    displayFlightLogEntries();
}
