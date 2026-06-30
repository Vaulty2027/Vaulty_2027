// ============================================
// IDIOMA
// ============================================
function setLang(lang) {
    document.querySelectorAll('[data-es][data-en]').forEach(el => {
        if (el.querySelector('[data-es][data-en]')) return;
        el.textContent = el.dataset[lang];
    });

    document.querySelectorAll('[data-img-es][data-img-en]').forEach(img => {
        const src = lang === 'es' ? img.dataset.imgEs : img.dataset.imgEn;
        if (src) img.src = src;
    });

    document.querySelectorAll('.language-switcher img').forEach(img => img.classList.remove('active'));
    const flag = document.querySelector(`.language-switcher img[alt="${lang === 'es' ? 'ES' : 'EN'}"]`);
    if (flag) flag.classList.add('active');

    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('lang') || 'es';
    setLang(lang);
    setActiveNavLink();
});

// ============================================
// DROPDOWN
// ============================================
document.querySelectorAll('.nav-item.dropdown').forEach(item => {
    let timer;
    const trigger = item.querySelector(':scope > a');

    item.addEventListener('mouseenter', () => { clearTimeout(timer); item.classList.add('open'); });
    item.addEventListener('mouseleave', () => { timer = setTimeout(() => item.classList.remove('open'), 150); });

    if (trigger) {
        trigger.addEventListener('click', (e) => {
            const isTouch = window.matchMedia('(hover: none)').matches;
            if (isTouch && !item.classList.contains('open')) {
                e.preventDefault();
                document.querySelectorAll('.nav-item.dropdown.open').forEach(o => { if (o !== item) o.classList.remove('open'); });
                item.classList.add('open');
            }
        });
    }
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item.dropdown'))
        document.querySelectorAll('.nav-item.dropdown.open').forEach(i => i.classList.remove('open'));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape')
        document.querySelectorAll('.nav-item.dropdown.open').forEach(i => i.classList.remove('open'));
});

// ============================================
// HEADER SCROLL
// ============================================
window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
});

// ============================================
// NAV ACTIVO
// ============================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));

    // Match exacto en submenús
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    // Si no hay match exacto, detectar por prefijo de sección
    if (!document.querySelector('.dropdown-menu a.active')) {
        const prefix = currentPage.split('_')[0].toLowerCase();
        document.querySelectorAll('.dropdown-menu a').forEach(link => {
            const href = (link.getAttribute('href') || '').toLowerCase();
            if (href.startsWith(prefix + '_') || href === prefix + '.html') link.classList.add('active');
        });
    }

    // Marcar link padre del dropdown activo
    document.querySelectorAll('.dropdown-menu a.active').forEach(sub => {
        const parent = sub.closest('.nav-item')?.querySelector(':scope > a');
        if (parent) parent.classList.add('active');
    });

    // Links directos del nav
    document.querySelectorAll('nav > a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });
}

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});