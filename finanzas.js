// ============================================
// IDIOMA — cambia texto y guarda preferencia
// ============================================
function setLang(lang) {
    document.querySelectorAll('[data-es][data-en]').forEach(el => {
        // Si este elemento contiene OTRO elemento traducible adentro,
        // lo saltamos: si le hacemos textContent al padre, borraríamos
        // el HTML (y por lo tanto el hijo) que tiene dentro.
        if (el.querySelector('[data-es][data-en]')) return;
        el.textContent = el.dataset[lang];
    });
 
    document.querySelectorAll('.language-switcher img').forEach(img => {
        img.classList.remove('active');
    });
 
    const activeFlag = document.querySelector(`[alt="${lang === 'es' ? 'ES' : 'EN'}"]`);
    if (activeFlag) activeFlag.classList.add('active');
 
    localStorage.setItem('lang', lang);
}
 
document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('lang') || 'es';
    setLang(lang);
});
 
 
// ============================================
// DROPDOWN — abre y cierra con hover
// ============================================
document.querySelectorAll('.nav-item.dropdown').forEach(item => {
    let timer;
 
    item.addEventListener('mouseenter', () => {
        clearTimeout(timer);
        item.classList.add('open');
    });
 
    item.addEventListener('mouseleave', () => {
        timer = setTimeout(() => item.classList.remove('open'), 150);
    });
});
 
 
// ============================================
// HEADER — efecto scroll
// ============================================
window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
});
 
 
 
// ============================================
// NAV — link activo al hacer click
// ============================================
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});
 
 