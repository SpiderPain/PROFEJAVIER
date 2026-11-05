const modulosData = [
    // --- MÓDULOS JAVIER MINEROS ---
    {
        id: "mod-3.0",
        categoria: "Inducción",
        docente: "Javier Mineros",
        titulo: "Módulo 3.0 “Orientación de estudiantes al proceso educativo del tercer año”",
        resumen: "Inducción y alineación con los objetivos curriculares, normas técnicas y metodologías de trabajo para el último año de la especialidad.",
        aprendizajes: [
            "Conocimiento de la normativa institucional y de la especialidad.",
            "Establecimiento de metas académicas y profesionales anuales.",
            "Organización del espacio de trabajo y herramientas de desarrollo."
        ],
        instrumentos: ["Lineamientos de la especialidad", "Plan de estudio anual"],
        programas: ["Visual Studio Code", "Git / GitHub"],
        herramientas: ["Plataformas institucionales", "Bitácoras de trabajo"],
        recursos: [
            { nombre: "Portal institucional INDEL", url: "https://indel.edu.sv" }
        ],
        evidencia: "Planificación y configuración inicial del entorno de desarrollo"
    },
    {
        id: "mod-3.2",
        categoria: "Soporte y Operación",
        docente: "Javier Mineros",
        titulo: "Módulo 3.2 Mantenimiento y aseguramiento de la operación del sistema informático",
        resumen: "Optimización, configuración de rendimiento, diagnóstico de hardware/software y aplicación de perfiles térmicos o mantenimientos preventivos y correctivos.",
        aprendizajes: [
            "Optimización de recursos del sistema y rendimiento de hardware.",
            "Diagnóstico y solución de incidencias operativas en equipos de cómputo.",
            "Aseguramiento de la estabilidad del entorno de desarrollo."
        ],
        instrumentos: ["Listas de cotejo de mantenimiento", "Bitácora de incidencias"],
        programas: ["Administrador de tareas", "Utilidades de sistema y BIOS"],
        herramientas: ["Herramientas de diagnóstico", "Scripts de optimización"],
        recursos: [
            { nombre: "Documentación de soporte técnico Microsoft", url: "https://learn.microsoft.com/es-es/" }
        ],
        evidencia: "Reporte de optimización y mantenimiento de estación de trabajo"
    },
    {
        id: "mod-3.3",
        categoria: "Base de Datos",
        docente: "Javier Mineros",
        titulo: "Módulo 3.3 Administración de Bases de Datos",
        resumen: "Diseño avanzado, administración, seguridad, normalización y gestión de motores de bases de datos relacionales para garantizar la integridad de la información.",
        aprendizajes: [
            "Creación y administración de esquemas relacionales complejos.",
            "Optimización de consultas SQL y manejo de transacciones.",
            "Resguardo, respaldos y control de privilegios de usuarios."
        ],
        instrumentos: ["Pruebas de rendimiento SQL", "Rúbricas de diseño de bases de datos"],
        programas: ["MySQL Workbench", "SQL Server Management Studio"],
        herramientas: ["SQL", "MySQL", "T-SQL"],
        recursos: [
            { nombre: "Documentación oficial de MySQL", url: "https://dev.mysql.com/doc/" },
            { nombre: "Microsoft Learn SQL Server", url: "https://learn.microsoft.com/es-es/sql/sql-server/" }
        ],
        evidencia: "Esquema relacional y scripts de administración de base de datos"
    },
    {
        id: "mod-3.4",
        categoria: "Documentación",
        docente: "Javier Mineros",
        titulo: "Módulo 3.4 Elaboración de documentación de Sistemas informáticos",
        resumen: "Generación de manuales técnicos, manuales de usuario, diagramas de arquitectura y especificaciones funcionales estandarizadas para el soporte de software.",
        aprendizajes: [
            "Redacción de especificaciones técnicas y requerimientos.",
            "Elaboración de manuales de usuario claros e intuitivos.",
            "Documentación de código fuente y diagramas UML."
        ],
        instrumentos: ["Guía de estándares de documentación", "Rúbrica de manuales técnicos"],
        programas: ["Visual Studio Code", "Markdown Editors", "Figma / Diagramadores"],
        herramientas: ["Markdown", "PlantUML", "Control de versiones Git"],
        recursos: [
            { nombre: "Guía de Markdown", url: "https://www.markdownguide.org/" }
        ],
        evidencia: "Manual técnico y de usuario del sistema desarrollado"
    },
    {
        id: "mod-3.8",
        categoria: "Desarrollo de Software",
        docente: "Javier Mineros",
        titulo: "Módulo 3.8 Proyecto innovador de Desarrollo de Software",
        resumen: "Diseño, programación, integración y despliegue de una solución de software funcional e interactiva bajo un enfoque práctico e innovador.",
        aprendizajes: [
            "Construcción de aplicaciones multiplataforma e interfaces web.",
            "Integración de bases de datos locales y remotas.",
            "Control de versiones profesional y despliegue continuo en GitHub Pages."
        ],
        instrumentos: ["Rúbrica de Feria de Portales", "Lista de verificación de código limpio"],
        programas: ["Visual Studio 2022", "Visual Studio Code", "Git Bash"],
        herramientas: ["C#", ".NET MAUI", "HTML5/CSS3/JavaScript", "GitHub Pages"],
        recursos: [
            { nombre: "Documentación oficial de .NET MAUI", url: "https://learn.microsoft.com/es-es/dotnet/maui/" },
            { nombre: "MDN Web Docs", url: "https://developer.mozilla.org/es/" }
        ],
        evidencia: "HUB Personal de Repaso publicado en línea (GitHub Pages)"
    },

    // --- MÓDULOS FRANCISCO ARCIDES ---
    {
        id: "mod-arcides-3.1",
        categoria: "Desarrollo de Software",
        docente: "Francisco Arcides",
        titulo: "BTVDS 3.1 Desarrollo de aplicaciones de software para la solución de problemas",
        resumen: "Construcción y lógica de programación aplicada para resolver problemáticas del entorno mediante el desarrollo de software estructurado.",
        aprendizajes: [
            "Análisis de requerimientos para la resolución de problemas lógicos.",
            "Implementación de estructuras de control y algoritmos eficientes.",
            "Pruebas y depuración de código."
        ],
        instrumentos: ["Guías de laboratorio", "Pruebas prácticas de programación"],
        programas: ["Visual Studio Code", "IDE de desarrollo"],
        herramientas: ["Lenguajes de programación", "Control de versiones"],
        recursos: [
            { nombre: "Documentación técnica de desarrollo", url: "https://developer.mozilla.org/es/" }
        ],
        evidencia: "Desarrollo de prototipos de software funcionales"
    },
    {
        id: "mod-arcides-mob",
        categoria: "Dispositivos Móviles",
        docente: "Francisco Arcides",
        titulo: "Módulo 2 Desarrollo de componentes para dispositivos móviles",
        resumen: "Diseño y programación de interfaces adaptativas y componentes lógicos orientados a la ejecución en plataformas móviles.",
        aprendizajes: [
            "Diseño de interfaces adaptadas a pantallas táctiles.",
            "Implementación de componentes y eventos nativos o híbridos.",
            "Despliegue y pruebas en emuladores o dispositivos físicos."
        ],
        instrumentos: ["Rúbricas de evaluación móvil", "Listas de cotejo"],
        programas: ["Android Studio / VS Code", "Emuladores móviles"],
        herramientas: ["Frameworks móviles", "Diseño Responsive"],
        recursos: [
            { nombre: "Android Developers", url: "https://developer.android.com/" }
        ],
        evidencia: "Aplicación móvil con componentes interactivos"
    },
    {
        id: "mod-arcides-eng",
        categoria: "Inglés Técnico",
        docente: "Francisco Arcides",
        titulo: "Módulo 3 Conversación de inglés sobre mantenimiento de sistemas informáticos",
        resumen: "Fortalecimiento de la comunicación técnica bilingüe enfocada en el diagnóstico, soporte y mantenimiento de equipos y redes informáticas.",
        aprendizajes: [
            "Vocabulario técnico en inglés aplicado a hardware y software.",
            "Simulación de reportes de fallas y atención a requerimientos técnicos en inglés.",
            "Lectura e interpretación de manuales en inglés."
        ],
        instrumentos: ["Pruebas de conversación técnica", "Ejercicios de comprensión lectora"],
        programas: ["Herramientas multimedia y de comunicación"],
        herramientas: ["Glosarios técnicos bilingües"],
        recursos: [
            { nombre: "Diccionarios técnicos especializados", url: "https://www.oxfordlearnersdictionaries.com/" }
        ],
        evidencia: "Bitácora de soporte técnico redactada y defendida en inglés"
    },
    {
        id: "mod-arcides-coop",
        categoria: "Emprendimiento",
        docente: "Francisco Arcides",
        titulo: "Módulo 4 Puesta en marcha de la empresa en asociatividad cooperativa",
        resumen: "Estructuración de modelos de negocio asociativos y cooperativos enfocados en la comercialización de servicios y productos de tecnología.",
        aprendizajes: [
            "Fundamentos legales y organizativos de una cooperativa.",
            "Creación de planes de negocio tecnológicos y presupuestos.",
            "Estrategias de asociatividad laboral."
        ],
        instrumentos: ["Planes de negocio", "Evaluación de proyectos asociativos"],
        programas: ["Herramientas de ofimática y gestión"],
        herramientas: ["Modelos Canvas / Cooperativos"],
        recursos: [
            { nombre: "Guías de emprendimiento asociativo", url: "https://www.ine.gob.sv" }
        ],
        evidencia: "Documento de propuesta de empresa cooperativa de software"
    }
];

