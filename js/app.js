document.addEventListener("DOMContentLoaded", () => {
    // Animación suave de aparición al hacer scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Pequeño log interactivo de confirmación en consola
    console.log("⚡ HUB Personal cargado con éxito y animaciones activas.");
});