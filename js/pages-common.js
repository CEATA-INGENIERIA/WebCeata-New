// Cargar Footer y botones de contacto (rutas relativas desde /pages/)
// Este script se usa en las páginas dentro de la carpeta /pages/
document.addEventListener('DOMContentLoaded', () => {
  fetch('../components/footer-commons.html') // Carga el footer desde la carpeta components
    .then(response => {
      if (!response.ok) throw new Error('Error cargando footer'); // Maneja errores de red
      return response.text();
    })
    .then(data => {
      const footer = document.getElementById('footer');
      if (footer) footer.innerHTML = data; // Inserta el contenido si el elemento existe
    })
    .catch(err => console.error('Error cargando footer:', err)); // Maneja errores generales

  fetch('../components/contact-buttons.html') // Carga los botones de contacto
    .then(response => {
      if (!response.ok) throw new Error('Error cargando botones de contacto');
      return response.text();
    })
    .then(data => {
      const contacto = document.getElementById('contacto');
      if (contacto) contacto.innerHTML = data; // Inserta los botones si el elemento existe
    })
    .catch(err => console.error('Error cargando botones de contacto:', err));
});

// Manejo del navbar al hacer scroll
let lastScroll = 0; // Última posición de scroll
const navbar = document.getElementById('navbar'); // Elemento del navbar

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset; // Posición actual de scroll
  if (currentScroll > 50) {
    navbar.style.top = '-190px'; // Oculta el navbar si se baja más de 50px
  } else {
    navbar.style.top = '0'; // Muestra el navbar si está cerca del top
  }
  lastScroll = currentScroll; // Actualiza la última posición
});

// Función para alternar el menú móvil
function toggleMenu() {
  const menuToggle = document.querySelector('.menu-toggle'); // Botón del menú
  const navLinks = document.querySelector('.nav-links'); // Enlaces del menú

  navLinks.classList.toggle('show'); // Muestra u oculta el menú
  menuToggle.classList.toggle('open'); // Cambia el ícono del botón
}

// Carrusel (solo ejecutar si los elementos existen)
// Este carrusel se usa para mostrar beneficios o secciones similares
const slides = document.querySelectorAll('.carousel-slide'); // Slides del carrusel
const slidesContainer = document.querySelector('.carousel-slides'); // Contenedor de slides
const dotsContainer = document.querySelector('.carousel-dots'); // Contenedor de los puntos (dots)

if (slidesContainer && dotsContainer && slides.length > 0) {
  let slideIndex = 0; // Índice del slide actual
  const totalSlides = slides.length; // Número total de slides

  // Generar los puntos (dots) dinámicamente
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot'); // Añade la clase para el estilo
    if (i === 0) dot.classList.add('active'); // Marca el primer punto como activo
    dot.addEventListener('click', () => goToSlide(i)); // Añade evento para ir al slide
    dotsContainer.appendChild(dot); // Inserta el punto en el contenedor
  }

  // Muestra un slide específico y maneja las animaciones
  function showSlide(index) {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`; // Desplaza los slides

    // Actualiza los puntos activos
    document.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index); // Marca el punto correspondiente como activo
    });

    // Reinicia animaciones de los elementos dentro del slide
    const currentItems = slides[index].querySelectorAll('.benefit-item[data-animate]');
    currentItems.forEach((item, i) => {
      item.classList.remove('visible'); // Quita la visibilidad para reiniciar la animación
      setTimeout(() => {
        item.classList.add('visible'); // Añade la visibilidad con animación
      }, i * 550); // Retraso progresivo de 550ms para cada elemento
    });
  }

  // Avanza al siguiente slide
  function nextSlide() {
    slideIndex = (slideIndex + 1) % totalSlides; // Calcula el siguiente índice (cíclico)
    showSlide(slideIndex); // Muestra el siguiente slide
  }

  // Retrocede al slide anterior
  function prevSlide() {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides; // Calcula el índice anterior (cíclico)
    showSlide(slideIndex); // Muestra el slide anterior
  }

  // Va directamente a un slide específico
  function goToSlide(index) {
    slideIndex = index; // Actualiza el índice
    showSlide(slideIndex); // Muestra el slide indicado
  }

  // Mostrar el primer slide al cargar
  showSlide(slideIndex);
}

// Maneja los botones "Saber más" para expandir/retraer contenido
document.querySelectorAll('.read-more').forEach(button => {
  button.addEventListener('click', function () {
    const item = this.parentElement; // Elemento padre del botón
    item.classList.toggle('expanded'); // Alterna la clase para expandir/retraer
    this.textContent = item.classList.contains('expanded') ? 'Ocultar' : 'Saber más'; // Cambia el texto del botón
  });
});