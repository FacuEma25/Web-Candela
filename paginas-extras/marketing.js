document.addEventListener('DOMContentLoaded', () => {
    const menuCheckbox = document.getElementById('menu');
    const navLinks = document.querySelectorAll('.menu .navbar a');

    if (!menuCheckbox || !navLinks.length) return;

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuCheckbox.checked = false;
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const planCards = document.querySelectorAll("[data-plan-card]");

    if (!planCards.length) return;

    planCards.forEach(card => {
        const toggle = card.querySelector("[data-plan-toggle]");
        const content = card.querySelector("[data-plan-content]");

        if (!toggle || !content) return;

        toggle.addEventListener("click", () => {
            const isActive = card.classList.contains("active");

            planCards.forEach(otherCard => {
                otherCard.classList.remove("active");

                const otherButton = otherCard.querySelector("[data-plan-toggle]");
                if (otherButton) otherButton.textContent = "Más info";
            });

            if (!isActive) {
                card.classList.add("active");
                toggle.textContent = "Cerrar";
            }
        });
    });
});