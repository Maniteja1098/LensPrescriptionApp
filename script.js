 // Auto-fill the current date
        document.getElementById("currentDate").textContent = new Date().toLocaleDateString();

        // Generate PDF
        function generatePDF() {
            const element = document.getElementById('prescription');
            html2pdf().from(element).save('Lens_Prescription.pdf');
        }

        // PWA Installation
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(() => console.log("Service Worker Registered"))
                .catch((error) => console.log("Service Worker Registration Failed", error));
        }

        // Handle PWA Install Prompt
        let deferredPrompt;
        window.addEventListener("beforeinstallprompt", (event) => {
            event.preventDefault();
            deferredPrompt = event;

            // Show install prompt after 3 seconds
            setTimeout(() => {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then((choiceResult) => {
                        if (choiceResult.outcome === "accepted") {
                            console.log("User accepted the install prompt.");
                        } else {
                            console.log("User dismissed the install prompt.");
                        }
                        deferredPrompt = null;
                    }).catch(error => console.error("Install prompt error:", error));
                }
            }, 3000);
        });
// Initialize counters
let prescriptionCount = 0;
let amountEarned = 0;

// Function to update prescription count and amount earned
function updateStats() {
    document.getElementById("prescriptionCount").textContent = prescriptionCount;
    document.getElementById("amountEarned").textContent = amountEarned.toFixed(2); // Format to 2 decimal places
}

// Function to check if the day has changed
function checkDayChange() {
    const today = new Date().toLocaleDateString(); // Get current date in "MM/DD/YYYY" format
    const lastUpdatedDate = localStorage.getItem("lastUpdatedDate");

    if (lastUpdatedDate !== today) {
        // Day has changed, reset counters
        prescriptionCount = 0;
        amountEarned = 0;
        localStorage.setItem("lastUpdatedDate", today); // Update the last updated date
    } else {
        // Day has not changed, load existing counters from localStorage
        prescriptionCount = parseInt(localStorage.getItem("prescriptionCount")) || 0;
        amountEarned = parseFloat(localStorage.getItem("amountEarned")) || 0;
    }

    updateStats(); // Update the UI with the current counters
}

// Function to save counters to localStorage
function saveCounters() {
    localStorage.setItem("prescriptionCount", prescriptionCount);
    localStorage.setItem("amountEarned", amountEarned);
}

// Check for day change when the page loads
checkDayChange();

// Function to submit prescription
function submitPrescription() {
    const patientName = document.getElementById("patientName").value.trim();
    const age = document.getElementById("age").value.trim();
    const amount = document.getElementById("amount").value.trim();

    if (!patientName || !age || !amount) {
        alert("Please fill in all required fields.");
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }


// Function to submit the form
function submitForm() {
    // Increment prescription count
    prescriptionCount++;

    // Add the entered amount to the total amount earned
    const amount = parseFloat(document.getElementById("amount").value) || 0;
    amountEarned += amount;

    // Update the UI with the new counters
    updateStats();

    // Save the updated counters to localStorage
    saveCounters();

    // Reset the form for the next prescription
    resetForm();
}

// Reset form fields
function resetForm() {
    document.getElementById("patientName").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "Male";
    document.getElementById("village").value = "";

    document.getElementById("leftSPH").value = "";
    document.getElementById("leftCYL").value = "";
    document.getElementById("leftAXIS").value = "";
    document.getElementById("rightSPH").value = "";
    document.getElementById("rightCYL").value = "";
    document.getElementById("rightAXIS").value = "";

    document.getElementById("blueCut").checked = false;
    document.getElementById("progressive").checked = false;
    document.getElementById("bifocal").checked = false;
    document.getElementById("antiGlare").checked = false;

    document.getElementById("amount").value = "";
}

// Auto-fill the current date
document.getElementById("currentDate").textContent = new Date().toLocaleDateString();
