// Display Current Date
document.getElementById("currentDate").innerText = new Date().toLocaleDateString();

// Generate Prescription (Formats for Everycom EC-58 Printer)
document.getElementById("generatePrescription").addEventListener("click", function() {
    alert("Prescription formatted for Everycom EC-58 Printer!");
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

function printPrescription() {
    var ifr = document.createElement('iframe');
    ifr.style.visibility = 'hidden';
    ifr.src = window.location.href;  // Load the current page inside iframe
    document.body.appendChild(ifr);
    ifr.contentWindow.print();  // Call print inside the iframe
}

