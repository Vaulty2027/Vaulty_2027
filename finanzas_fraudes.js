// ============================================
// IDIOMA — cambia texto, imágenes y guarda preferencia
// ============================================
function setLang(lang) {
    document.querySelectorAll('[data-es][data-en]').forEach(el => {
        // Si este elemento contiene OTRO elemento traducible adentro,
        // lo saltamos: si le hacemos textContent al padre, borraríamos
        // el HTML (y por lo tanto el hijo) que tiene dentro.
        if (el.querySelector('[data-es][data-en]')) return;
        el.textContent = el.dataset[lang];
    });

    // Imágenes que tengan versión distinta según el idioma
    document.querySelectorAll('[data-img-es][data-img-en]').forEach(img => {
        img.src = lang === 'es' ? img.dataset.imgEs : img.dataset.imgEn;
    });

    // Bandera activa — la marca el JS quitando/poniendo la clase .active;
    // CÓMO SE VE esa clase (el aro dorado) lo define el CSS, no el JS.
    document.querySelectorAll('.language-switcher img').forEach(img => {
        img.classList.remove('active');
    });
    const activeFlag = document.querySelector(
        `.language-switcher img[alt="${lang === 'es' ? 'ES' : 'EN'}"]`
    );
    if (activeFlag) activeFlag.classList.add('active');

    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('lang') || 'es';
    setLang(lang);
    setActiveNavLink();
});


// ============================================
// DROPDOWN — hover en escritorio, click en táctil
// ============================================
document.querySelectorAll('.nav-item.dropdown').forEach(item => {
    let timer;
    const trigger = item.querySelector(':scope > a');

    item.addEventListener('mouseenter', () => {
        clearTimeout(timer);
        item.classList.add('open');
    });

    item.addEventListener('mouseleave', () => {
        timer = setTimeout(() => item.classList.remove('open'), 150);
    });

    // En pantallas táctiles no existe "hover": el primer tap abre el
    // submenú en vez de navegar directo al href. El segundo tap navega.
    if (trigger) {
        trigger.addEventListener('click', (e) => {
            const isTouch = window.matchMedia('(hover: none)').matches;
            if (isTouch && !item.classList.contains('open')) {
                e.preventDefault();
                document.querySelectorAll('.nav-item.dropdown.open').forEach(open => {
                    if (open !== item) open.classList.remove('open');
                });
                item.classList.add('open');
            }
        });
    }
});

// Cierra cualquier dropdown abierto si se hace click fuera de él
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item.dropdown')) {
        document.querySelectorAll('.nav-item.dropdown.open').forEach(item => {
            item.classList.remove('open');
        });
    }
});

// Cierra el dropdown abierto con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.nav-item.dropdown.open').forEach(item => {
            item.classList.remove('open');
        });
    }
});


// ============================================
// HEADER — efecto scroll
// ============================================
window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
});


// ============================================
// NAV — link activo según la página actual + al hacer click
// ============================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === currentPage);
    });

    // Si la página activa vive dentro de un submenú (ej. "Fraudes" dentro
    // de "Finanzas Panamá"), también resaltamos el link padre del dropdown.
    document.querySelectorAll('.dropdown-menu a.active').forEach(activeSubLink => {
        const parentItem = activeSubLink.closest('.nav-item');
        const parentTrigger = parentItem && parentItem.querySelector(':scope > a');
        if (parentTrigger) parentTrigger.classList.add('active');
    });
}

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});


// ============================================
// TARJETAS — animación de entrada al hacer scroll
// ============================================
const cards = document.querySelectorAll('.card');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Cada tarjeta aparece con delay escalonado
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 100);

                observer.unobserve(entry.target); // deja de observar una vez animada
            }
        });
    }, { threshold: 0.1 });

    // Estado inicial — ocultas antes de animar
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
} else {
    cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
}