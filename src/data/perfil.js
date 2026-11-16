// Datos del perfil del autor (objeto con arreglos dentro).
// La vista de Inicio y el Footer leen de aquí.
export const perfil = {
  nombre: 'Juan David Paz Trochez',
  rol: 'Técnico de soporte TI y desarrollador',

  // Descripción del perfil (vista Inicio)
  descripcion:
    'Bachiller técnico en mantenimiento de hardware con 1 año de experiencia en soporte TI. ' +
    'Estudiante de Tecnología en Sistemas de Información en la UNIAJC. ' +
    'Desarrollo PrestaTech para llevar el préstamo de equipos de TI del papel a lo digital.',

  // Resumen corto del sitio (Footer)
  resumen:
    'Registro digital de préstamos de equipos de TI para los colaboradores de la empresa: reemplaza la hoja de papel por un inventario con estados e historial.',

  // Foto: si /img/perfil.jpg no existe, se muestra el placeholder
  foto: '/img/perfil.jpg',
  fotoPlaceholder: '/img/perfil-placeholder.svg',

  // Biografía en orden cronológico (arreglo de objetos)
  biografia: [
    {
      periodo: '2022',
      titulo: 'Bachiller Técnico en Mantenimiento de Hardware',
      lugar: 'I.E. Técnico Industrial Multipropósito (Cali)',
    },
    {
      periodo: 'Abril 2024 – Abril 2025',
      titulo: 'Auxiliar de Soporte IT',
      lugar: 'Colegio Colombo Británico',
      descripcion:
        'Soporte a docentes y colaboradores, gestión de casos en GLPI, mantenimiento de equipos y préstamo de equipos con hojas de papel.',
      destacado: 'Origen de este proyecto',
    },
    {
      periodo: '2023 – 2026',
      titulo: 'Tecnología en Sistemas de Información',
      lugar: 'UNIAJC (último semestre)',
      descripcion: 'Desarrollo web en React y Node.js.',
    },
  ],

  // Redes sociales: "icono" indica qué dibujo SVG usar
  redes: [
    {
      nombre: 'GitHub',
      texto: 'GojoSatorouXD',
      url: 'https://github.com/GojoSatorouXD',
      icono: 'github',
    },
    {
      nombre: 'Correo',
      texto: 'david4c4d@gmail.com',
      url: 'mailto:david4c4d@gmail.com',
      icono: 'correo',
    },
  ],
}
