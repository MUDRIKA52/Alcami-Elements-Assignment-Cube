function animateCounters(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                let start = 0;
                const target = +counter.getAttribute('data-target');
                const increment = target / 50; // Speed of animation

                function updateCounter() {
                    if (start < target) {
                        start += increment;
                        counter.innerText = Math.floor(start);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                }

                // Reset to 0 before starting
                counter.innerText = "0";
                updateCounter();
            });
        }
    });
}

const observer = new IntersectionObserver(animateCounters, {
    threshold: 0.5 // Animation triggers when 50% of the section is visible
});

const statsSection = document.querySelector('.stats');
observer.observe(statsSection);