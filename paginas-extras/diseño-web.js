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
    const track = document.querySelector(".web-pages-track");
    const prev = document.querySelector(".web-prev");
    const next = document.querySelector(".web-next");

    if (!track || !prev || !next) return;

    function getScrollAmount() {
        const card = track.querySelector(".web-page-card");
        if (!card) return 300;

        const gap = 28;
        return card.offsetWidth + gap;
    }

    prev.addEventListener("click", () => {
        track.scrollBy({
            left: -getScrollAmount(),
            behavior: "smooth"
        });
    });

    next.addEventListener("click", () => {
        track.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth"
        });
    });
});