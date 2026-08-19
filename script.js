// script.js
// UI: año dinámico + menú móvil accesible
document.addEventListener("DOMContentLoaded", function () {
  try {
    // Año en footer
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Nav toggle
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("main-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        if (!expanded) {
          nav.style.display = "flex";
          toggle.setAttribute("aria-label", "Cerrar navegación");
        } else {
          nav.style.display = "";
          toggle.setAttribute("aria-label", "Abrir navegación");
        }
      });

      // Cerrar menú al hacer click en enlace (útil en móvil)
      const links = nav.querySelectorAll("a");
      if (links && links.length) {
        links.forEach((link) => {
          link.addEventListener("click", () => {
            if (window.innerWidth < 768) {
              nav.style.display = "";
              toggle.setAttribute("aria-expanded", "false");
              toggle.setAttribute("aria-label", "Abrir navegación");
            }
          });
        });
      }
    }
  } catch (err) {
    console.error("Error en script.js:", err);
  }
});
