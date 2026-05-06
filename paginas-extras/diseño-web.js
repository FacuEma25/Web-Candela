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
    const cards = document.querySelectorAll(".web-page-card");

    if (!track || !prev || !next || !cards.length) return;

    let index = 0;

    function updateCarousel() {
        const width = track.clientWidth;
        track.scrollTo({
            left: width * index,
            behavior: "smooth"
        });
    }

    next.addEventListener("click", () => {
        index = (index + 1) % cards.length;
        updateCarousel();
    });

    prev.addEventListener("click", () => {
        index = (index - 1 + cards.length) % cards.length;
        updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
});