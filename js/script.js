document.addEventListener("DOMContentLoaded", function () {
    // Elements for Navbar & Search
    const navLinks = document.querySelector(".nav-links");
    const searchContainer = document.querySelector(".search-container");
    const searchIcon = document.querySelector(".search-btn");
    const hamburger = document.querySelector(".hamburger");
    const overlay = document.querySelector(".overlay");
    const closeMenuBtn = document.querySelector(".close-menu");
    const lazyImage = document.getElementById("lazy-bg");
    let isSearchOpen = false;

    // Toggle Search Bar
    function toggleSearchBar() {
        if (!searchContainer || !navLinks) return; // Prevent errors

        if (searchContainer.style.display === "flex") {
            searchContainer.style.display = "none";
            isSearchOpen = false;
        } else {
            searchContainer.style.display = "flex";
            isSearchOpen = true;
        }

        // Toggle navLinks visibility based on search bar state
        navLinks.style.display = isSearchOpen ? "none" : "flex";
    }

    // Toggle Mobile Menu
    function toggleMenu(event) {
        if (!navLinks || !overlay) return;
        event.stopPropagation();
        navLinks.classList.toggle("active");
        overlay.classList.toggle("show");
    }

    // Close Menu & Search When Clicking Outside
    function closeMenu(event) {
        if (navLinks && hamburger && !navLinks.contains(event.target) && !hamburger.contains(event.target)) {
            navLinks.classList.remove("active");
            overlay.classList.remove("show");
        }

        if (searchContainer && searchIcon && !searchContainer.contains(event.target) && !searchIcon.contains(event.target)) {
            searchContainer.style.display = "none";
            isSearchOpen = false;
            if (navLinks) navLinks.style.display = "flex";
        }
    }

    // Lazy load newsletter image
    if (lazyImage) {
        lazyImage.onload = function () {
            lazyImage.classList.add("loaded");
        };
        lazyImage.onerror = function () {
            console.error("Image failed to load:", lazyImage.src);
        };
    }

    // Event Listeners for Navbar and Search
    if (searchIcon) {
        searchIcon.addEventListener("click", toggleSearchBar);
    }

    if (hamburger) {
        hamburger.addEventListener("click", toggleMenu);
    }

    if (overlay) {
        overlay.addEventListener("click", closeMenu);
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener("click", closeMenu);
    }

    // Close sidebar & search bar when clicking outside
    document.addEventListener("click", closeMenu);

    // Fix for Mobile Menu Closing on Resize
    window.addEventListener("resize", function () {
        if (window.innerWidth > 1024 && navLinks && overlay) {
            navLinks.classList.remove("active");
            overlay.classList.remove("show");
        }
    });

    // Close Search Bar and Sidebar on Escape Key Press
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            if (navLinks) navLinks.classList.remove("active");
            if (overlay) overlay.classList.remove("show");
            if (searchContainer) searchContainer.style.display = "none";
            if (navLinks) navLinks.style.display = "flex";
            isSearchOpen = false;
        }
    });

    // ** Reviews Section JS (Show 3 slides at once) **
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const slides = document.querySelectorAll(".review");
    const dots = document.querySelectorAll(".dot");
    let currentSlide = 0;

    const slidesToShow = 3; // Number of slides to show at once

    function showSlides(startIndex) {
        // Hide all slides
        slides.forEach((slide) => slide.style.display = "none");

        // Show the next 'slidesToShow' number of slides
        for (let i = startIndex; i < startIndex + slidesToShow && i < slides.length; i++) {
            slides[i].style.display = "block";
        }

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.remove("active");
            if (index >= startIndex / slidesToShow && index < (startIndex + slidesToShow) / slidesToShow) {
                dot.classList.add("active");
            }
        });
    }

    prevBtn.addEventListener("click", () => {
        currentSlide -= slidesToShow;
        if (currentSlide < 0) currentSlide = Math.max(0, slides.length - slidesToShow); // Prevent going below 0
        showSlides(currentSlide);
    });

    nextBtn.addEventListener("click", () => {
        currentSlide += slidesToShow;
        if (currentSlide >= slides.length) currentSlide = 0; // Loop back to the first set of slides
        showSlides(currentSlide);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index * slidesToShow;
            showSlides(currentSlide);
        });
    });

    showSlides(currentSlide); // Initialize the first set of slides

    // ** FAQ Section JS **
    const faqItems = document.querySelectorAll(".faq-item");
    const seeAllFaqsBtn = document.querySelector(".see-all-faqs");

    if (faqItems.length > 0 && seeAllFaqsBtn) {
        // Initially hide extra FAQs (for this example, I'm assuming 5 questions are initially shown)
        faqItems.forEach((faq, index) => {
            if (index >= 5) {
                faq.style.display = "none";
            }
        });

        faqItems.forEach((faq) => {
            const question = faq.querySelector(".faq-question");
            question.addEventListener("click", () => {
                const answer = faq.querySelector(".faq-answer");
                answer.style.display = answer.style.display === "none" ? "block" : "none";
                question.querySelector("span").textContent = answer.style.display === "none" ? "+" : "−";
            });
        });

        seeAllFaqsBtn.addEventListener("click", () => {
            faqItems.forEach((faq) => {
                faq.style.display = "block"; // Show all FAQs
            });
            seeAllFaqsBtn.style.display = "none"; // Hide the "See All FAQs" button
        });
    }
});
function playVideo() {
    let video = document.querySelector(".video");
    let playButton = document.querySelector(".play-button");
    
    if (video.paused) {
        video.play();
        playButton.style.display = "none"; // Hide play button after play
    }
}
document.getElementById("checkout-btn").addEventListener("click", function () {
    let selectedProduct = document.querySelector('input[name="product"]:checked').value;
    
    if (selectedProduct === "alcami") {
        window.location.href = "checkout-alcami.html";
    } else if (selectedProduct === "mudwtr") {
        window.location.href = "checkout-mudwtr.html";
    } else if (selectedProduct === "ryze") {
        window.location.href = "checkout-ryze.html";
    } else if (selectedProduct === "everyday-dose") {
        window.location.href = "checkout-everyday-dose.html";
    }
});
document.querySelector(".checkout-btn").addEventListener("click", function() {
    alert("Redirecting to checkout...");
    window.location.href = "checkout.html"; // Replace with actual checkout URL
});
/* comparision */
function selectColumn(colIndex) {
    document.querySelectorAll('td, th').forEach(cell => {
        cell.classList.remove('selected-column');
    });
    document.querySelectorAll(`td:nth-child(${colIndex + 1}), th:nth-child(${colIndex + 1})`).forEach(cell => {
        cell.classList.add('selected-column');
    });
}



/* lazy loading */

/* body {
    /* font-family: 'NewRailAlphabetBold', 'NewRailAlphabetLight','NewRailAlphabetWhite'; */
    /* margin: 0;
    padding: 0;
    background: linear-gradient(to bottom, #d3d3d3 0%, #eaeaea 20%, #ffffff 35%, #ffffff 100%);
    background-repeat: no-repeat;
    background-attachment: fixed;
    overflow-x: hidden;
    box-sizing: border-box;
} */