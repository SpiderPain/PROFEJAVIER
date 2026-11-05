// ============================================================
// HUB PERSONAL - APP.JS (Versión final corregida)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

// ============================================================
// HELPERS COMPARTIDOS
// ============================================================
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const createElement = (tag, attrs = {}, children = []) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'class') el.className = value;
        else if (key === 'dataset') Object.entries(value).forEach(([k, v]) => el.dataset[k] = v);
        else if (key === 'html') el.innerHTML = value;
        else if (key.startsWith('on') && typeof value === 'function') el.addEventListener(key.slice(2).toLowerCase(), value);
        else el.setAttribute(key, value);
    });
    (Array.isArray(children) ? children : [children]).forEach(child => {
        if (typeof child === 'string') el.appendChild(document.createTextNode(child));
        else if (child instanceof Node) el.appendChild(child);
    });
    return el;
};

const removeChildren = (el) => { while (el.firstChild) el.removeChild(el.firstChild); };

const storage = {
    get: (key, def = null) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; } },
    set: (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch { return false; } },
    getTheme: () => storage.get('theme', 'light'),
    setTheme: (t) => storage.set('theme', t),
    getQuizSettings: () => storage.get('quizSettings', { tiempoPorPregunta: 30, totalPreguntas: 12, modoAleatorio: true }),
    setQuizSettings: (s) => storage.set('quizSettings', s)
};

// ============================================================
// ANIMATION HELPERS
// ============================================================
const animationHelpers = {
    createCelebrationParticles(container, options = {}) {
        const { count = 10, types = ['✦', '✧', '★', '✨', '💫', '🌟'], colors = ['var(--toon-red)', 'var(--toon-gold)', 'var(--toon-blue)', 'var(--toon-green)'], duration = 1000 } = options;
        const rect = container.getBoundingClientRect();
        const cx = rect.width / 2, cy = rect.height / 2;
        const particles = [];
        for (let i = 0; i < count; i++) {
            const p = document.createElement('span');
            p.className = 'feedback-particle';
            p.textContent = types[Math.floor(Math.random() * types.length)];
            p.style.cssText = `position:absolute;left:${cx}px;top:${cy}px;font-size:${1.2 + Math.random() * 0.8}rem;color:${colors[Math.floor(Math.random() * colors.length)]};pointer-events:none;z-index:1000;transform-origin:center;will-change:transform,opacity;`;
            container.appendChild(p);
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
            const vel = 60 + Math.random() * 80;
            const vx = Math.cos(angle) * vel, vy = -Math.abs(Math.sin(angle)) * vel - 40;
            const rot = (Math.random() - 0.5) * 540;
            const scale = 0.6 + Math.random() * 0.5;
            const start = performance.now();
            const animate = (now) => {
                const prog = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - prog, 3);
                const x = vx * ease, y = vy * ease + 0.5 * 300 * prog * prog;
                p.style.transform = `translate(${x}px, ${y}px) rotate(${rot * prog}deg) scale(${scale * (1 - prog * 0.5)})`;
                p.style.opacity = 1 - prog;
                if (prog < 1) requestAnimationFrame(animate); else p.remove();
            };
            requestAnimationFrame(animate);
            particles.push(p);
        }
        return () => particles.forEach(p => p.remove());
    },

    createConfettiRain(options = {}) {
        const { count = 40, colors = ['var(--toon-red)', 'var(--toon-gold)', 'var(--toon-blue)', 'var(--toon-green)', 'var(--toon-purple)'], duration = 2500 } = options;
        const pieces = [];
        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            el.className = 'confetti-piece';
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = 7 + Math.random() * 8;
            const left = Math.random() * 100;
            const delay = Math.random() * 300;
            const fallDur = duration + Math.random() * 800;
            const rot = Math.random() * 360;
            const rotSpeed = (Math.random() - 0.5) * 540;
            el.style.cssText = `position:fixed;top:-${size}px;left:${left}vw;width:${size}px;height:${size}px;background:${color};pointer-events:none;z-index:9999;opacity:0;will-change:transform,opacity;${Math.random() > 0.5 ? 'border-radius:50%' : 'transform:rotate(45deg)'}`;
            document.body.appendChild(el);
            const start = performance.now() + delay;
            const animate = (now) => {
                const prog = (now - start) / fallDur;
                if (prog < 0) { requestAnimationFrame(animate); return; }
                if (prog >= 1) { el.remove(); return; }
                const ease = prog * prog;
                const y = ease * (window.innerHeight + size * 2);
                const cRot = rot + rotSpeed * prog;
                el.style.transform = `translateY(${y}px) rotate(${cRot}deg)`;
                el.style.opacity = prog < 0.1 ? prog * 10 : (prog > 0.9 ? (1 - prog) * 10 : 1);
                requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            pieces.push(el);
        }
        return () => pieces.forEach(p => p.remove());
    },

    animateCountUp(el, from, to, dur = 600, prefix = '') {
        const start = performance.now();
        const isInt = Number.isInteger(from) && Number.isInteger(to);
        const step = (now) => {
            const prog = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - prog, 3);
            const val = from + (to - from) * eased;
            el.textContent = prefix + (isInt ? Math.round(val) : val.toFixed(1));
            if (prog < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    },

    triggerAnimation(el, className, dur = 500) {
        return new Promise(res => {
            if (!el) { res(); return; }
            const onEnd = () => { el.classList.remove(className); el.removeEventListener('animationend', onEnd); res(); };
            el.addEventListener('animationend', onEnd, { once: true });
            el.classList.add(className);
            setTimeout(() => { el.classList.remove(className); el.removeEventListener('animationend', onEnd); res(); }, dur + 50);
        });
    }
};

