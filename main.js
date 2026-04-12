// OPINIONES
document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.opiniones');
    if (!section) return;

    const track = section.querySelector('.opiniones-track');
    const cards = Array.from(section.querySelectorAll('.opinion-card'));
    const prevBtn = section.querySelector('.slider-btn.prev');
    const nextBtn = section.querySelector('.slider-btn.next');
    const dotsContainer = section.querySelector('.slider-dots');
    const wrapper = section.querySelector('.opiniones-track-wrapper');

    if (!track || !cards.length || !prevBtn || !nextBtn || !dotsContainer || !wrapper) return;

    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let maxIndex = getMaxIndex();

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;

    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1280) return 2;
        return 3;
    }

    function getMaxIndex() {
        return Math.max(0, cards.length - cardsPerView);
    }

    function getGap() {
        return parseFloat(window.getComputedStyle(track).gap) || 0;
    }

    function getStepWidth() {
        const firstCard = cards[0];
        if (!firstCard) return 0;

        const cardWidth = firstCard.getBoundingClientRect().width;
        return cardWidth + getGap();
    }

    function setSliderPosition() {
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function updateDots() {
        Array.from(dotsContainer.children).forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateSlider() {
        const stepWidth = getStepWidth();
        currentTranslate = -(currentIndex * stepWidth);
        prevTranslate = currentTranslate;
        track.style.transition = 'transform 0.45s ease';
        setSliderPosition();
        updateDots();
    }

    function renderDots() {
        dotsContainer.innerHTML = '';

        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.setAttribute('aria-label', `Ir a la opinión ${i + 1}`);

            if (i === currentIndex) {
                dot.classList.add('active');
            }

            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });

            dotsContainer.appendChild(dot);
        }
    }

    function nextSlide() {
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateSlider();
    }

    function handleResize() {
        cardsPerView = getCardsPerView();
        maxIndex = getMaxIndex();

        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        renderDots();
        updateSlider();
    }

    function animation() {
        setSliderPosition();
        if (isDragging) {
            animationID = requestAnimationFrame(animation);
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function dragStart(event) {
        isDragging = true;
        startX = getPositionX(event);
        track.style.transition = 'none';
        animationID = requestAnimationFrame(animation);
        wrapper.classList.add('dragging');
    }

    function dragMove(event) {
        if (!isDragging) return;

        const currentPosition = getPositionX(event);
        const diff = currentPosition - startX;
        currentTranslate = prevTranslate + diff;
    }

    function dragEnd() {
        if (!isDragging) return;

        isDragging = false;
        cancelAnimationFrame(animationID);
        wrapper.classList.remove('dragging');

        const movedBy = currentTranslate - prevTranslate;
        const threshold = 80;

        if (movedBy < -threshold) {
            nextSlide();
        } else if (movedBy > threshold) {
            prevSlide();
        } else {
            updateSlider();
        }
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    window.addEventListener('resize', handleResize);

    wrapper.addEventListener('mousedown', dragStart);
    wrapper.addEventListener('mousemove', dragMove);
    wrapper.addEventListener('mouseup', dragEnd);
    wrapper.addEventListener('mouseleave', dragEnd);

    wrapper.addEventListener('touchstart', dragStart, { passive: true });
    wrapper.addEventListener('touchmove', dragMove, { passive: true });
    wrapper.addEventListener('touchend', dragEnd);

    wrapper.addEventListener('dragstart', (e) => e.preventDefault());

    renderDots();
    updateSlider();
});

// MENU HAMBURGUESA

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

// EFECTO DE CONTADOR
document.addEventListener('DOMContentLoaded', () => {
    const expSection = document.querySelector('.exp-items');
    if (!expSection) return;

    const counters = expSection.querySelectorAll('.span-num');
    let hasAnimated = false;

    function animateCounter(counter) {
        const target = Number(counter.dataset.target);
        const suffix = counter.dataset.suffix || '';
        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(target * easeOut);

            counter.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    function startCounters() {
        if (hasAnimated) return;
        hasAnimated = true;

        counters.forEach(counter => {
            animateCounter(counter);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.35
    });

    observer.observe(expSection);
});

// EFECTO CARRUSEL LOGOS PARA CELULAR
document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.companias-2');
    if (!section) return;

    const track = section.querySelector('.companias-track');
    const cards = Array.from(section.querySelectorAll('.logo-card'));
    const wrapper = section.querySelector('.companias-track-wrapper');

    const prevBtn = section.querySelector('.logo-btn.prev');
    const nextBtn = section.querySelector('.logo-btn.next');

    if (!track || !cards.length || !wrapper) return;

    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;

    function isMobileCarousel() {
        return window.innerWidth <= 768;
    }

    function getGap() {
        return parseFloat(window.getComputedStyle(track).gap) || 0;
    }

    function getStepWidth() {
        const firstCard = cards[0];
        if (!firstCard) return 0;
        return firstCard.getBoundingClientRect().width + getGap();
    }

    function setSliderPosition() {
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function updateSlider() {
        if (!isMobileCarousel()) {
            track.style.transform = 'translateX(0)';
            currentIndex = 0;
            currentTranslate = 0;
            prevTranslate = 0;
            return;
        }

        const maxIndex = cards.length - 1;
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        currentTranslate = -(currentIndex * getStepWidth());
        prevTranslate = currentTranslate;
        track.style.transition = 'transform 0.45s ease';
        setSliderPosition();
    }

    function animation() {
        setSliderPosition();
        if (isDragging) {
            animationID = requestAnimationFrame(animation);
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function dragStart(event) {
        if (!isMobileCarousel()) return;
        isDragging = true;
        startX = getPositionX(event);
        track.style.transition = 'none';
        animationID = requestAnimationFrame(animation);
        wrapper.classList.add('dragging');
    }

    function dragMove(event) {
        if (!isDragging || !isMobileCarousel()) return;
        const currentPosition = getPositionX(event);
        const diff = currentPosition - startX;
        currentTranslate = prevTranslate + diff;
    }

    function dragEnd() {
        if (!isDragging) return;

        isDragging = false;
        cancelAnimationFrame(animationID);
        wrapper.classList.remove('dragging');

        const movedBy = currentTranslate - prevTranslate;
        const threshold = 70;
        const maxIndex = cards.length - 1;

        if (movedBy < -threshold && currentIndex < maxIndex) {
            currentIndex++;
        } else if (movedBy > threshold && currentIndex > 0) {
            currentIndex--;
        }

        updateSlider();
    }

    function handleResize() {
        updateSlider();
    }

    function nextSlide() {
        const maxIndex = cards.length - 1;
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateSlider();
    }

    wrapper.addEventListener('mousedown', dragStart);
    wrapper.addEventListener('mousemove', dragMove);
    wrapper.addEventListener('mouseup', dragEnd);
    wrapper.addEventListener('mouseleave', dragEnd);

    wrapper.addEventListener('touchstart', dragStart, { passive: true });
    wrapper.addEventListener('touchmove', dragMove, { passive: true });
    wrapper.addEventListener('touchend', dragEnd);

    wrapper.addEventListener('dragstart', (e) => e.preventDefault());
    window.addEventListener('resize', handleResize);

    updateSlider();

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
});