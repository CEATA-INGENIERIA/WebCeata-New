// Variables globales para controlar el carrusel principal y las animaciones de texto
let currentSlide = 0; // Índice del slide actual
const slides = document.querySelectorAll('.slide'); // Todos los slides del carrusel
const videos = document.querySelectorAll('video'); // Videos asociados a cada slide
const pauseBtn = document.querySelector('.pause-btn'); // Botón para pausar/reanudar
const playPauseIcon = document.getElementById('playPauseIcon'); // Ícono de pausa/play
const fills = document.querySelectorAll('.fill'); // Barras de progreso de los videos

// Objeto que almacena las frases a mostrar en cada slide
const frasesPorSlide = {
  0: [
    "Sequías prolongadas",
    "Acuíferos contaminados",
    "Contaminación doméstica e industrial",
    "Tratamiento ineficiente"
  ],
  1: [
    "Gestión circular del agua",
    "Tecnologías de potabilización avanzada",
    "Regeneración de elevado grado de purificación",
    "Reutilización que multiplican el valor de cada gota"
  ],
  2: [
    "Auditorías de planta de tratamiento",
    "Consultoria y asistencia técnica",
    "Soporte comercial especializado",
    "Soluciones compactas llave en mano"
  ]
};

let fraseInterval = null; // Intervalo para el cambio de frases
let fraseTimeout = null; // Timeout para detener el cambio de frases después de un tiempo
let isPaused = false; // Estado de pausa del carrusel y animaciones

// Objeto para almacenar el índice actual de las frases por cada slide
let fraseIndicesPorSlide = {
  0: 0,
  1: 0,
  2: 0
};

// Función para iniciar el cambio automático de frases en un slide
function iniciarCambioFrases(slideIndex) {
  clearInterval(fraseInterval); // Limpia el intervalo previo
  clearTimeout(fraseTimeout); // Limpia el timeout previo

  const p = document.getElementById(`text-slide-${slideIndex + 1}`); // Elemento de texto del slide
  const frases = frasesPorSlide[slideIndex]; // Frases asociadas al slide
  if (!p || !frases) return; // Si no hay elemento o frases, salir

  let i = fraseIndicesPorSlide[slideIndex]; // Índice actual de la frase

  // Función interna para cambiar la frase con animación
  function cambiar() {
    if (isPaused) return; // No cambiar si está pausado

    p.classList.remove("show"); // Quita la clase para animar la salida
    p.style.opacity = 0; // Reduce opacidad

    setTimeout(() => {
      p.textContent = frases[i]; // Actualiza el texto
      p.classList.add("show"); // Añade la clase para animar la entrada
      p.style.opacity = 1; // Restaura opacidad
      i = (i + 1) % frases.length; // Avanza al siguiente índice (cíclico)
      fraseIndicesPorSlide[slideIndex] = i; // Actualiza el índice
    }, 200); // Retraso para la animación de salida
  }

  cambiar(); // Muestra la primera frase inmediatamente
  fraseInterval = setInterval(cambiar, 1750); // Cambia cada 1750ms
  fraseTimeout = setTimeout(() => clearInterval(fraseInterval), 7000); // Detiene el cambio después de 7s
}

// Pausa las animaciones de texto
function pausarAnimacion() {
  clearInterval(fraseInterval); // Detiene el intervalo de cambio de frases
  clearTimeout(fraseTimeout); // Detiene el timeout
  isPaused = true; // Marca como pausado
}

// Reanuda las animaciones de texto
function reanudarAnimacion() {
  isPaused = false; // Marca como no pausado
  iniciarCambioFrases(currentSlide); // Reinicia las animaciones
}

// Muestra un slide específico y maneja los videos
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index); // Activa el slide actual
    videos[i].pause(); // Pausa todos los videos
    videos[i].currentTime = 0; // Reinicia todos los videos
    if (fills[i]) fills[i].style.height = '0%'; // Reinicia las barras de progreso
  });

  currentSlide = index; // Actualiza el índice del slide actual
  const currentVideo = videos[currentSlide]; // Video del slide actual

  currentVideo.play().then(() => {
    updateProgress(currentSlide); // Actualiza la barra de progreso
    updatePlayIcon(); // Actualiza el ícono de pausa/play
  }).catch(err => {
    console.error('Error al reproducir video:', err); // Maneja errores de reproducción
  });

  iniciarCambioFrases(currentSlide); // Inicia las animaciones de texto
}

// Avanza al siguiente slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length; // Calcula el siguiente índice (cíclico)
  showSlide(currentSlide); // Muestra el siguiente slide
}

// Retrocede al slide anterior
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Calcula el índice anterior (cíclico)
  showSlide(currentSlide); // Muestra el slide anterior
}

// Va directamente a un slide específico
function goToSlide(index) {
  showSlide(index); // Muestra el slide indicado
}

// Actualiza la barra de progreso del video actual
function updateProgress(index) {
  const video = videos[index];
  video.ontimeupdate = () => {
    const percent = (video.currentTime / video.duration) * 100; // Calcula el porcentaje de progreso
    fills.forEach((fill, i) => {
      if (fill) fill.style.height = i === index ? `${percent}%` : '0%'; // Actualiza solo la barra del video actual
    });
    if (video.ended) nextSlide(); // Si el video termina, pasa al siguiente slide
  };
}

// Alterna entre pausa y reproducción del video y animaciones
function togglePlay() {
  const video = videos[currentSlide];
  if (video.paused) {
    video.play(); // Reproduce el video si está pausado
    reanudarAnimacion(); // Reanuda las animaciones de texto
  } else {
    video.pause(); // Pausa el video si está reproduciendo
    pausarAnimacion(); // Pausa las animaciones de texto
  }
  updatePlayIcon(); // Actualiza el ícono
}

// Actualiza el ícono de pausa/play según el estado del video
function updatePlayIcon() {
  const video = videos[currentSlide];
  if (!playPauseIcon) return; // Si no hay ícono, salir
  playPauseIcon.classList.toggle('play', video.paused); // Muestra el ícono de play si está pausado
  playPauseIcon.classList.toggle('pause', !video.paused); // Muestra el ícono de pausa si está reproduciendo
}

// Cargar componentes dinámicamente (footer y botones de contacto)
document.addEventListener('DOMContentLoaded', () => {
  fetch('./components/footer-component.html') // Carga el footer desde la carpeta components
    .then(response => {
      if (!response.ok) throw new Error('Error cargando footer'); // Maneja errores de red
      return response.text();
    })
    .then(data => {
      document.getElementById('footer').innerHTML = data; // Inserta el contenido del footer
    })
    .catch(err => console.error('Error cargando footer:', err)); // Maneja errores generales

  fetch('./components/contact-buttons.html') // Carga los botones de contacto
    .then(response => {
      if (!response.ok) throw new Error('Error cargando botones de contacto');
      return response.text();
    })
    .then(data => {
      document.getElementById('contacto').innerHTML = data; // Inserta los botones de contacto
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

// Inicia el carrusel en el primer slide
showSlide(0);

// Función para alternar el menú móvil
function toggleMenu() {
  const menuToggle = document.querySelector('.menu-toggle'); // Botón del menú
  const navLinks = document.querySelector('.nav-links'); // Enlaces del menú
  
  navLinks.classList.toggle('show'); // Muestra u oculta el menú
  menuToggle.classList.toggle('open'); // Cambia el ícono del botón
}