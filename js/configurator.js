document.addEventListener('DOMContentLoaded', () => {
  // Determinar el paso actual según la página
  // Este bloque identifica la página actual para establecer el paso en la barra de progreso
  const currentPage = window.location.pathname.split('/').pop();
  let currentStep;

  switch (currentPage) {
    case 'tratamiento.html':
      currentStep = 1;
      break;
    case 'fuente-agua.html':
      currentStep = 2;
      break;
    case 'capacidad-produccion.html':
      currentStep = 3;
      break;
    case 'caracterizacion-agua.html':
      currentStep = 4;
      break;
    case 'adicionales.html':
      currentStep = 5;
      break;
    case 'resumen.html':
      currentStep = 6;
      break;
    default:
      currentStep = 1;
  }

  // Actualizar los pasos en la barra de progreso
  // Añade clases 'completed' o 'active' a los pasos según el progreso del usuario
  const steps = document.querySelectorAll('.progress-bar .step');
  steps.forEach((step, index) => {
    const stepNumber = parseInt(step.getAttribute('data-step'));
    if (stepNumber < currentStep) {
      step.classList.add('completed');
    } else if (stepNumber === currentStep) {
      step.classList.add('active');
    }
  });

  // Manejo de tratamiento.html
  // Gestiona el formulario de selección de tratamiento y guarda los datos en localStorage
  const treatmentForm = document.getElementById('treatment-form');
  if (treatmentForm) {
    treatmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const selectedTreatment = document.querySelector('input[name="treatment"]:checked');
      if (!selectedTreatment) {
        alert('Por favor, selecciona un tipo de tratamiento antes de continuar.');
        return;
      }
      const configData = JSON.parse(localStorage.getItem('configData')) || {};
      configData.tipoTratamiento = selectedTreatment.value;
      localStorage.setItem('configData', JSON.stringify(configData));
      window.location.href = 'fuente-agua.html';
    });
  }

  // Manejo de fuente-agua.html
  // Gestiona el formulario de selección de fuente de agua y actualiza localStorage
  const sourceForm = document.getElementById('source-form');
  if (sourceForm) {
    sourceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const selectedSource = document.querySelector('input[name="source"]:checked');
      if (!selectedSource) {
        alert('Por favor, selecciona una fuente de agua antes de continuar.');
        return;
      }
      const configData = JSON.parse(localStorage.getItem('configData')) || {};
      configData.fuenteAgua = selectedSource.value;
      localStorage.setItem('configData', JSON.stringify(configData));
      window.location.href = 'capacidad-produccion.html';
    });
  }

  // Manejo de capacidad-produccion.html
  // Gestiona el formulario de selección de capacidad de producción y actualiza localStorage
  const capacityForm = document.getElementById('capacity-form');
  if (capacityForm) {
    capacityForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const selectedCapacity = document.querySelector('input[name="capacity"]:checked');
      if (!selectedCapacity) {
        alert('Por favor, selecciona una capacidad de producción antes de continuar.');
        return;
      }
      const configData = JSON.parse(localStorage.getItem('configData')) || {};
      configData.capacidadProduccion = selectedCapacity.value;
      localStorage.setItem('configData', JSON.stringify(configData));
      window.location.href = 'caracterizacion-agua.html';
    });
  }

  // Manejo de caracterizacion-agua.html
  // Gestiona el formulario de caracterización del agua y guarda los datos en localStorage
  const characterizationForm = document.getElementById('characterization-form');
  if (characterizationForm) {
    characterizationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const turbidez = document.getElementById('turbidez').value;
      const conductividad = document.getElementById('conductividad').value;
      const ph = document.getElementById('ph').value;
      const materiaOrganica = document.getElementById('materia-organica').value;
      const dureza = document.getElementById('dureza').value;
      const coliformesTotales = document.getElementById('coliformes-totales').value;

      if (!turbidez || !conductividad || !ph || !materiaOrganica || !dureza || !coliformesTotales) {
        alert('Por favor, selecciona una opción para cada característica antes de continuar.');
        return;
      }

      const configData = JSON.parse(localStorage.getItem('configData')) || {};
      configData.caracterizacion = {
        turbidez,
        conductividad,
        ph,
        materiaOrganica,
        dureza,
        coliformesTotales
      };
      localStorage.setItem('configData', JSON.stringify(configData));
      window.location.href = 'adicionales.html';
    });
  }

  // Manejo de adicionales.html
  // Gestiona el formulario de detalles adicionales y guarda los datos en localStorage
  const additionalForm = document.getElementById('additional-form');
  if (additionalForm) {
    additionalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const condicionesAgua = document.getElementById('condiciones-agua').value;
      const espacioDisponible = document.getElementById('espacio-disponible').value;
      const conexionesServicios = document.getElementById('conexiones-servicios').value;
      const mantenimientoPostventa = document.getElementById('mantenimiento-postventa').value;

      const configData = JSON.parse(localStorage.getItem('configData')) || {};
      configData.adicionales = {
        condicionesAgua: condicionesAgua || 'No especificado',
        espacioDisponible: espacioDisponible || 'No especificado',
        conexionesServicios: conexionesServicios || 'No especificado',
        mantenimientoPostventa: mantenimientoPostventa || 'No especificado'
      };
      localStorage.setItem('configData', JSON.stringify(configData));
      window.location.href = 'resumen.html';
    });
  }

  // Manejo de resumen.html
  // Genera el resumen de la configuración y muestra detalles de la solución
  const summaryList = document.getElementById('summary-list');
  const solutionImagePrice = document.getElementById('solution-image-price');
  const downloadBtn = document.getElementById('downloadBtn');
  const videoBtn = document.getElementById('videoBtn');
  const contactForm = document.getElementById('contact-form');

  if (summaryList) {
    const configData = JSON.parse(localStorage.getItem('configData')) || {};
    const sourceMap = {
      'Agua Subterránea': 'Agua Subterránea',
      'Agua Superficial': 'Agua Superficial',
      'Agua Marina': 'Agua Marina',
      'Red Pública de Abastecimiento': 'Red Pública de Abastecimiento'
    };

    summaryList.innerHTML = `
      <div class="summary-section">
        <h3>Tipo de Tratamiento</h3>
        <p>${configData.tipoTratamiento || 'No seleccionado'}</p>
      </div>
      <div class="summary-section">
        <h3>Fuente de Agua</h3>
        <p>${sourceMap[configData.fuenteAgua] || 'No seleccionado'}</p>
      </div>
      <div class="summary-section">
        <h3>Capacidad de Producción</h3>
        <p>${configData.capacidadProduccion || 'No seleccionado'}</p>
      </div>
      <div class="summary-section">
        <h3>Caracterización del Agua</h3>
        <ul>
          <li><strong>Turbidez:</strong> ${configData.caracterizacion?.turbidez || 'No seleccionado'}</li>
          <li><strong>Conductividad:</strong> ${configData.caracterizacion?.conductividad || 'No seleccionado'}</li>
          <li><strong>pH:</strong> ${configData.caracterizacion?.ph || 'No seleccionado'}</li>
          <li><strong>Materia Orgánica:</strong> ${configData.caracterizacion?.materiaOrganica || 'No seleccionado'}</li>
          <li><strong>Dureza:</strong> ${configData.caracterizacion?.dureza || 'No seleccionado'}</li>
          <li><strong>Coliformes Totales:</strong> ${configData.caracterizacion?.coliformesTotales || 'No seleccionado'}</li>
        </ul>
      </div>
      <div class="summary-section">
        <h3>Detalles Adicionales</h3>
        <ul>
          <li><strong>Condiciones del Agua de Fuente:</strong> ${configData.adicionales?.condicionesAgua || 'No especificado'}</li>
          <li><strong>Espacio Disponible para la Instalación:</strong> ${configData.adicionales?.espacioDisponible || 'No especificado'}</li>
          <li><strong>Conexiones y Servicios Disponibles:</strong> ${configData.adicionales?.conexionesServicios || 'No especificado'}</li>
          <li><strong>Mantenimiento y Servicio Postventa:</strong> ${configData.adicionales?.mantenimientoPostventa || 'No especificado'}</li>
        </ul>
      </div>
    `;

    const capacityDetails = {
      'Pequeña Escala (hasta 10 m³/día)': {
        image: '/assets/images/PCAP.webp',
        price: 'Desde: 60.000€',
        model: 'PCAP-100'
      },
      'Mediana Escala (10-100 m³/día)': {
        image: '/assets/images/PCAP.webp',
        price: 'Desde: 120.000€',
        model: 'PCAP-100'
      },
      'Grande Escala (100-1000 m³/día)': {
        image: '/assets/images/PCAP.webp',
        price: 'Desde: 250.000€',
        model: 'PCAP-110'
      },
      'Industrial (más de 1000 m³/día)': {
        image: '/assets/images/PCAP.webp',
        price: 'Desde: 500.000€',
        model: 'PCAP-110'
      }
    };

    const selectedCapacity = configData.capacidadProduccion || 'No seleccionado';
    const capacityInfo = capacityDetails[selectedCapacity] || {
      image: '/assets/images/PCAP.webp',
      price: 'Precio no disponible',
      model: 'Modelo no disponible'
    };

    if (solutionImagePrice) {
      solutionImagePrice.innerHTML = `
        <img src="${capacityInfo.image}" alt="Solución para ${selectedCapacity}">
        <p>Modelo: ${capacityInfo.model} | ${capacityInfo.price}</p>
      `;
    }
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      // Genera un PDF con los datos de la configuración usando jsPDF
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      // Usar el base64 del logo proporcionado
      const logoData = 'data:image/png;base64,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';
      const startColor = [22, 146, 166];
      const endColor = [190, 168, 75];
      const ceataColor = [172, 133, 45];
      const titleColor = [20, 20, 20];
      const secondaryTextColor = [10, 23, 23];

      const headerHeight = 40;
      const pageWidth = 210;
      for (let i = 0; i < pageWidth; i++) {
        const r = startColor[0] + (endColor[0] - startColor[0]) * (i / pageWidth);
        const g = startColor[1] + (endColor[1] - startColor[1]) * (i / pageWidth);
        const b = startColor[2] + (endColor[2] - startColor[2]) * (i / pageWidth);
        doc.setFillColor(r, g, b);
        doc.rect(i, 0, 1, headerHeight, 'F');
      }
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.text('CEATA INGENIERÍA KYC - KNOW YOUR CUSTOMER', 10, 25);

      doc.setLineWidth(0.5);
      doc.setDrawColor(255, 192, 11);
      doc.line(10, 45, 200, 45);

      const configData = JSON.parse(localStorage.getItem('configData')) || {};
      let y = 55;

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(...titleColor);
      doc.text('Detalles de la Configuración', 10, y);
      doc.setLineWidth(0.3);
      doc.setDrawColor(255, 192, 11);
      doc.line(10, y + 2, 70, y + 2);
      y += 10;

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...titleColor);
      doc.text('Tipo de Tratamiento:', 10, y);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(...secondaryTextColor);
      doc.text(configData.tipoTratamiento || 'No seleccionado', 55, y);
      y += 8;

      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(...titleColor);
      doc.text('Fuente de Agua:', 10, y);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(...secondaryTextColor);
      doc.text(configData.fuenteAgua || 'No seleccionado', 45, y);
      y += 8;

      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(...titleColor);
      doc.text('Capacidad de Producción:', 10, y);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(...secondaryTextColor);
      doc.text(configData.capacidadProduccion || 'No seleccionado', 65, y);
      y += 8;

      // Añadir el modelo de planta
      const selectedCapacity = configData.capacidadProduccion || 'No seleccionado';
      const capacityDetails = {
        'Pequeña Escala (hasta 10 m³/día)': { model: 'PCAP-100' },
        'Mediana Escala (10-100 m³/día)': { model: 'PCAP-100' },
        'Grande Escala (100-1000 m³/día)': { model: 'PCAP-110' },
        'Industrial (más de 1000 m³/día)': { model: 'PCAP-110' }
      };
      const capacityInfo = capacityDetails[selectedCapacity] || { model: 'Modelo no disponible' };
      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(...titleColor);
      doc.text('Modelo de Planta:', 10, y);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(...secondaryTextColor);
      doc.text(capacityInfo.model, 50, y);
      y += 10;

      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(...titleColor);
      doc.text('Caracterización del Agua', 10, y);
      doc.setLineWidth(0.3);
      doc.setDrawColor(255, 192, 11);
      doc.line(10, y + 2, 65, y + 2);
      y += 10;

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(...secondaryTextColor);
      doc.text(`- Turbidez: ${configData.caracterizacion?.turbidez || 'No seleccionado'}`, 15, y);
      y += 6;
      doc.text(`- Conductividad: ${configData.caracterizacion?.conductividad || 'No seleccionado'}`, 15, y);
      y += 6;
      doc.text(`- pH: ${configData.caracterizacion?.ph || 'No seleccionado'}`, 15, y);
      y += 6;
      doc.text(`- Materia Orgánica: ${configData.caracterizacion?.materiaOrganica || 'No seleccionado'}`, 15, y);
      y += 6;
      doc.text(`- Dureza: ${configData.caracterizacion?.dureza || 'No seleccionado'}`, 15, y);
      y += 6;
      doc.text(`- Coliformes Totales: ${configData.caracterizacion?.coliformesTotales || 'No seleccionado'}`, 15, y);
      y += 10;

      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(...titleColor);
      doc.text('Detalles Adicionales', 10, y);
      doc.setLineWidth(0.3);
      doc.setDrawColor(255, 192, 11);
      doc.line(10, y + 2, 55, y + 2);
      y += 10;

      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(...secondaryTextColor);
      doc.text(`- Condiciones del Agua de Fuente: ${configData.adicionales?.condicionesAgua || 'No especificado'}`, 15, y);
      y += 6;
      doc.text(`- Espacio Disponible: ${configData.adicionales?.espacioDisponible || 'No especificado'}`, 15, y);
      y += 6;
      doc.text(`- Conexiones y Servicios: ${configData.adicionales?.conexionesServicios || 'No especificado'}`, 15, y);
      y += 6;
      doc.text(`- Mantenimiento Postventa: ${configData.adicionales?.mantenimientoPostventa || 'No especificado'}`, 15, y);
      y += 10;

      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(...titleColor);
      doc.text('Fecha', 10, y);
      doc.setLineWidth(0.3);
      doc.setDrawColor(255, 192, 11);
      doc.line(10, y + 2, 25, y + 2);
      y += 8;

      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(...secondaryTextColor);
      const date = new Date();
      doc.text(date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }), 25, y);

      const footerHeight = 30;
      const totalPages = doc.internal.getNumberOfPages();
      for (let page = 1; page <= totalPages; page++) {
        doc.setPage(page);
        const footerY = 267;
        for (let i = 0; i < pageWidth; i++) {
          const r = startColor[0] + (endColor[0] - startColor[0]) * (i / pageWidth);
          const g = startColor[1] + (endColor[1] - startColor[1]) * (i / pageWidth);
          const b = startColor[2] + (endColor[2] - startColor[2]) * (i / pageWidth);
          doc.setFillColor(r, g, b);
          doc.rect(i, footerY, 1, footerHeight, 'F');
        }
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text('CEATA INGENIERÍA SL', 15, footerY + 8);
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9);
        doc.text('ceataingenieria@ceataingenieria.com', 15, footerY + 14);
        doc.text('Avda. Altos Hornos 33, ILGNER C6, 48901 Barakaldo (Bizkaia)', 15, footerY + 20);
        doc.text('+34 946 29 11 83', 15, footerY + 26);
        if (logoData) {
          doc.addImage(logoData, 'PNG', 173, footerY + 3, 20, 16);
        }
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(...ceataColor);
        doc.text('CEATA', 173, footerY + 26);
      }

      doc.save('resumen_configuracion.pdf');

      const successModal = new bootstrap.Modal(document.getElementById('successModal'));
      if (successModal) {
        successModal.show();
      }
    });
  }

  if (videoBtn) {
    videoBtn.addEventListener('click', () => {
      // Abre un video de YouTube según la capacidad seleccionada
      const configData = JSON.parse(localStorage.getItem('configData')) || {};
      const selectedCapacity = configData.capacidadProduccion || 'No seleccionado';
      let youtubeUrl;

      if (selectedCapacity === 'Pequeña Escala (hasta 10 m³/día)' || selectedCapacity === 'Mediana Escala (10-100 m³/día)') {
        youtubeUrl = 'https://www.youtube.com/shorts/example1'; // Reemplaza con el URL real
      } else if (selectedCapacity === 'Grande Escala (100-1000 m³/día)' || selectedCapacity === 'Industrial (más de 1000 m³/día)') {
        youtubeUrl = 'https://www.youtube.com/shorts/example2'; // Reemplaza con el URL real
      } else {
        alert('Capacidad no seleccionada. Selecciona una capacidad para ver el video.');
        return;
      }

      window.open(youtubeUrl, '_blank');
    });
  }

  // Inicializar EmailJS
  // Configura EmailJS con la clave pública del usuario (clave sensible: '8qXMAu3wptY12D2F-')
  // Nota: Esta clave debe mantenerse segura y no compartirse públicamente
  emailjs.init('8qXMAu3wptY12D2F-');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // Maneja el envío del formulario de contacto mediante EmailJS
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const email = document.getElementById('email').value;
      const compania = document.getElementById('compania').value;
      const telefono = document.getElementById('telefono').value;
      const pais = document.getElementById('pais').value;
      const comentarios = document.getElementById('comentarios').value;
      const terminos = document.getElementById('terminos').checked;
      const autorizacion = document.getElementById('autorizacion').checked;

      // Validar campos obligatorios
      if (!nombre || !apellido || !email || !terminos || !autorizacion) {
        alert('Por favor, completa todos los campos obligatorios (Nombre, Apellido, Correo Electrónico) y acepta los términos y la autorización.');
        return;
      }

      // Validar formato del email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
      }

      // Preparar los datos para EmailJS
      // Se incluye configData como string JSON para enviar toda la configuración
      const configData = JSON.parse(localStorage.getItem('configData')) || {};
      const emailParams = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        compania: compania || 'No especificado',
        telefono: telefono || 'No especificado',
        pais: pais || 'No especificado',
        comentarios: comentarios || 'Ninguno',
        configData: JSON.stringify(configData, null, 2)
      };

      console.log('Enviando correo con los siguientes parámetros:', emailParams);

      // Enviar correo al cliente usando la plantilla 'template_9upi8x7'
      // Servicio: 'service_7gmve4s' (clave sensible: identifica el servicio EmailJS)
      emailjs.send('service_7gmve4s', 'template_9upi8x7', emailParams)
        .then(() => {
          console.log('Correo al cliente enviado con éxito');
          // Enviar correo a la empresa usando la plantilla 'template_9ib1w9e'
          return emailjs.send('service_7gmve4s', 'template_9ib1w9e', emailParams);
        })
        .then(() => {
          console.log('Correo a la empresa enviado con éxito');
          alert('¡Configuración enviada con éxito! Pronto nos pondremos en contacto contigo.');
          localStorage.removeItem('configData');
          window.location.href = '../index.html';
        })
        .catch(error => {
          console.error('Error al enviar el correo:', error);
          alert(`Error al enviar la configuración: ${error.text || 'Error desconocido'}. Revisa la consola para más detalles.`);
        });
    });
  }

  // Función para el menú móvil
  // Alterna la visibilidad del menú móvil al hacer clic
  function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  }
});
