<script>
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Stop the default form submit
    
    const form = event.target;
    const formData = new FormData(form);

    fetch("contact.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(responseText => {
        // Optionally you can check if PHP returns "OK" or "Success"
        document.getElementById("formMessage").style.display = "block";
        form.reset(); // Reset the form
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Oops! Something went wrong.");
    });
});
</script>
