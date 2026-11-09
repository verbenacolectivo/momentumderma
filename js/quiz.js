(function () {
    "use strict";

    var body = document.body;
    var page = body.dataset.question;
    var options = document.querySelectorAll(".quiz__option, .quiz__image-option");
    var nextBtn = document.querySelector(".quiz__next");

    if (!options.length || !nextBtn) return;

    options.forEach(function (btn) {
        btn.addEventListener("click", function () {
            options.forEach(function (o) {
                o.classList.remove("is-selected");
                o.setAttribute("aria-selected", "false");
            });

            btn.classList.add("is-selected");
            btn.setAttribute("aria-selected", "true");

            try {
                sessionStorage.setItem("respuesta-" + page, btn.dataset.value);
            } catch (e) {
                /* sessionStorage no disponible: el test sigue funcionando,
                   simplemente no se podrá calcular la puntuación final */
            }

            nextBtn.classList.add("is-active");
            nextBtn.removeAttribute("aria-disabled");
        });
    });

    nextBtn.addEventListener("click", function (e) {
        if (!nextBtn.classList.contains("is-active")) {
            e.preventDefault();
        }
    });
})();
