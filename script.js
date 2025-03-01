// Display Current Date
document.getElementById("currentDate").innerText = new Date().toLocaleDateString();

// Generate Prescription (Formats for Everycom EC-58 Printer)
document.getElementById("generatePrescription").addEventListener("click", function() {
    alert("Prescription formatted for Everycom EC-58 Printer!");
});

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;

    // Show install prompt automatically after 3 seconds
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
    }, 3000); // Change timing if needed
});

// Generate PDF
function generatePDF() {
    var element = document.getElementById('prescription');  // Get the prescription div
    var opt = {
        margin: 5,
        filename: 'Prescription.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).toPdf().get('pdf').then(function(pdf) {
        var blobURL = URL.createObjectURL(pdf.output('blob'));
        window.open(blobURL, '_blank');  // Open PDF in new tab for printing
    }).catch(error => console.error("PDF generation error:", error));
}