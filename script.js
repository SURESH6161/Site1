document.addEventListener("DOMContentLoaded", () => {
    
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
});