document.addEventListener("DOMContentLoaded", () => {
    // --- 0. Mobile Hamburger Menu Logic ---
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }
    // --- 1. Customer vs Wholesale Dealer Logic (Contact Page) ---
    const customerTypeSelect = document.getElementById("customerType");
    const wholesaleFields = document.getElementById("wholesaleFields");

    if (customerTypeSelect && wholesaleFields) {
        customerTypeSelect.addEventListener("change", function() {
            if (this.value === "Wholesale Dealer") {
                wholesaleFields.classList.remove("hidden");
                // Make fields required if wholesale
                document.getElementById("company").setAttribute("required", "true");
            } else {
                wholesaleFields.classList.add("hidden");
                // Remove required attribute
                document.getElementById("company").removeAttribute("required");
            }
        });
    }

    // --- 2. Lead Capture Popup Logic (About Page) ---
    const modal = document.getElementById("leadModal");
    const closeBtn = document.getElementById("closeModal");
    const openBtns = document.querySelectorAll(".open-popup");

    if (modal) {
        // Open manually via buttons
        openBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                modal.classList.add("active");
            });
        });

        // Close via X button
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.classList.remove("active");
            });
        }

        // Close when clicking outside the modal content
        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });

        // 5-Second Delay Auto-Popup (only triggers once per session)
        if (!sessionStorage.getItem('popupShown')) {
            setTimeout(() => {
                modal.classList.add("active");
                sessionStorage.setItem('popupShown', 'true');
            }, 5000); // 5000ms = 5 seconds
        }
    }
    // --- 3. Image Slider Logic (About Page) ---
    const track = document.getElementById('sliderTrack');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (track && slides.length > 0) {
        let currentIndex = 0;

        // Function to move the track to the correct slide
        const updateSlider = (index) => {
            // We shift the track by -100% multiplied by the current index
            track.style.transform = `translateX(-${index * 100}%)`;
        };

        // Event listener for NEXT button
        nextBtn.addEventListener('click', () => {
            currentIndex++;
            
            // Loop back to the start if at the last slide
            if (currentIndex >= slides.length) {
                currentIndex = 0; 
            }
            updateSlider(currentIndex);
        });

        // Event listener for PREVIOUS button
        prevBtn.addEventListener('click', () => {
            currentIndex--;
            
            // Go to the last slide if previous is clicked on the first slide
            if (currentIndex < 0) {
                currentIndex = slides.length - 1;
            }
            updateSlider(currentIndex);
        });

        // OPTIONAL: Automatic slide every 7 seconds
        let autoSlide = setInterval(() => {
            nextBtn.click(); // Simulates a click on the next button
        }, 7000);

        // Pause automatic sliding if user interacts
        const stopAutoSlide = () => {
            clearInterval(autoSlide);
        };

        nextBtn.addEventListener('click', stopAutoSlide);
        prevBtn.addEventListener('click', stopAutoSlide);
    }

    // --- 4. Image Lightbox Logic ---
    const imageModal = document.getElementById("imageModal");
    const expandedImg = document.getElementById("expandedImg");
    const closeImageModal = document.getElementById("closeImageModal");
    const sliderImages = document.querySelectorAll('.slide img');

    if (imageModal && expandedImg && sliderImages.length > 0) {
        // When any slider image is clicked
        sliderImages.forEach(img => {
            img.addEventListener('click', function() {
                imageModal.classList.add("active");
                expandedImg.src = this.src; // Copy the clicked image's source
            });
        });

        // Close when clicking the X
        closeImageModal.addEventListener('click', () => {
            imageModal.classList.remove("active");
        });

        // Close when clicking anywhere on the dark background
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.classList.remove("active");
            }
        });
    }
    
});
