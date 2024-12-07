document.querySelectorAll('.carousel').forEach(container => {
    const slides = container.querySelector('.slides');
    const images = container.querySelectorAll('.slides img');

    let counter = 0;
    const size = images[0].clientWidth;

    function showSlide(index) {
        if (index >= images.length) counter = 0;
        if (index < 0) counter = images.length - 1;
        slides.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }

    // Desplazamiento automático para cada carrusel
    setInterval(() => {
        counter++;
        showSlide(counter);
    }, 5000);
});