// ============================================================
// 1. THEME MODULE
// ============================================================
const ThemeModule = (() => {
    const btn = $('#btn-theme');
    const THEME_ATTR = 'data-theme';
    const THEMES = { LIGHT: 'light', DARK: 'dark' };

    function apply(theme) {
        document.documentElement.setAttribute(THEME_ATTR, theme);
        storage.setTheme(theme);
        if (btn) btn.textContent = theme === THEMES.DARK ? '☀️ Modo Sepia' : '🌙 Modo Noche';
    }

    function init() {
        apply(storage.getTheme());
        if (btn) btn.addEventListener('click', () => {
            const cur = document.documentElement.getAttribute(THEME_ATTR);
            apply(cur === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
        });
    }

    return { init };
})();

// ============================================================
// 2. MODAL MODULE (DEFINIDO ANTES DE ModulesModule)
// ============================================================
const ModalModule = (() => {
    let modal, body, closeBtn, titleEl, metaEl;

    function init() {
        modal = $('#modal-ficha');
        body = $('#modal-body');
        closeBtn = $('#btn-cerrar-modal');
        titleEl = $('#modal-title');
        metaEl = $('#modal-meta');
        if (closeBtn) closeBtn.addEventListener('click', close);
        if (modal) {
            modal.addEventListener('click', e => { if (e.target === modal) close(); });
            modal.addEventListener('close', () => modal.classList.remove('modal-ficha--closing'));
        }
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal?.open) close(); });
    }

    function open(m) {
        if (!body || !modal || !titleEl || !metaEl) return;
        titleEl.textContent = m.titulo;
        metaEl.innerHTML = `<span class="modal-meta-item"><strong class="modal-meta-label">Docente:</strong> <span class="modal-meta-value">${m.docente}</span></span><span class="modal-meta-item"><strong class="modal-meta-label">Categoría:</strong> <span class="modal-meta-value">${m.categoria}</span></span>`;
        removeChildren(body);
        body.append(
            createElement('p', { class: 'modal-text modal-intro' }, m.resumen),
            createSection('Lo que aprendí', m.aprendizajes.map(x => createElement('li', { class: 'modal-list-item' }, x))),
            createSection('Instrumentos & Evidencias', [
                createElement('p', { class: 'modal-text', html: `<strong>Instrumentos:</strong> ${m.instrumentos.join(', ')}` }),
                createElement('p', { class: 'modal-text', html: `<strong>Evidencia:</strong> ${m.evidencia}` })
            ]),
            createSection('Programas & Herramientas', [
                createElement('p', { class: 'modal-text', html: `<strong>Programas:</strong> ${m.programas.join(', ')}` }),
                createElement('p', { class: 'modal-text', html: `<strong>Herramientas:</strong> ${m.herramientas.join(', ')}` })
            ]),
            createSection('Recursos recomendados', m.recursos.map(r => createElement('li', { class: 'modal-list-item modal-list-item--link' }, createElement('a', { href: r.url, target: '_blank', rel: 'noopener', class: 'modal-resource-link' }, r.nombre))))
        );
        modal.classList.remove('modal-ficha--closing');
        modal.showModal();
        closeBtn?.focus();
    }

    function createSection(t, items) {
        const sec = createElement('div', { class: 'modal-section' });
        sec.appendChild(createElement('h3', { class: 'modal-section-title' }, t));
        const list = Array.isArray(items) ? items : [items];
        if (list.length && list[0]?.tagName === 'LI') {
            const ul = createElement('ul', { class: 'modal-list' });
            list.forEach(i => ul.appendChild(i));
            sec.appendChild(ul);
        } else {
            const dv = createElement('div', { class: 'modal-list modal-list--block' });
            list.forEach(i => dv.appendChild(i));
            sec.appendChild(dv);
        }
        return sec;
    }

    function close() {
        if (!modal) return;
        modal.classList.add('modal-ficha--closing');
        setTimeout(() => modal.close(), 280);
    }

    return { init, open };
})();

