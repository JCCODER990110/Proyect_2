// JavaScript para el carrusel

const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let counter = 0;
const size = images[0].clientWidth;

function showSlide(index) {
    if (index >= images.length) counter = 0;
    if (index < 0) counter = images.length - 1;
    slides.style.transform = 'translateX(' + (-size * counter) + 'px)';
}

// Evento para el botón "Siguiente"
nextBtn.addEventListener('click', () => {
    counter++;
    showSlide(counter);
});

// Evento para el botón "Anterior"
prevBtn.addEventListener('click', () => {
    counter--;
    showSlide(counter);
});

// Desplazamiento automático cada 5 segundos
setInterval(() => {
    counter++;
    showSlide(counter);
}, 8500);

