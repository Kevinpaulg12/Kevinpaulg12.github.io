/* ==========================================================================
   PORTAFOLIO WEB PROFESIONAL INTERACTIVO - JAVASCRIPT
   Estudiante: Kevin Paúl Dávila Naveda
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de módulos
  initThemeToggle();
  initMobileMenu();
  initProjectFilters();
  initProjectModal();
  initFormValidation();
  initScrollSpy();
  initBackToTop();
  initDesignSystemCopy();
});

/* --------------------------------------------------------------------------
   1. TEMA CLARO / OSCURO (THEME TOGGLE)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    
    showToast(`Modo ${newTheme === 'dark' ? 'oscuro' : 'claro'} activado`);
  });
}

/* --------------------------------------------------------------------------
   2. MENÚ RESPONSIVO MÓVIL
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    menuBtn.innerHTML = isActive
      ? '<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></span>'
      : '<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></span>';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = '<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></span>';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. FILTRO DINÁMICO DE PROYECTOS
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. MODAL INTERACTIVO CON DATOS REALES DE KEVIN PAÚL DÁVILA NAVEDA
   -------------------------------------------------------------------------- */
const projectsData = {
  1: {
    title: "Bar d’ Paul — Sistema POS e Inventario Multi-Rol",
    category: "Full Stack",
    problem: "Optimizó la gestión de inventarios y redujo el tiempo de facturación en establecimientos comerciales multi-rol.",
    description: "Diseño, desarrollo y despliegue de arquitectura de ciclo completo para 'Bar d’ Paul', un sistema POS e inventario multi-rol. Integra backend en Django, base de datos relacional PostgreSQL y contenedorización con Docker para rápido despliegue.",
    techs: ["Python", "Django", "PostgreSQL", "Docker", "HTML5/CSS3", "JavaScript"],
    image: "assets/project-unibar.png",
    github: "https://github.com/Kevinpaulg12/bar-d-paul",
    demo: "https://kevinpaulg12.github.io/bar-d-paul"
  },
  2: {
    title: "Sistema Automatizado de Rastreo Vehicular",
    category: "Backend",
    problem: "Automatizó la captura de datos logísticos eliminando el registro manual de rutas y consumos de flota.",
    description: "Sistema automatizado para el seguimiento y control logístico de flota vehicular. Desarrollado en Python con base de datos relacional MySQL e integración directa con la API de Google Sheets para control logístico en tiempo real.",
    techs: ["Python", "MySQL", "Google Sheets API", "Automation", "Git"],
    image: "assets/project-tracking.png",
    github: "https://github.com/Kevinpaulg12/rastreo-vehicular",
    demo: "https://kevinpaulg12.github.io/rastreo-vehicular"
  },
  3: {
    title: "Modelo de Machine Learning para Clasificación de Imágenes",
    category: "IA / ML",
    problem: "Automatizó el reconocimiento y categorización de imágenes con alto grado de precisión mediante redes neuronales.",
    description: "Implementación de modelos de aprendizaje automático y visión por computadora con TensorFlow. Entrenado para clasificar patrones visuales y extraer características de imágenes masivas.",
    techs: ["Python", "TensorFlow", "Machine Learning", "Computer Vision", "NumPy"],
    image: "assets/project-ml.png",
    github: "https://github.com/Kevinpaulg12/ml-image-classifier",
    demo: "https://kevinpaulg12.github.io/ml-image-classifier"
  }
};

function initProjectModal() {
  const modalBackdrop = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const detailBtns = document.querySelectorAll('.view-project-detail');

  if (!modalBackdrop) return;

  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-id');
      const data = projectsData[projectId];

      if (!data) return;

      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-img').src = data.image;
      document.getElementById('modal-img').alt = `Captura del proyecto ${data.title}`;
      document.getElementById('modal-problem').textContent = `Problema resuelto: ${data.problem}`;
      document.getElementById('modal-description').textContent = data.description;
      document.getElementById('modal-github').href = data.github;
      document.getElementById('modal-demo').href = data.demo;

      const techContainer = document.getElementById('modal-techs');
      techContainer.innerHTML = data.techs.map(t => `<span class="badge badge-primary">${t}</span>`).join('');

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) closeModal();
  });
}

/* --------------------------------------------------------------------------
   5. VALIDACIÓN DEL FORMULARIO DE CONTACTO
   -------------------------------------------------------------------------- */
function initFormValidation() {
  const form = document.getElementById('contact-form');
  const successBanner = document.getElementById('form-success-banner');

  if (!form) return;

  const inputs = form.querySelectorAll('.form-control');

  inputs.forEach(input => {
    input.addEventListener('blur', () => validateInput(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        validateInput(input);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    inputs.forEach(input => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando...';

      setTimeout(() => {
        form.reset();
        inputs.forEach(i => i.classList.remove('is-valid', 'is-invalid'));
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        if (successBanner) {
          successBanner.style.display = 'block';
          setTimeout(() => {
            successBanner.style.display = 'none';
          }, 5000);
        }
        showToast('¡Mensaje enviado con éxito a Kevin Dávila!');
      }, 1200);
    }
  });
}

function validateInput(input) {
  const value = input.value.trim();
  let valid = true;

  if (input.required && value === '') {
    valid = false;
  } else if (input.type === 'email' && value !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    valid = emailRegex.test(value);
  } else if (input.tagName === 'TEXTAREA' && value.length < 10) {
    valid = false;
  }

  if (valid) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  }

  return valid;
}

/* --------------------------------------------------------------------------
   6. SCROLLSPY
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. BOTÓN VOLVER ARRIBA
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');

  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   8. COPIA DE CÓDIGOS HEX (DESIGN SYSTEM)
   -------------------------------------------------------------------------- */
function initDesignSystemCopy() {
  const swatches = document.querySelectorAll('.color-swatch-card');

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hexCode = swatch.getAttribute('data-hex');
      if (hexCode) {
        navigator.clipboard.writeText(hexCode).then(() => {
          showToast(`¡Código ${hexCode} copiado al portapapeles!`);
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   NOTIFICACIÓN TOAST
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
