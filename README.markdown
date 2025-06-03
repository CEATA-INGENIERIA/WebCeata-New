# WEBCEATA - CEATA Ingeniería

![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20Desarrollo-brightgreen)
![Licencia](https://img.shields.io/badge/Licencia-MIT-blue)

## Descripción
WEBCEATA es un sitio web estático para **CEATA Ingeniería**, una empresa dedicada a soluciones innovadoras para la gestión y tratamiento de agua potable y residual. El sitio incluye una página principal con un navbar centrado, un carrusel de videos, una sección de soluciones, un footer detallado, botones flotantes de contacto (teléfono, correo, WhatsApp) y un configurador interactivo para personalizar soluciones de tratamiento de agua. Está construido con HTML, CSS, JavaScript, y utiliza **Bootstrap 5.3.0** y **Font Awesome 5.15.4** para estilos e iconos.

## Demo
<!-- Descomenta y actualiza si configuras GitHub Pages -->
<!-- Visita la demo en: [WEBCEATA Demo](https://jvgsg01.github.io/WebCeata) -->

## Estructura de Carpetas
```
WEBCEATA/
├── assets/
│   ├── footer/
│   │   ├── Arbitraje.webp              # Imagen de arbitraje en el footer
│   │   ├── certificado1.webp           # Certificado del footer
│   │   ├── certificado2.webp           # Certificado del footer
│   │   ├── ods3.webp                   # Icono ODS 3 - Salud y Bienestar
│   │   ├── ods6.webp                   # Icono ODS 6 - Agua limpia
│   │   ├── ods9.webp                   # Icono ODS 9 - Industria e innovación
│   │   ├── ods12.webp                  # Icono ODS 12 - Producción responsable
│   │
│   └── images/
│       ├── CiudadDos.webp              # Imagen para sección de soluciones
│       ├── CuartoCARRUSEL.mp4          # Video para un carrusel
│       ├── INDUSTRIAL.webp             # Imagen para sección de soluciones
│       ├── logo.png                    # Logo usado en el navbar y footer
│       ├── PCAP.webp                   # Imagen usada en el configurador
│       ├── PrimerCARRUSEL.mp4          # Video para un carrusel
│       ├── PuebloDos.webp              # Imagen para sección de soluciones
│       ├── Rural3.webp                 # Imagen para sección de soluciones
│       ├── SegundoCARRUSEL.mp4         # Video para un carrusel
│       ├── TercerCARRUSEL.mp4          # Video para un carrusel
│       ├── water.png                   # Icono de gota (DropFill)
│       ├── waterfall.png               # Icono de cascada (DropFiller)
│
├── components/
│   ├── contact-buttons.html            # Botones flotantes de contacto
│   ├── footer-commons.html             # Componente de footer para páginas secundarias
│   └── footer-component.html           # Componente reutilizable del footer para la página principal
│
├── css/
│   └── style.css                      # Estilos generales del sitio (navbar, footer, etc.)
│
├── docs/
│   ├── catalogo-en.pdf
│   └── catalogo-es.pdf
│
├── js/
│   ├── configurator.js                # Lógica del configurador interactivo
│   ├── pages-common.js                # Scripts comunes para páginas secundarias
│   └── script.js                      # JS para el carrusel, menú hamburguesa y animaciones
│
├── node_modules/                      # Dependencias instaladas (si usas un bundler)
│
├── pages/
│   ├── adicionales.html               # Paso 5 del configurador (detalles adicionales)
│   ├── agua-potable.html              # Información sobre agua potable
│   ├── agua-regenerada.html           # Información sobre agua regenerada
│   ├── capacidad-produccion.html      # Paso 3 del configurador (capacidad de producción)
│   ├── caracterizacion-agua.html      # Paso 4 del configurador (caracterización del agua)
│   ├── configurador.html              # Página principal del configurador
│   ├── contacto-final.html            # Página de contacto final
│   ├── fuente-agua.html               # Paso 2 del configurador (fuente de agua)
│   ├── politica-privacidad.html       # Política de privacidad
│   ├── resumen.html                   # Paso 6 del configurador (resumen y descarga)
│   ├── terminos-condiciones.html      # Términos y condiciones
│   ├── tratamiento.html               # Paso 1 del configurador (tipo de tratamiento)
│   └── index.html                     # Página principal de la carpeta pages
│
├── index.html                         # Página principal del sitio
├── LICENSE.txt                        # Licencia del proyecto (MIT)
└── README.md                          # Documentación del proyecto
```

## Requisitos
- Un navegador web moderno (Chrome, Firefox, Edge, etc.).
- [Visual Studio Code](https://code.visualstudio.com/) con la extensión **Live Server** para pruebas locales.
- [Git](https://git-scm.com/) para clonar el repositorio.
- [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) (opcional, para gestionar dependencias si usas un bundler como Vite).

## Instalación y Ejecución
1. Clona el repositorio:
   ```bash
   git clone https://github.com/jvgsg01/WebCeata.git
   ```
2. Abre el proyecto en Visual Studio Code.
3. Instala la extensión **Live Server** si no la tienes.
4. Haz clic derecho en `index.html` o `pages/configurador.html` y selecciona **Open with Live Server** para visualizar el sitio.
5. Verifica que las imágenes, videos, componentes (footer, botones de contacto) y el configurador funcionen correctamente.

## Dependencias Externas
- **Bootstrap 5.3.0**: Para estilos y componentes responsivos (via CDN).
- **Font Awesome 5.15.4**: Para iconos (via CDN).
- **jsPDF**: Para generar PDFs en el configurador (incluido via CDN o localmente).
- **EmailJS**: Para enviar correos desde el formulario de contacto (requiere configuración de claves).
- Scripts y estilos locales: `js/configurator.js`, `js/pages-common.js`, `js/script.js`, `css/style.css`.

## Desarrollo Futuro
- Añadir más páginas secundarias en `pages/` (ej: `about.html`, `projects.html`).
- Mover el navbar a `components/navbar.html` para reutilización.
- Integrar un sistema de autenticación para el configurador (opcional).
- Optimizar la carga con un bundler como [Vite](https://vitejs.dev/) y eliminar dependencias no esenciales (ej: Font Awesome).
- Mejorar la accesibilidad del configurador y el carrusel.

## Notas
- Las rutas en `index.html`, `footer-component.html`, y los scripts son relativas para funcionar con Live Server. Ajusta las rutas si subes el sitio a un servidor (ej: `/WebCeata/css/style.css` para GitHub Pages).
- El configurador guarda datos en `localStorage` y genera un PDF con `jsPDF`. Asegúrate de que las claves de EmailJS (`service_7gmve4s`, `template_9upi8x7`, `template_9ib1w9e`) estén configuradas y sean seguras.
- El carrusel pasa al siguiente slide cuando un video termina. Para un comportamiento cíclico, añade el atributo `loop` a los `<video>` en `index.html`.
- Prueba la accesibilidad y rendimiento con [Lighthouse](https://developers.google.com/web/tools/lighthouse) o [WAVE](https://wave.webaim.org/).

## Despliegue
Para desplegar en GitHub Pages:
1. Asegúrate de que las rutas en `index.html` y `pages/` sean relativas o ajustadas al subdirectorio (ej: `/WebCeata/`).
2. Configura GitHub Pages en la configuración del repositorio (rama `main`, carpeta raíz).
3. Accede al sitio en `https://jvgsg01.github.io/WebCeata`.
4. Actualiza la sección **Demo** con el enlace generado.

## Contacto
Para dudas o sugerencias, contacta a CEATA Ingeniería:
- **Teléfono**: (+34) 946 29 11 83
- **Correo**: ceataingenieria@ceataingenieria.com
- **WhatsApp**: [Enviar mensaje](https://wa.me/34946291183)

## Créditos
Desarrollado por CEATA Ingeniería con colaboración técnica.

## Licencia
Este proyecto está bajo la [Licencia MIT](LICENSE.txt).

---
Última actualización: 03 de junio de 2025, 01:06 PM CEST