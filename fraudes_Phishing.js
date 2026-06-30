// ============================================
// IDIOMA — cambia texto, imágenes y guarda preferencia
// ============================================
function setLang(lang) {
    document.querySelectorAll('[data-es][data-en]').forEach(el => {
        if (el.querySelector('[data-es][data-en]')) return;
        el.textContent = el.dataset[lang];
    });

    document.querySelectorAll('[data-img-es][data-img-en]').forEach(img => {
        const newSrc = lang === 'es' ? img.dataset.imgEs : img.dataset.imgEn;
        if (newSrc) img.src = newSrc;
    });

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

document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item.dropdown')) {
        document.querySelectorAll('.nav-item.dropdown.open').forEach(item => {
            item.classList.remove('open');
        });
    }
});

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
// NAV — link activo según la página actual
// ============================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Limpiar todos los active
    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));

    // 1. Buscar match exacto en submenús
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 2. Si no hubo match exacto, detectar sección por prefijo
    //    ej: "fraudes_Phishing.html" → prefijo "fraudes" → marca sublink de fraudes
    const hasActiveSublink = document.querySelector('.dropdown-menu a.active');
    if (!hasActiveSublink) {
        const prefix = currentPage.split('_')[0].toLowerCase();
        document.querySelectorAll('.dropdown-menu a').forEach(link => {
            const href = (link.getAttribute('href') || '').toLowerCase();
            if (href.startsWith(prefix + '_') || href === prefix + '.html') {
                link.classList.add('active');
            }
        });
    }

    // 3. Marcar el link padre del dropdown con hijo activo
    document.querySelectorAll('.dropdown-menu a.active').forEach(activeSubLink => {
        const parentItem = activeSubLink.closest('.nav-item');
        const parentTrigger = parentItem && parentItem.querySelector(':scope > a');
        if (parentTrigger) parentTrigger.classList.add('active');
    });

    // 4. Match exacto para links directos (ej: index.html)
    document.querySelectorAll('nav > a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});