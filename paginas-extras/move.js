/* PROBANDO SCROLL */
// SCROLL REVEAL - INTERSECTION OBSERVER
document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(".reveal");

    if (!revealElements.length) return;

    const isMobile = window.innerWidth <= 768;

    const observerOptions = {
        root: null,
        threshold: isMobile ? 0.05 : 0.15,
        rootMargin: isMobile ? "0px 0px -20px 0px" : "0px 0px -80px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});