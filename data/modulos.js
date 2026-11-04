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
            { nombre: "Portal institucional INDEL", url: "https://www.google.com" }
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
        titulo: "Modulo 2 Desarrollo de componentes para dispositivos móviles",
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
        titulo: "Modulo 3 Conversación de inglés sobre mantenimiento de sistemas informáticos",
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
        titulo: "Modulo 4 Puesta en marcha de la empresa en asociatividad cooperativa",
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
            { nombre: "Guías de emprendimiento asociativo", url: "https://www.google.com" }
        ],
        evidencia: "Documento de propuesta de empresa cooperativa de software"
    }
];

// --- BANCO DE PREGUNTAS PARA EL QUIZ ---
const quizData = [
    {
        pregunta: "¿Qué lenguaje y framework se utilizan principalmente en el Módulo 3.8 para desarrollo de apps?",
        opciones: ["Python y Django", "C# y .NET MAUI / Web", "Java y Spring Boot", "PHP y Laravel"],
        correcta: 1,
        explicacion: "En el Módulo 3.8 se trabaja la construcción de aplicaciones utilizando C# con .NET MAUI e interfaces Web."
    },
    {
        pregunta: "¿Cuál es el enfoque principal del Módulo 3.3 impartido por el profesor Javier Mineros?",
        opciones: ["Diseño Gráfico", "Administración de Bases de Datos Relacionales", "Ensamblaje de PC", "Marketing Digital"],
        correcta: 1,
        explicacion: "El Módulo 3.3 se centra en la administración, diseño, seguridad y normalización de bases de datos relacionales."
    },
    {
        pregunta: "En el Módulo 3 de Inglés Técnico (Prof. Francisco Arcides), ¿cuál es el tema principal?",
        opciones: ["Inglés para turismo", "Conversación de inglés sobre mantenimiento de sistemas informáticos", "Literatura clásica", "Gramática avanzada"],
        correcta: 1,
        explicacion: "El Módulo 3 aborda la comunicación técnica bilingüe enfocada en el mantenimiento y soporte de sistemas."
    },
    {
        pregunta: "¿Qué tipo de modelo de negocio se trabaja en el Módulo 4 de Francisco Arcides?",
        opciones: ["Sociedad Anónima", "Empresa en asociatividad cooperativa", "Franquicia internacional", "Monopolio"],
        correcta: 1,
        explicacion: "El Módulo 4 capacita en la puesta en marcha de empresas bajo el esquema de asociatividad cooperativa."
    },
    {
        pregunta: "¿Qué lenguaje estándar se utiliza para consultas en bases de datos relacionales (Módulo 3.3)?",
        opciones: ["HTML", "SQL", "CSS", "Python"],
        correcta: 1,
        explicacion: "SQL (Structured Query Language) es el lenguaje estándar para consultar y manipular bases de datos."
    }
];