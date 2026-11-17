// =========================================================
// Contenido de la vista Propuesta de valor (arreglos de objetos).
// =========================================================

// Columnas de la hoja de papel que se usaba para prestar equipos
export const columnasHojaPapel = ['Serial', 'Equipo', 'Modelo', 'Fecha', 'Hora', 'Nombre de quien recibe']

// ANTES: problemas de la hoja de papel
export const antes = [
  {
    titulo: 'Sin trazabilidad',
    texto: 'Para saber quién tenía un equipo había que revisar hoja por hoja.',
  },
  {
    titulo: 'Letra ilegible',
    texto: 'Seriales y nombres mal escritos, tachones y datos incompletos.',
  },
  {
    titulo: 'Equipos sin ubicar',
    texto: 'No había forma rápida de saber qué estaba disponible, prestado o dañado.',
  },
  {
    titulo: 'Sin condición registrada',
    texto: 'No quedaba constancia de cómo se entregó ni cómo volvió cada equipo.',
  },
  {
    titulo: 'Hojas que se pierden',
    texto: 'Una hoja extraviada o mojada era un historial perdido.',
  },
]

// DESPUÉS: lo que resuelve PrestaTech
export const despues = [
  {
    titulo: 'Registro digital',
    texto: 'Fecha y hora automáticas y colaborador elegido de una lista: sin errores de escritura.',
  },
  {
    titulo: 'Estados claros',
    texto: 'Cada equipo muestra si está Disponible, Prestado o En mantenimiento.',
  },
  {
    titulo: 'Historial completo',
    texto: 'Quién recibió el equipo, cuándo lo devolvió y cuánto tiempo lo tuvo.',
  },
  {
    titulo: 'Condición de entrega y devolución',
    texto: 'Si el equipo vuelve con novedades, pasa directo a mantenimiento.',
  },
  {
    titulo: 'Exportación a Excel',
    texto: 'El historial se descarga en .xlsx para informes y auditorías.',
  },
]

// Beneficios para la empresa
export const beneficios = [
  {
    icono: '📋',
    titulo: 'Control del inventario',
    texto: 'Todo el inventario de TI en un solo lugar, con búsqueda y filtros.',
  },
  {
    icono: '👤',
    titulo: 'Responsabilidad',
    texto: 'Siempre se sabe quién tiene cada equipo y desde cuándo.',
  },
  {
    icono: '🔧',
    titulo: 'Daños detectados a tiempo',
    texto: 'Los equipos que vuelven con novedades quedan marcados para revisión.',
  },
  {
    icono: '⏱️',
    titulo: 'Ahorro de tiempo',
    texto: 'Registrar un préstamo toma segundos y no hay que transcribir hojas.',
  },
  {
    icono: '📊',
    titulo: 'Reportes listos',
    texto: 'El historial en Excel sirve para informes de activos y auditorías.',
  },
  {
    icono: '💻',
    titulo: 'Fácil de adoptar',
    texto: 'Funciona en el navegador, en computador o celular, sin instalar nada.',
  },
]

// Lo que aporta Juan: dos perfiles que se complementan
export const aporte = [
  {
    perfil: 'Soporte TI',
    puntos: [
      'Conozco el proceso real: presté equipos con hojas de papel en el Colegio Colombo Británico.',
      'Mantenimiento preventivo y correctivo de equipos (bachiller técnico en hardware).',
      'Gestión de casos y soporte a usuarios con GLPI y herramientas remotas.',
    ],
  },
  {
    perfil: 'Desarrollo',
    puntos: [
      'Construyo la solución a la medida del proceso de la empresa, con React.',
      'Experiencia con Node.js, Express y bases de datos para la siguiente etapa.',
      'Evolución planeada: inicio de sesión y backend para varios técnicos a la vez.',
    ],
  },
]