// Exponer globalmente para que ModulesModule pueda usarlo
window.ModalModule = ModalModule;

// ============================================================
// 3. MODULES MODULE
// ============================================================
const ModulesModule = (() => {
    let data = [];
    let currentFilter = 'todos';

    function init(modulosData) {
        data = modulosData;
        render();
        setupListeners();
    }

    function setupListeners() {
        const search = $('#input-busqueda');
        const chips = $$('.filter-chip');
        if (search) search.addEventListener('input', render);
        chips.forEach(btn => btn.addEventListener('click', () => {
            chips.forEach(b => { b.classList.remove('filter-chip--active'); b.setAttribute('aria-pressed', 'false'); });
            btn.classList.add('filter-chip--active'); btn.setAttribute('aria-pressed', 'true');
            currentFilter = btn.dataset.docente;
            render();
        }));
    }

    function filtered() {
        const q = $('#input-busqueda')?.value.toLowerCase().trim() || '';
        return data.filter(m => {
            const df = currentFilter === 'todos' || m.docente.toLowerCase() === currentFilter.toLowerCase();
            const dt = m.titulo.toLowerCase().includes(q) || m.categoria.toLowerCase().includes(q) || m.resumen.toLowerCase().includes(q);
            return df && dt;
        });
    }

    function render() {
        const grid = $('#grid-modulos');
        const none = $('#sin-resultados');
        if (!grid) return;
        const list = filtered();
        if (!list.length) { removeChildren(grid); if (none) { none.classList.add('no-results--visible'); none.style.display = 'block'; } return; }
        if (none) { none.classList.remove('no-results--visible'); none.style.display = 'none'; }
        removeChildren(grid);
        list.forEach((m, i) => {
            const card = createElement('article', { class: 'card-module', dataset: { id: m.id }, role: 'listitem' }, [
                createElement('div', { class: 'card-header' }, [
                    createElement('span', { class: 'card-tag' }, m.categoria),
                    createElement('span', { class: 'card-docente' }, m.docente)
                ]),
                createElement('h3', { class: 'card-title' }, m.titulo),
                createElement('p', { class: 'card-summary' }, m.resumen),
                createElement('span', { class: 'card-click-hint' }, 'Ver ficha')
            ]);
            card.style.animationDelay = `${50 + i * 70}ms`;
            grid.appendChild(card);
        });
        setupCardClicks();
    }

    function setupCardClicks() {
        $$('.card-module').forEach(card => card.addEventListener('click', () => {
            const m = data.find(x => x.id === card.dataset.id);
            if (m) window.ModalModule.open(m);
        }));
    }

    function getById(id) { return data.find(m => m.id === id); }

    return { init, render, getById };
})();

// ============================================================
// 4. QUIZ ENGINE (Lógica pura)
// ============================================================
class QuizEngine {
    constructor(questions, settings = {}) {
        this.allQuestions = questions;
        this.settings = { tiempoPorPregunta: settings.tiempoPorPregunta || 30, totalPreguntas: settings.totalPreguntas || 12, modoAleatorio: settings.modoAleatorio !== false };
        this.reset();
    }
    reset() {
        const pool = this.settings.modoAleatorio ? [...this.allQuestions].sort(() => Math.random() - 0.5) : [...this.allQuestions];
        this.preguntas = pool.slice(0, this.settings.totalPreguntas);
        this.preguntaActual = 0; this.puntaje = 0; this.racha = 0; this.mejorRacha = 0; this.respuestas = []; this.tiempoInicio = 0; this.tiempoRestante = this.settings.tiempoPorPregunta; this.respondido = false;
    }
    getCurrent() { return this.preguntas[this.preguntaActual]; }
    getProgress() { return { current: this.preguntaActual + 1, total: this.preguntas.length, percentage: (this.preguntaActual / this.preguntas.length) * 100 }; }
    startQuestion() { this.tiempoRestante = this.settings.tiempoPorPregunta; this.tiempoInicio = Date.now(); this.respondido = false; }
    tick() { return --this.tiempoRestante; }
    isTimeUp() { return this.tiempoRestante <= 0; }
    answer(idx) {
        const q = this.getCurrent();
        const time = Math.round((Date.now() - this.tiempoInicio) / 1000);
        const correct = idx === q.correcta;
        let pts = 0;
        if (correct) { this.racha++; this.mejorRacha = Math.max(this.mejorRacha, this.racha); const br = Math.min(this.racha - 1, 3); const bt = this.tiempoRestante > 10 ? 1 : 0; pts = 2 + br + bt; this.puntaje += pts; }
        else { this.racha = 0; }
        const r = { pregunta: q.pregunta, correcta: correct, respuestaUsuario: q.opciones[idx], respuestaCorrecta: q.opciones[q.correcta], tiempo: time, pts, explicacion: q.explicacion, tiempoAgotado: false };
        this.respuestas.push(r); this.preguntaActual++;
        return { esCorrecta: correct, puntosGanados: pts, respuesta: r, question: q };
    }
    handleTimeUp() { const q = this.getCurrent(); this.racha = 0; const r = { pregunta: q.pregunta, correcta: false, tiempoAgotado: true, explicacion: q.explicacion }; this.respuestas.push(r); this.preguntaActual++; return { question: q, respuesta: r }; }
    isFinished() { return this.preguntaActual >= this.preguntas.length; }
    getResults() {
        const t = this.preguntas.length, c = this.respuestas.filter(r => r.correcta).length, pct = Math.round((c / t) * 100), max = t * 5;
        let title = '🎉 ¡Quiz Completado!', emoji = '🏆';
        if (pct === 100) { title = '¡PERFECTO! 💯'; emoji = '👑'; }
        else if (pct >= 80) { title = '¡EXCELENTE! 🌟'; emoji = '🥇'; }
        else if (pct >= 60) { title = '¡BUEN TRABAJO! 👍'; emoji = '🥈'; }
        else if (pct >= 40) { title = '¡A SEGUIR PRACTICANDO! 💪'; emoji = '🥉'; }
        else { title = 'NECESITAS REPASAR 📚'; emoji = '📖'; }
        return { title, emoji, puntaje: this.puntaje, maxPuntaje: max, correctas: c, totalPreguntas: t, porcentaje: pct, mejorRacha: this.mejorRacha, respuestas: this.respuestas, mensaje: pct < 70 ? '💡 Revisa las fichas de los módulos donde fallaste para reforzar conceptos.' : '🎓 ¡Dominas los contenidos del año! Listo para la feria.' };
    }
}

