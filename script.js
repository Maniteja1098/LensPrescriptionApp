 // Auto-fill the current date
        document.getElementById("currentDate").textContent = new Date().toLocaleDateString();

        // Generate PDF
        function generatePDF() {
            const element = document.getElementById('prescription');
            html2pdf().from(element).save('Lens_Prescription.pdf');
        }

        // Reset Form
        function resetForm() {
            document.getElementById("patientName").value = "";
            document.getElementById("age").value = "";
            document.getElementById("gender").value = "Male"; // Default value
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
