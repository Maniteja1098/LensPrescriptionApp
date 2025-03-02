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

// Function to submit the form
function submitForm() {
    // Get form values
    const patientName = document.getElementById("patientName").value.trim();
    const age = document.getElementById("age").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);

    // Validate required fields
    if (!patientName || !age || !amount) {
        alert("Please fill in all required fields.");
        return;
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    // Increment prescription count
    prescriptionCount++;

    // Add the entered amount to the total amount earned
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

    // Function to reset counters (for testing)
        function resetCounters() {
            prescriptionCount = 0;
            amountEarned = 0;
            updateStats(); // Update the UI
            localStorage.setItem("prescriptionCount", 0); // Reset in localStorage
            localStorage.setItem("amountEarned", 0); // Reset in localStorage
            alert("Counters have been reset.");
        }

// Auto-fill the current date
document.getElementById("currentDate").textContent = new Date().toLocaleDateString();
document.getElementById("currentDate").textContent = new Date().toLocaleDateString();


function sendWhatsApp() {
let mobile = document.getElementById("patientMobile").value.trim();
let whatsappURL = `https://wa.me/${mobile}?text=${encodedMessage}`;
    // Get patient details
    let patientName = document.getElementById("patientName").value || "N/A";
    let age = document.getElementById("age").value || "N/A";
    let gender = document.getElementById("gender").value || "N/A";
    let village = document.getElementById("village").value || "N/A";
    
    // Get prescription details
    let leftSPH = document.getElementById("leftSPH").value || "N/A";
    let leftCYL = document.getElementById("leftCYL").value || "N/A";
    let leftAXIS = document.getElementById("leftAXIS").value || "N/A";
    let rightSPH = document.getElementById("rightSPH").value || "N/A";
    let rightCYL = document.getElementById("rightCYL").value || "N/A";
    let rightAXIS = document.getElementById("rightAXIS").value || "N/A";
    
    // Get lens type
    let lensTypes = [];
    if (document.getElementById("blueCut").checked) lensTypes.push("Blue Cut");
    if (document.getElementById("progressive").checked) lensTypes.push("Progressive");
    if (document.getElementById("bifocal").checked) lensTypes.push("Bifocal");
    if (document.getElementById("antiGlare").checked) lensTypes.push("Anti-Glare");
    
    let lensTypeText = lensTypes.length > 0 ? lensTypes.join(", ") : "N/A";
    
    // Get amount
    let amount = document.getElementById("amount").value || "0";
    
    // Construct the message
    let message = `👓 *Srinidhi Eye Care & Optical* 👁️\n\n` +
                  `📌 *Patient Details:*\n` +
                  `👤 Name: ${patientName}\n` +
                  `🎂 Age: ${age}\n` +
                  `⚧ Gender: ${gender}\n` +
                  `🏠 Village: ${village}\n\n` +
                  `📌 *Prescription Details:*\n` +
                  `👀 Left Eye: SPH: ${leftSPH}, CYL: ${leftCYL}, AXIS: ${leftAXIS}\n` +
                  `👁 Right Eye: SPH: ${rightSPH}, CYL: ${rightCYL}, AXIS: ${rightAXIS}\n\n` +
                  `📌 *Lens Type:* ${lensTypeText}\n\n` +
                  `💰 *Total Amount:* ₹${amount}\n\n` +
                  `📞 *For More Details Contact:* +91 96037 69267`;
    
    // Encode message for WhatsApp
    let encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp
    let whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
}
