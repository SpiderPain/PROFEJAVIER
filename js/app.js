document.addEventListener("DOMContentLoaded", () => {
    // --- 1. MODO CLARO / OSCURO CON PERSISTENCIA ---
    const btnTheme = document.getElementById("btn-theme");
    const themeGuardado = localStorage.getItem("theme") || "dark";
    
    function aplicarTema(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        if (btnTheme) {
            btnTheme.textContent = theme === "light" ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
        }
    }

    aplicarTema(themeGuardado);

    if (btnTheme) {
        btnTheme.addEventListener("click", () => {
            const actual = document.documentElement.getAttribute("data-theme");
            const nuevo = actual === "light" ? "dark" : "light";
            aplicarTema(nuevo);
        });
    }

    // --- 2. RENDERIZADO Y FILTRADO DE MÓDULOS ---
    const gridContainer = document.getElementById("grid-modulos");
    const inputBusqueda = document.getElementById("input-busqueda");
    const btnsFiltro = document.querySelectorAll(".btn-filtro");
    const msgSinResultados = document.getElementById("sin-resultados");
    
    const modal = document.getElementById("modal-ficha");
    const modalBody = document.getElementById("modal-body");
    const btnCerrar = document.getElementById("btn-cerrar-modal");

    let docenteSeleccionado = "todos";

    function filtrarYRenderizarModulos() {
        if (!gridContainer || typeof modulosData === "undefined") return;

        const texto = inputBusqueda ? inputBusqueda.value.toLowerCase().trim() : "";

        const modulosFiltrados = modulosData.filter(modulo => {
            const coincideDocente = (docenteSeleccionado === "todos") || 
                                    (modulo.docente.toLowerCase() === docenteSeleccionado.toLowerCase());
            
            const coincideTexto = modulo.titulo.toLowerCase().includes(texto) ||
                                  modulo.categoria.toLowerCase().includes(texto) ||
                                  modulo.resumen.toLowerCase().includes(texto);

            return coincideDocente && coincideTexto;
        });

        if (modulosFiltrados.length === 0) {
            gridContainer.innerHTML = "";
            if (msgSinResultados) msgSinResultados.style.display = "block";
        } else {
            if (msgSinResultados) msgSinResultados.style.display = "none";
            gridContainer.innerHTML = modulosFiltrados.map((modulo) => `
                <article class="card-modulo" data-id="${modulo.id}">
                    <div class="card-header">
                        <span class="card-tag">${modulo.categoria}</span>
                        <span class="card-docente">${modulo.docente}</span>
                    </div>
                    <h3>${modulo.titulo}</h3>
                    <p>${modulo.resumen}</p>
                </article>
            `).join('');

            document.querySelectorAll(".card-modulo").forEach((card, index) => {
                card.addEventListener("click", () => abrirFicha(modulosFiltrados[index]));
            });
        }
    }

    function abrirFicha(modulo) {
        if (!modalBody || !modal) return;
        modalBody.innerHTML = `
            <h2>${modulo.titulo}</h2>
            <p style="color: var(--text-muted); margin-bottom: 1rem;"><strong>Docente:</strong> ${modulo.docente} | <strong>Categoría:</strong> ${modulo.categoria}</p>
            <p>${modulo.resumen}</p>

            <div class="ficha-seccion">
                <h4>Lo que aprendí</h4>
                <ul>
                    ${modulo.aprendizajes.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>

            <div class="ficha-seccion">
                <h4>Instrumentos & Evidencias</h4>
                <p><strong>Instrumentos:</strong> ${modulo.instrumentos.join(', ')}</p>
                <p><strong>Evidencia:</strong> ${modulo.evidencia}</p>
            </div>

            <div class="ficha-seccion">
                <h4>Programas & Herramientas</h4>
                <p><strong>Programas:</strong> ${modulo.programas.join(', ')}</p>
                <p><strong>Herramientas:</strong> ${modulo.herramientas.join(', ')}</p>
            </div>

            <div class="ficha-seccion">
                <h4>Recursos recomendados</h4>
                <ul>
                    ${modulo.recursos.map(rec => `<li><a href="${rec.url}" target="_blank" rel="noopener">${rec.nombre}</a></li>`).join('')}
                </ul>
            </div>
        `;
        modal.showModal();
    }

    if (btnCerrar) btnCerrar.addEventListener("click", () => modal.close());
    if (modal) modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.close();
    });

    if (inputBusqueda) {
        inputBusqueda.addEventListener("input", filtrarYRenderizarModulos);
    }

    btnsFiltro.forEach(btn => {
        btn.addEventListener("click", () => {
            btnsFiltro.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            docenteSeleccionado = btn.getAttribute("data-docente");
            filtrarYRenderizarModulos();
        });
    });

    // --- 3. LÓGICA DEL QUIZ INTERACTIVO ---
    let preguntaActual = 0;
    let puntaje = 0;

    const quizProgreso = document.getElementById("quiz-progreso");
    const quizPuntos = document.getElementById("quiz-puntos");
    const quizPregunta = document.getElementById("quiz-pregunta");
    const quizOpciones = document.getElementById("quiz-opciones");
    const quizFeedback = document.getElementById("quiz-feedback");
    const btnSiguienteQuiz = document.getElementById("btn-siguiente-quiz");
    const quizContainer = document.getElementById("quiz-container");
    const quizResultado = document.getElementById("quiz-resultado");
    const quizPuntajeFinal = document.getElementById("quiz-puntaje-final");
    const btnReiniciarQuiz = document.getElementById("btn-reiniciar-quiz");

    function cargarPreguntaQuiz() {
        if (typeof quizData === "undefined" || !quizPregunta) return;

        const q = quizData[preguntaActual];
        quizProgreso.textContent = `Pregunta ${preguntaActual + 1} de ${quizData.length}`;
        quizPuntos.textContent = `Puntos: ${puntaje}`;
        quizPregunta.textContent = q.pregunta;

        quizOpciones.innerHTML = "";
        quizFeedback.style.display = "none";
        btnSiguienteQuiz.style.display = "none";

        q.opciones.forEach((opcion, index) => {
            const btn = document.createElement("button");
            btn.classList.add("quiz-btn-opcion");
            btn.textContent = opcion;
            btn.addEventListener("click", () => seleccionarRespuestaQuiz(index));
            quizOpciones.appendChild(btn);
        });
    }

    function seleccionarRespuestaQuiz(indexSeleccionado) {
        const q = quizData[preguntaActual];
        const botones = quizOpciones.querySelectorAll(".quiz-btn-opcion");

        botones.forEach(b => b.disabled = true);

        if (indexSeleccionado === q.correcta) {
            botones[indexSeleccionado].classList.add("correcta");
            quizFeedback.className = "quiz-feedback correcta";
            quizFeedback.textContent = "¡Correcto! " + q.explicacion;
            puntaje += 2;
        } else {
            botones[indexSeleccionado].classList.add("incorrecta");
            botones[q.correcta].classList.add("correcta");
            quizFeedback.className = "quiz-feedback incorrecta";
            quizFeedback.textContent = "Incorrecto. " + q.explicacion;
        }

        quizFeedback.style.display = "block";
        btnSiguienteQuiz.style.display = "block";
        quizPuntos.textContent = `Puntos: ${puntaje}`;
    }

    if (btnSiguienteQuiz) {
        btnSiguienteQuiz.addEventListener("click", () => {
            preguntaActual++;
            if (preguntaActual < quizData.length) {
                cargarPreguntaQuiz();
            } else {
                mostrarResultadoQuiz();
            }
        });
    }

    function mostrarResultadoQuiz() {
        quizContainer.style.display = "none";
        quizResultado.style.display = "block";
        quizPuntajeFinal.textContent = `Puntaje final: ${puntaje} / ${quizData.length * 2} puntos.`;
    }

    if (btnReiniciarQuiz) {
        btnReiniciarQuiz.addEventListener("click", () => {
            preguntaActual = 0;
            puntaje = 0;
            quizResultado.style.display = "none";
            quizContainer.style.display = "block";
            cargarPreguntaQuiz();
        });
    }

    // --- 4. ANIMACIONES AL SCROLL ---
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

    // Cargas Iniciales
    filtrarYRenderizarModulos();
    cargarPreguntaQuiz();
});