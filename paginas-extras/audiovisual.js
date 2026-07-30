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


/* =========================
   GALERÍA AUDIOVISUAL
========================= */

document.addEventListener("DOMContentLoaded", () => {
    const rubros = [
        {
            nombre: "Vita Pilates",
            fotos: [
                "img/Vita (1).webp",
                "img/Vita (2).webp",
                "img/Vita (3).webp",
                "img/Vita (4).webp",
                "img/Vita (5).webp"
            ]
        },
        {
            nombre: "Las carmencitas té",
            fotos: [
                "img/LC Te (1).webp",
                "img/LC Te (2).webp",
                "img/LC Te (3).webp",
                "img/LC Te (4).webp",
                "img/LC Te (5).webp"
            ]
        },
        {
            nombre: "SL Joyas",
            fotos: [
                "img/SL Joyas (1).webp",
                "img/SL Joyas (2).webp",
                "img/SL Joyas (3).webp",
                "img/SL Joyas (4).webp"
            ]
        }
    ];

    let rubroActual = 0;
    let fotoActual = 0;
    let animando = false;

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

    function modulo(numero, total) {
        return ((numero % total) + total) % total;
    }

    function obtenerFotosActuales() {
        return rubros[rubroActual].fotos;
    }

    function precargarImagenes(fotos) {
        return Promise.all(
            fotos.map(src => {
                return new Promise(resolve => {
                    const imagen = new Image();

                    imagen.onload = resolve;
                    imagen.onerror = resolve;
                    imagen.src = src;
                });
            })
        );
    }

    function crearGaleria() {
        fotoStack.innerHTML = "";

        const rubro = rubros[rubroActual];

        rubroNombre.textContent = rubro.nombre;

        rubro.fotos.forEach((src, index) => {
            const img = document.createElement("img");

            img.src = src;
            img.alt = `${rubro.nombre}, fotografía ${index + 1}`;
            img.className = "gallery-img";
            img.dataset.index = index;
            img.draggable = false;
            img.loading = index === 0 ? "eager" : "lazy";
            img.decoding = "async";

            img.addEventListener("click", () => {
                if (animando) return;

                fotoActual = index;
                actualizarPosiciones();
                abrirModal();
            });

            fotoStack.appendChild(img);
        });

        actualizarPosiciones(false);
    }

    function actualizarPosiciones(conAnimacion = true) {
        const fotos = obtenerFotosActuales();
        const imagenes = fotoStack.querySelectorAll(".gallery-img");

        const anterior = modulo(fotoActual - 1, fotos.length);
        const siguiente = modulo(fotoActual + 1, fotos.length);

        if (!conAnimacion) {
            fotoStack.classList.add("sin-transicion");
        }

        imagenes.forEach((img, index) => {
            img.classList.remove(
                "active",
                "prev",
                "next",
                "hidden",
                "hidden-left",
                "hidden-right"
            );

            if (index === fotoActual) {
                img.classList.add("active");
                img.setAttribute("aria-current", "true");
            } else {
                img.removeAttribute("aria-current");

                if (index === anterior) {
                    img.classList.add("prev");
                } else if (index === siguiente) {
                    img.classList.add("next");
                } else {
                    const distanciaDerecha =
                        modulo(index - fotoActual, fotos.length);

                    const distanciaIzquierda =
                        modulo(fotoActual - index, fotos.length);

                    if (distanciaDerecha < distanciaIzquierda) {
                        img.classList.add("hidden-right");
                    } else {
                        img.classList.add("hidden-left");
                    }
                }
            }
        });

        if (!conAnimacion) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    fotoStack.classList.remove("sin-transicion");
                });
            });
        }
    }

    function cambiarFoto(direccion) {
        if (animando) return;

        const fotos = obtenerFotosActuales();

        animando = true;

        fotoActual = modulo(
            fotoActual + direccion,
            fotos.length
        );

        fotoStack.dataset.direction =
            direccion > 0 ? "next" : "prev";

        actualizarPosiciones();
        actualizarModal();

        window.setTimeout(() => {
            animando = false;
            delete fotoStack.dataset.direction;
        }, 650);
    }

    async function cambiarRubro(direccion) {
        if (animando) return;

        animando = true;

        const nuevoRubro = modulo(
            rubroActual + direccion,
            rubros.length
        );

        const nombreAnterior = rubroNombre.textContent;
        const nombreNuevo = rubros[nuevoRubro].nombre;

        fotoStack.classList.add(
            direccion > 0 ? "salida-izquierda" : "salida-derecha"
        );

        rubroNombre.classList.add("rubro-saliendo");

        await precargarImagenes(rubros[nuevoRubro].fotos);

        window.setTimeout(() => {
            rubroActual = nuevoRubro;
            fotoActual = 0;

            rubroNombre.textContent = nombreNuevo;

            crearGaleria();

            fotoStack.classList.remove(
                "salida-izquierda",
                "salida-derecha"
            );

            fotoStack.classList.add(
                direccion > 0 ? "entrada-derecha" : "entrada-izquierda"
            );

            rubroNombre.classList.remove("rubro-saliendo");
            rubroNombre.classList.add("rubro-entrando");

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    fotoStack.classList.remove(
                        "entrada-derecha",
                        "entrada-izquierda"
                    );

                    rubroNombre.classList.remove("rubro-entrando");
                });
            });

            window.setTimeout(() => {
                animando = false;
            }, 650);
        }, 280);
    }

    function abrirModal() {
        if (!galeriaModal || !modalImg) return;

        modalImg.src = obtenerFotosActuales()[fotoActual];
        modalImg.alt =
            `${rubros[rubroActual].nombre}, fotografía ${fotoActual + 1}`;

        galeriaModal.classList.add("active");
        galeriaModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-abierto");
    }

    function cerrarModal() {
        if (!galeriaModal) return;

        galeriaModal.classList.remove("active");
        galeriaModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-abierto");
    }

    function actualizarModal() {
        if (
            !galeriaModal?.classList.contains("active") ||
            !modalImg
        ) {
            return;
        }

        modalImg.classList.add("cambiando");

        window.setTimeout(() => {
            modalImg.src = obtenerFotosActuales()[fotoActual];
            modalImg.alt =
                `${rubros[rubroActual].nombre}, fotografía ${fotoActual + 1}`;

            modalImg.classList.remove("cambiando");
        }, 180);
    }

    function activarBotonTemporal(boton) {
        if (!boton) return;

        boton.classList.add("presionado");

        window.setTimeout(() => {
            boton.classList.remove("presionado");
        }, 220);
    }

    prevRubro?.addEventListener("click", () => {
        activarBotonTemporal(prevRubro);
        cambiarRubro(-1);
    });

    nextRubro?.addEventListener("click", () => {
        activarBotonTemporal(nextRubro);
        cambiarRubro(1);
    });

    prevFoto?.addEventListener("click", () => {
        activarBotonTemporal(prevFoto);
        cambiarFoto(-1);
    });

    nextFoto?.addEventListener("click", () => {
        activarBotonTemporal(nextFoto);
        cambiarFoto(1);
    });

    modalClose?.addEventListener("click", cerrarModal);

    modalPrev?.addEventListener("click", () => {
        activarBotonTemporal(modalPrev);
        cambiarFoto(-1);
    });

    modalNext?.addEventListener("click", () => {
        activarBotonTemporal(modalNext);
        cambiarFoto(1);
    });

    galeriaModal?.addEventListener("click", event => {
        if (event.target === galeriaModal) {
            cerrarModal();
        }
    });

    document.addEventListener("keydown", event => {
        const modalActivo =
            galeriaModal?.classList.contains("active");

        if (event.key === "Escape" && modalActivo) {
            cerrarModal();
        }

        if (event.key === "ArrowLeft") {
            cambiarFoto(-1);
        }

        if (event.key === "ArrowRight") {
            cambiarFoto(1);
        }
    });

    crearGaleria();
});