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

            fotoStack.appendChild(img);
        });
    }

    function cambiarFoto(direccion) {
        const fotos = rubros[rubroActual].fotos;
        fotoActual = (fotoActual + direccion + fotos.length) % fotos.length;
        renderGaleria();
    }

    function cambiarRubro(direccion) {
        rubroActual = (rubroActual + direccion + rubros.length) % rubros.length;
        fotoActual = 0;
        renderGaleria();
    }

    prevRubro?.addEventListener("click", () => cambiarRubro(-1));
    nextRubro?.addEventListener("click", () => cambiarRubro(1));
    prevFoto?.addEventListener("click", () => cambiarFoto(-1));
    nextFoto?.addEventListener("click", () => cambiarFoto(1));

    renderGaleria(); // 🔥 esto ahora carga las fotos apenas abre la página
});