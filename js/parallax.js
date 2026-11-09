(function () {
    "use strict";

    /* Parallax on scroll para el fondo de resultados (fondo-final.png):
       el fondo se mueve más despacio que el resto de la página, dando
       sensación de profundidad. Respeta "movimiento reducido". */

    var hero = document.querySelector(".results__hero");
    var bg = document.querySelector(".results__hero-bg");

    if (!hero || !bg) return;

    var prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    var PARALLAX_FACTOR = 0.3; // 0 = fijo, 1 = se mueve igual que el scroll
    var ticking = false;

    function updateParallax() {
        var rect = hero.getBoundingClientRect();

        /* Solo calculamos mientras el hero está a la vista, para no
           gastar trabajo de más al hacer scroll por el resto de la página */
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
            var offset = window.scrollY * PARALLAX_FACTOR;
            bg.style.transform = "translateY(" + offset + "px)";
        }

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    updateParallax();
})();
