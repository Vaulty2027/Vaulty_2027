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
// Esperar a que cargue toda la página
document.addEventListener("DOMContentLoaded", () => {

    // Seleccionar elementos
    const card = document.querySelector(".card");
    const items = document.querySelectorAll(".item");
    const subtitles = document.querySelectorAll(".subtitle");

    // Animación inicial de la tarjeta
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";

    setTimeout(() => {
        card.style.transition = "all 0.8s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
    }, 300);


    // Animación para los iconos
    items.forEach((item, index) => {

        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";

        setTimeout(() => {

            item.style.transition = "all 0.6s ease";

            item.style.opacity = "1";
            item.style.transform = "translateY(0)";

        }, 500 + index * 200);


        // Efecto hover
        item.addEventListener("mouseenter", () => {

            item.style.transform = "scale(1.1)";

            const icon = item.querySelector("i");

            icon.style.color = "#FFD166";

        });

        item.addEventListener("mouseleave", () => {

            item.style.transform = "scale(1)";

            const icon = item.querySelector("i");

            icon.style.color = "#ffbe5d";

        });

    });


    // Efecto hover de la tarjeta
    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";
        card.style.boxShadow = "0 0 50px rgba(255,190,93,0.35)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";
        card.style.boxShadow = "0 0 40px rgba(0,0,0,0.3)";

    });


    // Efecto para los subtítulos
    subtitles.forEach(sub => {

        sub.addEventListener("mouseenter", () => {

            sub.style.transition = "0.3s";

            sub.style.transform = "translateX(8px)";

        });

        sub.addEventListener("mouseleave", () => {

            sub.style.transform = "translateX(0)";

        });

    });

});
// Resaltar opción seleccionada

const links = document.querySelectorAll(".menu a");

links.forEach(link => {

    link.addEventListener("click", () => {

        links.forEach(l => l.classList.remove("active"));

        link.classList.add("active");

    });

});


// Animación del botón

const btn = document.querySelector(".btn-register");

btn.addEventListener("mouseenter", () => {

    btn.style.transform = "scale(1.05)";

});

btn.addEventListener("mouseleave", () => {

    btn.style.transform = "scale(1)";

});