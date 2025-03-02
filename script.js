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
        
        // Open PDF in a new tab for preview & printing
        var newTab = window.open(blobURL, '_blank');
        if (!newTab) {
            alert("Please allow pop-ups to view the PDF.");
        }
    }).catch(error => console.error("PDF generation error:", error));
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

    document.querySelectorAll("input[type=checkbox]").forEach(el => el.checked = false);
    
    document.getElementById("amount").value = "";
}

// Print PDF Directly
function printPDF() {
    var element = document.getElementById('prescription');
    
    html2pdf().from(element).set({ filename: 'Prescription.pdf' }).toPdf().get('pdf').then(function(pdf) {
        var blobURL = URL.createObjectURL(pdf.output('blob'));

        var iframe = document.createElement('iframe');
        iframe.style.visibility = "hidden";
        iframe.src = blobURL;
        document.body.appendChild(iframe);

        iframe.onload = function() {
            iframe.contentWindow.focus();
            setTimeout(() => iframe.contentWindow.print(), 500); // Small delay to apply styles
        };
    });
}

// Directly Print Prescription (Better for Kodular)
function printPrescription() {
    var printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(document.getElementById("prescription").outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    
    printWindow.onload = function() {
        printWindow.focus();
        setTimeout(() => printWindow.print(), 500); // Delay to allow styles to load
    };
}
