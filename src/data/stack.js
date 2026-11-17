// =========================================================
// Datos de la vista Stack (arreglos de objetos).
// La vista los recorre con map para crear tarjetas y el timeline.
//
// Imágenes en public/img/stack/:
//  - Logos de tecnologías: Devicon (https://devicon.dev), licencia MIT.
//  - Íconos genéricos propios: glpi, soporte-remoto, microsoft-365,
//    context-api, localstorage, sheetjs, emailjs, claude-chat, claude-code.
// =========================================================

const IMG = '/img/stack'

// Tecnologías usadas para construir ESTE proyecto (PrestaTech)
export const stackProyecto = [
  {
    nombre: 'React',
    imagen: `${IMG}/react.svg`,
    descripcion: 'Librería para construir la interfaz con componentes, props y hooks (useState, useEffect, useContext).',
  },
  {
    nombre: 'Vite',
    imagen: `${IMG}/vitejs.svg`,
    descripcion: 'Herramienta que crea el proyecto, levanta el servidor de desarrollo y genera la versión para producción.',
  },
  {
    nombre: 'react-router-dom',
    imagen: `${IMG}/reactrouter.svg`,
    descripcion: 'Navegación entre las vistas (Inicio, Equipos, Stack, Contacto, Propuesta) sin recargar la página.',
  },
  {
    nombre: 'Context API',
    imagen: `${IMG}/context-api.svg`,
    descripcion: 'PrestamosContext comparte el inventario, los filtros, el equipo seleccionado y el tema con toda la app.',
  },
  {
    nombre: 'localStorage',
    imagen: `${IMG}/localstorage.svg`,
    descripcion: 'Guarda en el navegador los estados de los equipos y el historial de préstamos, sin backend.',
  },
  {
    nombre: 'SheetJS',
    imagen: `${IMG}/sheetjs.svg`,
    descripcion: 'Exporta el historial de préstamos a un archivo de Excel (.xlsx).',
  },
  {
    nombre: 'EmailJS',
    imagen: `${IMG}/emailjs.svg`,
    descripcion: 'Envía el formulario de contacto por correo desde el navegador, sin servidor propio.',
  },
  {
    nombre: 'CSS con variables',
    imagen: `${IMG}/css3.svg`,
    descripcion: 'Estilos propios y responsive; los colores son variables para cambiar entre tema claro y oscuro.',
  },
]

// Stack del autor, en dos grupos
export const stackAutor = [
  {
    grupo: 'Desarrollo',
    tecnologias: [
      {
        nombre: 'React',
        imagen: `${IMG}/react.svg`,
        descripcion: 'Interfaces web con componentes reutilizables. Con React está construido PrestaTech.',
      },
      {
        nombre: 'Node.js / Express',
        imagen: `${IMG}/nodejs.svg`,
        descripcion: 'Servidores y APIs con JavaScript. Lo usé en el sistema de préstamos académico con Express y EJS.',
      },
      {
        nombre: 'MongoDB',
        imagen: `${IMG}/mongodb.svg`,
        descripcion: 'Base de datos NoSQL orientada a documentos JSON.',
      },
      {
        nombre: 'SQLite',
        imagen: `${IMG}/sqlite.svg`,
        descripcion: 'Base de datos SQL ligera en un solo archivo, usada en el sistema de préstamos académico.',
      },
      {
        nombre: 'Git / GitHub',
        imagen: `${IMG}/git.svg`,
        descripcion: 'Control de versiones y repositorios remotos. Cada paso de este proyecto es un commit.',
      },
      {
        nombre: 'Linux',
        imagen: `${IMG}/linux.svg`,
        descripcion: 'Administración de servidores desde la terminal.',
      },
      {
        nombre: 'Docker',
        imagen: `${IMG}/docker.svg`,
        descripcion: 'Contenedores para empaquetar y ejecutar aplicaciones con su entorno.',
      },
    ],
  },
  {
    grupo: 'Soporte TI',
    tecnologias: [
      {
        nombre: 'GLPI',
        imagen: `${IMG}/glpi.svg`,
        descripcion: 'Gestión de tickets y casos de soporte. Lo usé en el Colegio Colombo Británico.',
      },
      {
        nombre: 'AnyDesk / TeamViewer',
        imagen: `${IMG}/soporte-remoto.svg`,
        descripcion: 'Soporte remoto: atender a los usuarios en su equipo sin desplazarse.',
      },
      {
        nombre: 'Windows',
        imagen: `${IMG}/windows11.svg`,
        descripcion: 'Nivel avanzado: instalación, configuración y solución de problemas del sistema operativo.',
      },
      {
        nombre: 'Microsoft 365',
        imagen: `${IMG}/microsoft-365.svg`,
        descripcion: 'Correo, Office y herramientas de colaboración para los usuarios de la organización.',
      },
    ],
  },
]

// Herramientas de inteligencia artificial usadas
export const herramientasIA = [
  {
    nombre: 'Claude (chat)',
    imagen: `${IMG}/claude-chat.svg`,
    descripcion: 'Planificación del proyecto, revisión de los requisitos del PDF y resolución de dudas.',
  },
  {
    nombre: 'Claude Code',
    imagen: `${IMG}/claude-code.svg`,
    descripcion: 'Programación asistida desde la terminal, commits y explicación del código.',
  },
]

// Experiencia para el timeline (orden cronológico)
export const experiencias = [
  {
    tipo: 'Experiencia laboral',
    periodo: 'Abril 2024 – Abril 2025',
    cargo: 'Auxiliar de Soporte IT',
    lugar: 'Colegio Colombo Británico (Cali)',
    descripcion:
      'Soporte a docentes, estudiantes y colaboradores; casos en GLPI; mantenimiento preventivo y correctivo; préstamo de equipos con hojas de papel.',
  },
  {
    tipo: 'Proyecto académico',
    cargo: 'Desarrollador – Sistema de préstamos de equipos TI',
    lugar: 'UNIAJC',
    descripcion: 'Aplicación web para registrar préstamos de equipos de TI.',
    tecnologias: ['Node.js', 'Express', 'EJS', 'SQLite'],
  },
  {
    tipo: 'Proyecto académico',
    cargo: 'Desarrollador – APA Interactivo (proyecto de grado)',
    lugar: 'UNIAJC',
    descripcion: 'Aplicación web para enseñar las normas APA 7.',
  },
]

// Estudios
export const estudios = [
  {
    titulo: 'Tecnología en Sistemas de Información',
    institucion: 'UNIAJC, sede Norte',
    periodo: 'Agosto 2023 – Diciembre 2026',
    enCurso: true,
  },
  {
    titulo: 'Bachiller Técnico en Mantenimiento de Hardware',
    institucion: 'I.E. Técnico Industrial Multipropósito',
    periodo: '2022',
    enCurso: false,
  },
]
