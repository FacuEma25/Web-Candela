/* =========================
   SCROLL REVEAL
========================= */

document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );

    if (!revealElements.length) return;

    /* Fallback para navegadores sin IntersectionObserver */
    if (!("IntersectionObserver" in window)) {
        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });

        return;
    }

    const observerOptions = {
        root: null,
        threshold: 0.08,
        rootMargin: "0px 0px -35px 0px"
    };

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        });
    }, observerOptions);

    revealElements.forEach(element => {
        /*
         * Los elementos que ya están visibles al cargar la página
         * aparecen inmediatamente, sin esperar al observer.
         */
        const rect = element.getBoundingClientRect();

        const visibleInitially =
            rect.top < window.innerHeight &&
            rect.bottom > 0;

        if (visibleInitially) {
            element.classList.add("is-visible");
            return;
        }

        revealObserver.observe(element);
    });
});