// --- BANCO DE PREGUNTAS PARA EL QUIZ (24 preguntas) ---
const quizData = [
    // Módulo 3.0 - Inducción (Javier Mineros)
    {
        id: "q1",
        categoria: "Inducción",
        modulo: "3.0",
        docente: "Javier Mineros",
        dificultad: "facil",
        pregunta: "¿Cuál es el objetivo principal del Módulo 3.0 'Orientación de estudiantes al proceso educativo'?",
        opciones: [
            "Aprender a programar en C#",
            "Inducción y alineación con objetivos curriculares, normas técnicas y metodologías de trabajo",
            "Diseñar bases de datos relacionales",
            "Crear aplicaciones móviles"
        ],
        correcta: 1,
        explicacion: "El Módulo 3.0 sirve para inducir a los estudiantes en la normativa institucional, establecer metas académicas y organizar el entorno de desarrollo."
    },
    {
        id: "q2",
        categoria: "Inducción",
        modulo: "3.0",
        docente: "Javier Mineros",
        dificultad: "media",
        pregunta: "¿Qué herramientas se configuran en la evidencia del Módulo 3.0?",
        opciones: [
            "MySQL Workbench y SQL Server",
            "Visual Studio Code, Git/GitHub y plataformas institucionales",
            "Android Studio y emuladores",
            "Figma y PlantUML"
        ],
        correcta: 1,
        explicacion: "La evidencia del Módulo 3.0 es la planificación y configuración inicial del entorno de desarrollo con VS Code, Git/GitHub y bitácoras."
    },

    // Módulo 3.2 - Soporte y Operación (Javier Mineros)
    {
        id: "q3",
        categoria: "Soporte y Operación",
        modulo: "3.2",
        docente: "Javier Mineros",
        dificultad: "facil",
        pregunta: "¿Qué se busca optimizar en el Módulo 3.2 'Mantenimiento y aseguramiento de la operación'?",
        opciones: [
            "El rendimiento del hardware y recursos del sistema",
            "La velocidad de escritura de código",
            "El diseño de interfaces gráficas",
            "La sintaxis de SQL"
        ],
        correcta: 0,
        explicacion: "El módulo se enfoca en optimización de recursos, diagnóstico de hardware/software y aplicación de mantenimientos preventivos y correctivos."
    },
    {
        id: "q4",
        categoria: "Soporte y Operación",
        modulo: "3.2",
        docente: "Javier Mineros",
        dificultad: "media",
        pregunta: "¿Qué instrumento de evaluación se usa para registrar incidencias en el Módulo 3.2?",
        opciones: [
            "Rúbrica de Feria de Portales",
            "Bitácora de incidencias",
            "Pruebas de conversación técnica",
            "Plan de negocio"
        ],
        correcta: 1,
        explicacion: "Se utiliza una bitácora de incidencias y listas de cotejo de mantenimiento como instrumentos de evaluación."
    },

    // Módulo 3.3 - Base de Datos (Javier Mineros)
    {
        id: "q5",
        categoria: "Base de Datos",
        modulo: "3.3",
        docente: "Javier Mineros",
        dificultad: "facil",
        pregunta: "¿Qué motor de base de datos NO se menciona en las herramientas del Módulo 3.3?",
        opciones: ["MySQL", "SQL Server (T-SQL)", "PostgreSQL", "SQL estándar"],
        correcta: 2,
        explicacion: "Las herramientas listadas son SQL, MySQL y T-SQL. PostgreSQL no se menciona explícitamente."
    },
    {
        id: "q6",
        categoria: "Base de Datos",
        modulo: "3.3",
        docente: "Javier Mineros",
        dificultad: "media",
        pregunta: "¿Cuál es la evidencia final del Módulo 3.3 'Administración de Bases de Datos'?",
        opciones: [
            "Aplicación móvil funcional",
            "Esquema relacional y scripts de administración de BD",
            "Manual técnico de usuario",
            "Bitácora en inglés"
        ],
        correcta: 1,
        explicacion: "La evidencia consiste en entregar el esquema relacional diseñado y los scripts de administración (respaldo, seguridad, privilegios)."
    },
    {
        id: "q7",
        categoria: "Base de Datos",
        modulo: "3.3",
        docente: "Javier Mineros",
        dificultad: "dificil",
        pregunta: "¿Qué concepto de bases de datos garantiza la integridad de la información mediante la eliminación de redundancias?",
        opciones: ["Desnormalización", "Normalización", "Indexación", "Particionamiento"],
        correcta: 1,
        explicacion: "La normalización es el proceso de organizar los datos para reducir redundancia y mejorar la integridad, tema central del módulo."
    },

    // Módulo 3.4 - Documentación (Javier Mineros)
    {
        id: "q8",
        categoria: "Documentación",
        modulo: "3.4",
        docente: "Javier Mineros",
        dificultad: "facil",
        pregunta: "¿Qué lenguaje de marcado se utiliza para documentación técnica en el Módulo 3.4?",
        opciones: ["HTML", "Markdown", "XML", "LaTeX"],
        correcta: 1,
        explicacion: "Markdown es el estándar para documentación técnica ligera, manuales y READMEs, herramienta clave del módulo."
    },
    {
        id: "q9",
        categoria: "Documentación",
        modulo: "3.4",
        docente: "Javier Mineros",
        dificultad: "media",
        pregunta: "¿Qué tipo de diagramas se elaboran para documentar la arquitectura del software?",
        opciones: ["Diagramas de flujo de datos", "Diagramas UML", "Diagramas de Gantt", "Diagramas de red"],
        correcta: 1,
        explicacion: "UML (Unified Modeling Language) es el estándar para diagramas de arquitectura, clases, secuencia, etc."
    },

    // Módulo 3.8 - Proyecto Innovador (Javier Mineros)
    {
        id: "q10",
        categoria: "Desarrollo de Software",
        modulo: "3.8",
        docente: "Javier Mineros",
        dificultad: "facil",
        pregunta: "¿Qué tecnología de Microsoft se usa para apps multiplataforma en el Módulo 3.8?",
        opciones: [".NET MAUI", "WPF", "WinForms", "Xamarin (legacy)"],
        correcta: 0,
        explicacion: ".NET MAUI (Multi-platform App UI) es el framework actual para apps nativas multiplataforma con C#."
    },
    {
        id: "q11",
        categoria: "Desarrollo de Software",
        modulo: "3.8",
        docente: "Javier Mineros",
        dificultad: "media",
        pregunta: "¿Dónde se despliega el HUB Personal de Repaso como evidencia del Módulo 3.8?",
        opciones: ["Azure", "AWS", "GitHub Pages", "Netlify"],
        correcta: 2,
        explicacion: "La evidencia final es el HUB publicado en GitHub Pages con despliegue continuo desde el repositorio."
    },
    {
        id: "q12",
        categoria: "Desarrollo de Software",
        modulo: "3.8",
        docente: "Javier Mineros",
        dificultad: "dificil",
        pregunta: "¿Qué práctica de control de versiones profesional se evalúa en la 'Lista de verificación de código limpio'?",
        opciones: [
            "Commits atómicos con mensajes convencionales",
            "Commits masivos al final del día",
            "Trabajo directo en main sin ramas",
            "Sin control de versiones"
        ],
        correcta: 0,
        explicacion: "El código limpio incluye commits atómicos, mensajes convencionales (feat:, fix:, docs:), ramas por feature y PRs revisados."
    },

    // BTVDS 3.1 - Francisco Arcides
    {
        id: "q13",
        categoria: "Desarrollo de Software",
        modulo: "BTVDS 3.1",
        docente: "Francisco Arcides",
        dificultad: "facil",
        pregunta: "¿Cuál es el enfoque del BTVDS 3.1 'Desarrollo de aplicaciones para solución de problemas'?",
        opciones: [
            "Diseño gráfico y UX/UI",
            "Construcción y lógica de programación aplicada a problemáticas reales",
            "Administración de servidores Linux",
            "Marketing digital para software"
        ],
        correcta: 1,
        explicacion: "El módulo centra en análisis de requerimientos, algoritmos eficientes, estructuras de control y pruebas/depuración."
    },
    {
        id: "q14",
        categoria: "Desarrollo de Software",
        modulo: "BTVDS 3.1",
        docente: "Francisco Arcides",
        dificultad: "media",
        pregunta: "¿Qué instrumento se usa para evaluar la lógica de programación en este módulo?",
        opciones: [
            "Rúbrica de Feria de Portales",
            "Pruebas prácticas de programación",
            "Bitácora de soporte en inglés",
            "Plan de negocio cooperativo"
        ],
        correcta: 1,
        explicacion: "Las guías de laboratorio y pruebas prácticas de programación son los instrumentos de evaluación."
    },

    // Módulo 2 - Dispositivos Móviles (Francisco Arcides)
    {
        id: "q15",
        categoria: "Dispositivos Móviles",
        modulo: "Módulo 2",
        docente: "Francisco Arcides",
        dificultad: "facil",
        pregunta: "¿Qué framework NO se menciona para desarrollo móvil en el Módulo 2?",
        opciones: ["Flutter", "React Native", "Xamarin", "Android nativo (Kotlin/Java)"],
        correcta: 2,
        explicacion: "Se mencionan frameworks móviles genéricos, Android Studio/VS Code y emuladores. Xamarin es legacy y no se destaca."
    },
    {
        id: "q16",
        categoria: "Dispositivos Móviles",
        modulo: "Módulo 2",
        docente: "Francisco Arcides",
        dificultad: "media",
        pregunta: "¿Qué evidencia se entrega en el Módulo 2 de Dispositivos Móviles?",
        opciones: [
            "Esquema de BD relacional",
            "Aplicación móvil con componentes interactivos",
            "Manual técnico en Markdown",
            "Bitácora en inglés técnico"
        ],
        correcta: 1,
        explicacion: "La evidencia es una app móvil funcional con componentes interactivos probados en emulador o dispositivo físico."
    },

    // Módulo 3 - Inglés Técnico (Francisco Arcides)
    {
        id: "q17",
        categoria: "Inglés Técnico",
        modulo: "Módulo 3",
        docente: "Francisco Arcides",
        dificultad: "facil",
        pregunta: "¿Qué habilidad se evalúa en la 'Prueba de conversación técnica' del Módulo 3 de Inglés?",
        opciones: [
            "Redacción de ensayos literarios",
            "Simulación de reportes de fallas y atención a requerimientos técnicos en inglés",
            "Traducción de poesía",
            "Gramática avanzada teórica"
        ],
        correcta: 1,
        explicacion: "Se simulan situaciones reales de soporte técnico: reportar fallas, atender tickets y leer manuales en inglés."
    },
    {
        id: "q18",
        categoria: "Inglés Técnico",
        modulo: "Módulo 3",
        docente: "Francisco Arcides",
        dificultad: "media",
        pregunta: "¿Cuál es la evidencia final del Módulo 3 de Inglés Técnico?",
        opciones: [
            "App móvil publicada",
            "Bitácora de soporte técnico redactada y defendida en inglés",
            "Diagrama UML del sistema",
            "Plan de negocio cooperativo"
        ],
        correcta: 1,
        explicacion: "El estudiante debe redactar y defender oralmente una bitácora de soporte técnico completamente en inglés."
    },

    // Módulo 4 - Emprendimiento Cooperativo (Francisco Arcides)
    {
        id: "q19",
        categoria: "Emprendimiento",
        modulo: "Módulo 4",
        docente: "Francisco Arcides",
        dificultad: "facil",
        pregunta: "¿Qué modelo organizativo se estudia en el Módulo 4 'Puesta en marcha de empresa cooperativa'?",
        opciones: [
            "Sociedad Anónima (S.A.)",
            "Empresa en asociatividad cooperativa",
            "Franquicia",
            "Microempresa individual"
        ],
        correcta: 1,
        explicacion: "El módulo enseña fundamentos legales, organizativos y planes de negocio bajo el modelo cooperativo/asociativo."
    },
    {
        id: "q20",
        categoria: "Emprendimiento",
        modulo: "Módulo 4",
        docente: "Francisco Arcides",
        dificultad: "media",
        pregunta: "¿Qué herramienta de modelado de negocio se usa para estructurar la propuesta cooperativa?",
        opciones: [
            "Business Model Canvas adaptado a cooperativas",
            "Diagrama de Gantt",
            "Diagrama Entidad-Relación",
            "Wireframes de UI"
        ],
        correcta: 0,
        explicacion: "Se usa el Modelo Canvas cooperativo para definir propuesta de valor, socios, actividades clave, estructura de costos e ingresos."
    },

    // Preguntas transversales / integradoras
    {
        id: "q21",
        categoria: "Transversal",
        modulo: "General",
        docente: "Ambos",
        dificultad: "media",
        pregunta: "¿Qué herramienta de control de versiones es transversal a TODOS los módulos de desarrollo?",
        opciones: ["Git / GitHub", "SVN", "Mercurial", "TFS"],
        correcta: 0,
        explicacion: "Git y GitHub se usan desde el Módulo 3.0 (configuración inicial) hasta el 3.8 (despliegue continuo) y en módulos de Arcides."
    },
    {
        id: "q22",
        categoria: "Transversal",
        modulo: "General",
        docente: "Ambos",
        dificultad: "dificil",
        pregunta: "¿Qué IDE/editor se usa consistentemente en los módulos de AMBOS docentes?",
        opciones: ["Visual Studio 2022", "Visual Studio Code", "IntelliJ IDEA", "Android Studio"],
        correcta: 1,
        explicacion: "VS Code es el editor base transversal: Mineros lo usa en 3.0, 3.3, 3.4, 3.8; Arcides en BTVDS 3.1, Móviles, Inglés."
    },
    {
        id: "q23",
        categoria: "Transversal",
        modulo: "General",
        docente: "Ambos",
        dificultad: "media",
        pregunta: "Si un módulo requiere 'Lista de cotejo' como instrumento, ¿a qué tipo de evaluación pertenece?",
        opciones: [
            "Evaluación diagnóstica",
            "Evaluación formativa / de proceso",
            "Evaluación sumativa final",
            "Autoevaluación exclusiva"
        ],
        correcta: 1,
        explicacion: "Las listas de cotejo verifican criterios observables durante el proceso (formativa), usadas en Módulos 3.2, Móviles, etc."
    },
    {
        id: "q24",
        categoria: "Transversal",
        modulo: "General",
        docente: "Ambos",
        dificultad: "dificil",
        pregunta: "Ordena cronológicamente los módulos de Javier Mineros según la progresión lógica del año:",
        opciones: [
            "3.0 → 3.2 → 3.3 → 3.4 → 3.8",
            "3.2 → 3.0 → 3.8 → 3.3 → 3.4",
            "3.8 → 3.4 → 3.3 → 3.2 → 3.0",
            "3.3 → 3.4 → 3.0 → 3.2 → 3.8"
        ],
        correcta: 0,
        explicacion: "La progresión lógica: 3.0 (Inducción/Entorno) → 3.2 (Soporte/Hardware base) → 3.3 (BD/Datos) → 3.4 (Documentación) → 3.8 (Proyecto final integrador)."
    }
];

// Exponer en window para uso directo sin fetch (funciona en GitHub Pages y file://)
window.modulosData = modulosData;
window.quizData = quizData;