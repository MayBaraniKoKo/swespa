// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Gallery filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Stop normal form submit
    
    const form = event.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById("formMessage");

    fetch("contact.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(responseText => {
        if (responseText.trim() === "OK") {
            formMessage.textContent = "✅ Your message has been sent successfully!";
            formMessage.className = "form-message success";
            formMessage.style.display = "block";
            form.reset(); // Reset form
        } else {
            formMessage.textContent = "❌ Oops! Something went wrong. Please try again.";
            formMessage.className = "form-message error";
            formMessage.style.display = "block";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        formMessage.textContent = "❌ Network error. Please try again later.";
        formMessage.className = "form-message error";
        formMessage.style.display = "block";
    });
});
