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


/* FOTOS */
document.addEventListener("DOMContentLoaded", () => {

    const rubros = [
        {
            nombre: "Moda",
            fotos: [
                "img/Moda (1).png",
                "img/Moda (2).png",
                "img/Moda (3).png",
                "img/Moda (4).png"
            ]
        },
        {
            nombre: "Joyas",
            fotos: [
                "img/Joyas (1).png",
                "img/Joyas (2).png",
                "img/Joyas (3).png",
                "img/Joyas (4).png"
            ]
        },
        {
            nombre: "Tecnología",
            fotos: [
                "img/Tecnologia (1).png",
                "img/Tecnologia (2).png",
                "img/Tecnologia (3).png",
                "img/Tecnologia (4).png"
            ]
        }
    ];

    let rubroActual = 0;
    let fotoActual = 0;

    const rubroNombre = document.getElementById("rubroNombre");
    const fotoStack = document.getElementById("fotoStack");

    const prevRubro = document.querySelector(".prev-rubro");
    const nextRubro = document.querySelector(".next-rubro");
    const prevFoto = document.querySelector(".prev-foto");
    const nextFoto = document.querySelector(".next-foto");
    const galeriaModal = document.getElementById("galeriaModal");
    const modalImg = document.getElementById("modalImg");
    const modalClose = document.getElementById("modalClose");
    const modalPrev = document.getElementById("modalPrev");
    const modalNext = document.getElementById("modalNext");

    if (!rubroNombre || !fotoStack) return;

    function getPrevIndex() {
        const fotos = rubros[rubroActual].fotos;
        return (fotoActual - 1 + fotos.length) % fotos.length;
    }

    function getNextIndex() {
        const fotos = rubros[rubroActual].fotos;
        return (fotoActual + 1) % fotos.length;
    }

    function renderGaleria() {
        const rubro = rubros[rubroActual];

        rubroNombre.textContent = rubro.nombre;
        fotoStack.innerHTML = "";

        rubro.fotos.forEach((src, index) => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = `${rubro.nombre} ${index + 1}`;
            img.classList.add("gallery-img");

            if (index === fotoActual) {
                img.classList.add("active");
            } else if (index === getPrevIndex()) {
                img.classList.add("prev");
            } else if (index === getNextIndex()) {
                img.classList.add("next");
            } else {
                img.classList.add("hidden");
            }

            img.addEventListener("click", () => {
                fotoActual = index;
                abrirModal();
                renderGaleria();
            });
            fotoStack.appendChild(img);
        });
    }

    function cambiarFoto(direccion) {
        const fotos = rubros[rubroActual].fotos;

        fotoActual = (fotoActual + direccion + fotos.length) % fotos.length;

        fotoStack.classList.add("animating");

        setTimeout(() => {
            renderGaleria();
            actualizarModal();
            fotoStack.classList.remove("animating");
        }, 80);
    }

    function cambiarRubro(direccion) {
        rubroActual = (rubroActual + direccion + rubros.length) % rubros.length;
        fotoActual = 0;
        renderGaleria();
    }
    function abrirModal() {
        if (!galeriaModal || !modalImg) return;

        modalImg.src = rubros[rubroActual].fotos[fotoActual];
        galeriaModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function cerrarModal() {
        if (!galeriaModal) return;

        galeriaModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    function actualizarModal() {
        if (!galeriaModal?.classList.contains("active")) return;

        modalImg.src = rubros[rubroActual].fotos[fotoActual];
    }

    prevRubro?.addEventListener("click", () => cambiarRubro(-1));
    nextRubro?.addEventListener("click", () => cambiarRubro(1));
    prevFoto?.addEventListener("click", () => cambiarFoto(-1));
    nextFoto?.addEventListener("click", () => cambiarFoto(1));

    modalClose?.addEventListener("click", cerrarModal);
    modalPrev?.addEventListener("click", () => cambiarFoto(-1));
    modalNext?.addEventListener("click", () => cambiarFoto(1));

    galeriaModal?.addEventListener("click", (e) => {
        if (e.target === galeriaModal) cerrarModal();
    });

    document.addEventListener("keydown", (e) => {
        if (!galeriaModal?.classList.contains("active")) return;

        if (e.key === "Escape") cerrarModal();
        if (e.key === "ArrowLeft") cambiarFoto(-1);
        if (e.key === "ArrowRight") cambiarFoto(1);
    });

    renderGaleria(); // 🔥 esto ahora carga las fotos apenas abre la página
});