// ============================================================
// 5. QUIZ UI (CON FIXES DE NAVEGACIÓN + LOGS)
// ============================================================
const QuizUI = (() => {
    let engine, timerInt, ui = {}, celebrationCleanup;

    function cache() {
        ui = {
            inicio: $('#quiz-inicio'), container: $('#quiz-container'), resultado: $('#quiz-resultado'),
            btnEmpezar: $('#btn-empezar-quiz'), btnVolver: $('#btn-volver-inicio'),
            progreso: $('#quiz-progreso'), puntos: $('#quiz-puntos'), racha: $('#quiz-racha'),
            pregunta: $('#quiz-pregunta'), opciones: $('#quiz-opciones'), feedback: $('#quiz-feedback'),
            btnSiguiente: $('#btn-siguiente-quiz'), puntajeFinal: $('#quiz-puntaje-final'),
            btnReiniciar: $('#btn-reiniciar-quiz'), timer: $('#quiz-timer'),
            categoria: $('#quiz-categoria'), dificultad: $('#quiz-dificultad'),
            progressFill: $('#quiz-progress-fill')
        };
    }

    function setup() {
        if (ui.btnEmpezar) ui.btnEmpezar.addEventListener('click', start);
        if (ui.btnVolver) ui.btnVolver.addEventListener('click', () => {
            const top = $('#inicio');
            if (top) top.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        if (ui.btnSiguiente) {
            ui.btnSiguiente.addEventListener('click', () => {
                engine.isFinished() ? showResults() : loadNext();
            });
        }
        if (ui.btnReiniciar) ui.btnReiniciar.addEventListener('click', showStart);
    }

    function showStart() {
        clearTimer();
        if (celebrationCleanup) { celebrationCleanup(); celebrationCleanup = null; }
        if (ui.container) ui.container.style.display = 'none';
        if (ui.resultado) ui.resultado.style.display = 'none';
        if (ui.inicio) {
            ui.inicio.style.display = 'block';
            ui.inicio.classList.remove('quiz-start--played');
            void ui.inicio.offsetWidth;
            ui.inicio.classList.add('quiz-start--played');
        }
        if (ui.btnEmpezar) ui.btnEmpezar.focus();
    }

    function start() {
        if (celebrationCleanup) { celebrationCleanup(); celebrationCleanup = null; }
        engine.reset();
        if (ui.inicio) ui.inicio.style.display = 'none';
        ui.container.style.display = 'block'; ui.resultado.style.display = 'none';
        loadNext();
    }

    function loadNext() {
        try {
            if (engine.isFinished()) { showResults(); return; }
            clearTimer(); engine.startQuestion();
            const q = engine.getCurrent(), prog = engine.getProgress();
            updateProgress(prog); updateQuestion(q); renderOptions(q); startTimer(); animateEntrance();
        } catch (e) {
            console.error('[Quiz] Error in loadNext:', e);
        }
    }

    function updateProgress(p) {
        ui.progreso.textContent = `Pregunta ${p.current} de ${p.total}`;
        ui.puntos.textContent = `Puntos: ${engine.puntaje}`;
        if (ui.racha) {
            const nt = `Racha: ${engine.racha}`;
            if (ui.racha.textContent !== nt) { ui.racha.textContent = nt; animationHelpers.triggerAnimation(ui.racha, 'hover-wobble', 350); }
        }
        if (ui.progressFill) ui.progressFill.style.width = `${p.percentage}%`;
    }

    function updateQuestion(q) {
        ui.pregunta.textContent = q.pregunta; ui.pregunta.classList.add('scroll-reveal--lines'); requestAnimationFrame(() => ui.pregunta.classList.add('is-visible'));
        if (ui.categoria) { ui.categoria.textContent = `${q.categoria} • Módulo ${q.modulo}`; ui.categoria.className = 'quiz-category'; }
        if (ui.dificultad) { ui.dificultad.textContent = ({ facil: '🟢 Fácil', media: '🟡 Media', dificil: '🔴 Difícil' })[q.dificultad] || ''; ui.dificultad.className = `quiz-difficulty quiz-difficulty--${q.dificultad}`; }
        ui.feedback.style.display = 'none'; ui.feedback.className = 'quiz-feedback';
        ui.btnSiguiente.textContent = engine.preguntaActual === engine.preguntas.length - 1 ? 'Ver Resultados 🏁' : 'Siguiente Pregunta ➡️';
        ui.btnSiguiente.style.display = 'none'; ui.btnSiguiente.classList.remove('quiz-next-btn--visible');
    }

    function renderOptions(q) {
        removeChildren(ui.opciones);
        q.opciones.forEach((op, i) => {
            const btn = createElement('button', { class: 'quiz-option', dataset: { index: i } }, [
                createElement('span', { class: 'quiz-option-letter' }, String.fromCharCode(65 + i)),
                createElement('span', { class: 'quiz-option-text' }, op)
            ]);
            btn.addEventListener('click', () => handleAnswer(i, btn));
            ui.opciones.appendChild(btn);
        });
    }

    function handleAnswer(idx, btn) {
        try {
            if (engine.respondido) return;
            clearTimer(); if (ui.timer) ui.timer.style.display = 'none';
            const q = engine.getCurrent(), btns = $$('.quiz-option', ui.opciones);
            btns.forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
            const { esCorrecta, puntosGanados } = engine.answer(idx);
            engine.respondido = true;
            if (esCorrecta) {
                btn.classList.add('quiz-option--correct'); animationHelpers.triggerAnimation(btn, 'correct-anim', 1000);
                if (celebrationCleanup) celebrationCleanup();
                celebrationCleanup = animationHelpers.createCelebrationParticles(ui.opciones, { count: 8, duration: 1000 });
                if (engine.racha >= 3) animationHelpers.createConfettiRain({ count: 25, duration: 1800 });
                let msg = `¡Correcto! +${puntosGanados} pts`;
                if (engine.racha > 1) msg += ` (🔥 Racha x${engine.racha} +${Math.min(engine.racha - 1, 3)})`;
                if (engine.tiempoRestante > 10) msg += ` (⚡ Rápido +1)`;
                ui.feedback.className = 'quiz-feedback quiz-feedback--correct';
                ui.feedback.innerHTML = `<span class="quiz-feedback-icon">✨</span><div><strong>${msg}</strong><div class="quiz-feedback-explanation">${q.explicacion}</div></div>`;
                animationHelpers.animateCountUp(ui.puntos, engine.puntaje - puntosGanados, engine.puntaje, 500, 'Puntos: ');
            } else {
                btn.classList.add('quiz-option--incorrect'); btns[q.correcta].classList.add('quiz-option--reveal');
                ui.feedback.className = 'quiz-feedback quiz-feedback--incorrect';
                ui.feedback.innerHTML = `<span class="quiz-feedback-icon">😵</span><div><strong>¡Uy! Incorrecto</strong><div class="quiz-feedback-explanation">La correcta era: <strong>${q.opciones[q.correcta]}</strong>. ${q.explicacion}</div></div>`;
                if (ui.racha) animationHelpers.triggerAnimation(ui.racha, 'shake-error', 400);
            }
            ui.feedback.style.display = 'flex'; ui.btnSiguiente.style.display = 'block'; ui.btnSiguiente.classList.add('quiz-next-btn--visible');
            if (ui.racha) { ui.racha.textContent = `Racha: ${engine.racha}`; if (engine.racha === 0) { ui.racha.classList.add('quiz-streak--danger'); setTimeout(() => ui.racha.classList.remove('quiz-streak--danger'), 900); } else ui.racha.classList.remove('quiz-streak--danger'); }
        } catch (e) { console.error('[Quiz] Error in handleAnswer:', e); }
    }

    function handleTimeUp() {
        try {
            if (engine.respondido) return;
            clearTimer(); const { question } = engine.handleTimeUp(); engine.respondido = true; const btns = $$('.quiz-option', ui.opciones);
            btns.forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
            btns[question.correcta].classList.add('quiz-option--reveal');
            ui.feedback.className = 'quiz-feedback quiz-feedback--timeout';
            ui.feedback.innerHTML = `<span class="quiz-feedback-icon">⏰</span><div><strong>¡Tiempo agotado!</strong><div class="quiz-feedback-explanation">La correcta era: <strong>${question.opciones[question.correcta]}</strong>. ${question.explicacion}</div></div>`;
            ui.feedback.style.display = 'flex'; ui.btnSiguiente.style.display = 'block'; ui.btnSiguiente.classList.add('quiz-next-btn--visible');
            if (ui.racha) { ui.racha.textContent = `Racha: ${engine.racha}`; ui.racha.classList.add('quiz-streak--danger'); setTimeout(() => ui.racha.classList.remove('quiz-streak--danger'), 900); }
        } catch (e) { console.error('[Quiz] Error in handleTimeUp:', e); }
    }

    function startTimer() {
        if (!ui.timer) return;
        ui.timer.innerHTML = `<svg class="quiz-timer-icon" viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
        ui.timer.className = 'quiz-timer quiz-timer--visible';
        timerInt = setInterval(() => {
            const r = engine.tick();
            ui.timer.innerHTML = `<svg class="quiz-timer-icon" viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> ${r}s`;
            if (r <= 5) ui.timer.classList.add('quiz-timer--urgent');
            if (engine.isTimeUp()) { clearInterval(timerInt); handleTimeUp(); }
        }, 1000);
    }

    function clearTimer() { if (timerInt) { clearInterval(timerInt); timerInt = null; } }

    function animateEntrance() {
        $$('.quiz-option', ui.opciones).forEach((b, i) => {
            b.style.opacity = '0'; b.style.transform = 'translateX(-25px) scale(0.92)';
            requestAnimationFrame(() => { b.style.transition = `opacity 350ms var(--ease-spring), transform 350ms var(--ease-spring)`; b.style.transitionDelay = `${i * 70}ms`; b.style.opacity = '1'; b.style.transform = 'translateX(0) scale(1)'; });
        });
    }

    function showResults() {
        clearTimer(); if (celebrationCleanup) { celebrationCleanup(); celebrationCleanup = null; }
        if (ui.timer) ui.timer.style.display = 'none';
        ui.container.style.display = 'none'; ui.resultado.style.display = 'block';
        const r = engine.getResults(); renderResults(r);
        if (r.porcentaje >= 80) animationHelpers.createConfettiRain({ count: 50, duration: 2800 });
    }

    function renderResults(r) {
        const items = r.respuestas.map((ans, i) => {
            const ic = ans.correcta ? '✅' : (ans.tiempoAgotado ? '⏰' : '❌');
            const cls = ans.correcta ? 'quiz-result-item--correct' : (ans.tiempoAgotado ? 'quiz-result-item--timeout' : 'quiz-result-item--incorrect');
            return createElement('div', { class: `quiz-result-item ${cls}` }, [
                createElement('span', { class: 'quiz-result-item-num' }, `${ic} P${i + 1}`),
                createElement('span', { class: 'quiz-result-item-points' }, `${ans.pts || 0} pts`)
            ]);
        });
        removeChildren(ui.puntajeFinal);
        ui.puntajeFinal.append(
            createElement('div', { class: 'quiz-result-header' }, [
                createElement('span', { class: 'quiz-result-emoji' }, r.emoji),
                createElement('h2', { class: 'quiz-result-title' }, r.title)
            ]),
            createElement('div', { class: 'quiz-result-progress' }, [ createElement('div', { class: 'quiz-result-progress-fill' }) ]),
            createElement('div', { class: 'quiz-result-stats' }, [
                createElement('div', { class: 'quiz-result-stat' }, [ createElement('span', { class: 'quiz-result-stat-value' }, `${r.puntaje} / ${r.maxPuntaje}`), createElement('span', { class: 'quiz-result-stat-label' }, 'Puntos') ]),
                createElement('div', { class: 'quiz-result-stat' }, [ createElement('span', { class: 'quiz-result-stat-value' }, `${r.correctas} / ${r.totalPreguntas}`), createElement('span', { class: 'quiz-result-stat-label' }, 'Correctas') ]),
                createElement('div', { class: 'quiz-result-stat' }, [ createElement('span', { class: 'quiz-result-stat-value' }, `${r.porcentaje}%`), createElement('span', { class: 'quiz-result-stat-label' }, 'Acierto') ]),
                createElement('div', { class: 'quiz-result-stat' }, [ createElement('span', { class: 'quiz-result-stat-value' }, `${r.mejorRacha} 🔥`), createElement('span', { class: 'quiz-result-stat-label' }, 'Mejor racha') ])
            ]),
            createElement('div', { class: 'quiz-result-breakdown' }, items),
            createElement('p', { class: 'quiz-result-message' }, r.mensaje)
        );
        requestAnimationFrame(() => { const f = ui.puntajeFinal.querySelector('.quiz-result-progress-fill'); if (f) f.style.width = '100%'; });
        $$('.quiz-result-stat', ui.puntajeFinal).forEach((s, i) => { s.style.opacity = '0'; s.style.transform = 'translateY(15px) scale(0.95)'; setTimeout(() => { s.style.transition = 'opacity 350ms var(--ease-bounce), transform 350ms var(--ease-bounce)'; s.style.opacity = '1'; s.style.transform = 'translateY(0) scale(1)'; }, i * 100); });
    }

    return { init: (questions) => { const s = storage.getQuizSettings(); engine = new QuizEngine(questions, s); cache(); setup(); showStart(); } };
})();

// ============================================================
// 6. NAVBAR SCROLL
// ============================================================
const NavbarScroll = (() => {
    const HIDE_TH = 100, PEEK_TH = 50;
    let nav, sentinel, lastY = 0, ticking = false;

    function init() {
        nav = $('.navbar'); if (!nav) return;
        sentinel = document.createElement('div'); sentinel.id = 'scroll-sentinel'; sentinel.style.cssText = `position:fixed;top:0;left:0;right:0;height:${PEEK_TH}px;pointer-events:none;z-index:-1`; document.body.insertBefore(sentinel, document.body.firstChild);
        new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { nav.classList.remove('navbar--hidden', 'navbar--animating-hide'); nav.classList.add('navbar--visible', 'navbar--animating-show'); } }), { root: null, rootMargin: '0px', threshold: 0 }).observe(sentinel);
        window.addEventListener('scroll', onScroll, { passive: true });
        let touchY = 0; window.addEventListener('touchstart', e => touchY = e.touches[0].clientY, { passive: true }); window.addEventListener('touchmove', e => { const d = touchY - e.touches[0].clientY; if (Math.abs(d) > 30) { d > 0 ? hide() : show(); } }, { passive: true });
        update();
    }

    function onScroll() { lastY = window.scrollY; if (!ticking) { requestAnimationFrame(() => { update(); ticking = false; }); ticking = true; } }
    function update() {
        const y = lastY; updateProgress(y);
        if (document.body.classList.contains('nav-menu-open')) { show(); return; }
        if (y <= PEEK_TH) show(); else if (y > lastY && y > HIDE_TH) hide(); else if (y < lastY) show();
    }
    function show() { nav.classList.remove('navbar--hidden', 'navbar--animating-hide', 'navbar--peeking'); nav.classList.add('navbar--visible', 'navbar--animating-show'); }
    function hide() { nav.classList.remove('navbar--visible', 'navbar--animating-show', 'navbar--peeking'); nav.classList.add('navbar--hidden', 'navbar--animating-hide'); }
    function updateProgress(y) { const bar = nav.querySelector('.navbar-progress'); if (!bar) return; const dh = document.documentElement.scrollHeight - window.innerHeight; bar.style.transform = `scaleX(${dh > 0 ? Math.min(y / dh, 1) : 0})`; }
    return { init };
})();

// ============================================================
// 6. MOBILE MENU (panel lateral con overlay)
// ============================================================
const MobileMenu = (() => {
    let toggle, links, overlay, closeBtn, isOpen = false;

    function cache() {
        toggle = $('.nav-toggle');
        links = $('.nav-links');
        overlay = $('.nav-overlay');
        closeBtn = $('.nav-drawer-close');
    }

    function openMenu() {
        if (!toggle || !links) return;
        isOpen = true;
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Cerrar menú');
        links.classList.add('nav-links--open');
        if (overlay) overlay.classList.add('nav-overlay--visible');
        document.documentElement.classList.add('nav-menu-open');
        document.body.classList.add('nav-menu-open');
        if (closeBtn) closeBtn.focus({ preventScroll: true });
    }

    function closeMenu(returnFocus = true) {
        if (!toggle || !links) return;
        isOpen = false;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú');
        links.classList.remove('nav-links--open');
        if (overlay) overlay.classList.remove('nav-overlay--visible');
        document.documentElement.classList.remove('nav-menu-open');
        document.body.classList.remove('nav-menu-open');
        if (returnFocus) toggle.focus({ preventScroll: true });
    }

    function toggleMenu() { isOpen ? closeMenu() : openMenu(); }

    function init() {
        cache();
        if (!toggle || !links) return;
        toggle.addEventListener('click', toggleMenu);
        if (overlay) overlay.addEventListener('click', () => closeMenu());
        if (closeBtn) closeBtn.addEventListener('click', () => closeMenu());
        $$('.nav-link', links).forEach(link => link.addEventListener('click', () => closeMenu(false)));
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeMenu(); });
        window.addEventListener('resize', () => { if (isOpen && window.innerWidth > 768) closeMenu(false); });
        window.addEventListener('orientationchange', () => { if (isOpen) closeMenu(false); });
    }

    return { init, open: openMenu, close: closeMenu, isOpen: () => isOpen };
})();

// ============================================================
// 7. SCROLL ANIMATIONS
// ============================================================
const ScrollAnimations = (() => {
    function init() {
        const obs = new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { const t = e.target; t.classList.add('is-visible'); const anim = t.dataset.scrollAnimation; if (anim) triggerCustom(t, anim); if (t.classList.contains('scroll-stagger')) stagger(t); if (!t.dataset.repeat) o.unobserve(t); } }), { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        ['.scroll-reveal', '.scroll-reveal--lines', '.scroll-reveal--words', '.scroll-reveal--pop', '.scroll-reveal--curtain', '.scroll-reveal--paper', '.scroll-reveal--ink', '.scroll-reveal--slide-left', '.scroll-reveal--slide-right', '[data-scroll-animation]'].forEach(sel => $$(sel).forEach(el => obs.observe(el)));
        $$('.scroll-stagger').forEach(el => obs.observe(el));
        setupHeroParallax(); autoSetup();
        return obs;
    }
    function triggerCustom(el, name) { const map = { pop: 'entrance-pop', bounce: 'entrance-bounce', curtain: 'entrance-curtain', paper: 'entrance-paper', ink: 'entrance-ink', stagger: 'entrance-stagger', 'slide-up': 'slideInUp', 'slide-down': 'slideInDown', 'slide-left': 'slideInLeft', 'slide-right': 'slideInRight', fade: 'fadeIn', scale: 'scaleIn' }; const c = map[name] || name; el.classList.add(c); el.addEventListener('animationend', () => el.classList.remove(c), { once: true }); }
    function stagger(c) { const ch = c.children, d = parseInt(c.dataset.staggerDelay) || 70; Array.from(ch).forEach((ch, i) => { ch.style.opacity = '0'; ch.style.transform = 'translateY(25px) scale(0.92) rotate(-2deg)'; ch.style.transition = `opacity 350ms var(--ease-out), transform 350ms var(--ease-bounce)`; ch.style.transitionDelay = `${i * d}ms`; requestAnimationFrame(() => { ch.style.opacity = '1'; ch.style.transform = 'translateY(0) scale(1) rotate(0deg)'; }); }); }
    function setupHeroParallax() {
        const h = $('.hero');
        if (!h) return;
        const els = h.querySelectorAll('[data-parallax]');
        if (!els.length) return;
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const sy = window.scrollY, hb = h.getBoundingClientRect().bottom;
                if (hb >= 0) {
                    els.forEach(e => {
                        const sp = parseFloat(e.dataset.parallax) || 0.25;
                        e.style.transform = `translateY(${sy * sp}px)`;
                    });
                }
                ticking = false;
            });
        }, { passive: true });
    }
    function autoSetup() {
        const h = $('.hero'); if (h) { const b = h.querySelector('.hero-badge'), t = h.querySelector('.hero-title'), s = h.querySelector('.hero-subtitle'), bt = h.querySelector('.hero-buttons'); if (b) { b.classList.add('scroll-reveal--pop'); b.style.transitionDelay = '0ms'; } if (t) { t.classList.add('scroll-reveal--lines'); t.style.transitionDelay = '80ms'; } if (s) { s.classList.add('scroll-reveal--pop'); s.style.transitionDelay = '160ms'; } if (bt) { bt.classList.add('scroll-reveal--pop'); bt.style.transitionDelay = '240ms'; } }
        $$('.section-title').forEach((sec, i) => { const tt = sec.querySelector('h2, .section-title'), ss = sec.querySelector('p, .section-subtitle'); if (tt) { tt.classList.add('scroll-reveal--ink'); tt.style.transitionDelay = `${i * 180}ms`; } if (ss) { ss.classList.add('scroll-reveal--pop'); ss.style.transitionDelay = `${i * 180 + 120}ms`; } });
        const g = $('.modules-grid, .cards-grid, #grid-modulos'); if (g) { g.classList.add('scroll-stagger'); g.dataset.staggerDelay = '70'; }
        const qb = $('.quiz-box'); if (qb) qb.classList.add('scroll-reveal--curtain');
        const ft = $('.footer'); if (ft) ft.classList.add('scroll-reveal--paper');
    }
    return { init };
})();

// ============================================================
// INIT APP
// ============================================================
function boot() {
    ThemeModule.init();
    ModalModule.init();           // 1. Primero Modal
    ModulesModule.init(window.modulosData || []);  // 2. Luego Modules
    QuizUI.init(window.quizData || []);            // 3. Quiz
    MobileMenu.init();
    NavbarScroll.init();
    ScrollAnimations.init();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

});