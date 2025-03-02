// Firebase configuration
       const firebaseConfig = {
  apiKey: "AIzaSyCSA8rZtaFsjDxLe8SvU1neKtNpXOCXobY",
  authDomain: "lensprescriptionapp-516f0.firebaseapp.com",
  projectId: "lensprescriptionapp-516f0",
  storageBucket: "lensprescriptionapp-516f0.firebasestorage.app",
  messagingSenderId: "255818943089",
  appId: "1:255818943089:web:616bf6faa4460eae3be9d0",
  measurementId: "G-Z80F9WGLQB"
};

        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();


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
async function submitForm() {
    // Get form values
    const patientName = document.getElementById("patientName").value.trim();
    const age = document.getElementById("age").value.trim();
    const gender = document.getElementById("gender").value;
    const village = document.getElementById("village").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);

    const leftSPH = document.getElementById("leftSPH").value;
    const leftCYL = document.getElementById("leftCYL").value;
    const leftAXIS = document.getElementById("leftAXIS").value;
    const rightSPH = document.getElementById("rightSPH").value;
    const rightCYL = document.getElementById("rightCYL").value;
    const rightAXIS = document.getElementById("rightAXIS").value;

    const blueCut = document.getElementById("blueCut").checked;
    const progressive = document.getElementById("progressive").checked;
    const bifocal = document.getElementById("bifocal").checked;
    const antiGlare = document.getElementById("antiGlare").checked;

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

    // Create prescription object
    const prescription = {
        patientName,
        age,
        gender,
        village,
        amount,
        leftEye: { SPH: leftSPH, CYL: leftCYL, AXIS: leftAXIS },
        rightEye: { SPH: rightSPH, CYL: rightCYL, AXIS: rightAXIS },
        lensType: { blueCut, progressive, bifocal, antiGlare },
        date: new Date().toLocaleDateString()
    };

    // Save prescription to Firestore
    try {
        await db.collection("prescriptions").add(prescription);
        alert("Prescription saved successfully!");
    } catch (error) {
        console.error("Error saving prescription: ", error);
        alert("Failed to save prescription.");
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
   // Function to fetch and display prescriptions
        async function fetchPrescriptions() {
            try {
                const querySnapshot = await db.collection("prescriptions").get();
                const prescriptions = querySnapshot.docs.map(doc => doc.data());

                // Display prescriptions (you can customize this part)
                console.log("Stored Prescriptions:", prescriptions);
            } catch (error) {
                console.error("Error fetching prescriptions: ", error);
            }
        }

        // Call fetchPrescriptions to load data when the page loads
        fetchPrescriptions();


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
