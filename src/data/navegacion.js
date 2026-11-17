// Arreglo de objetos con los enlaces del navbar.
// Cada objeto tiene la ruta (para react-router) y el texto visible.
// Se usa en el Navbar y en el Footer para no repetir la información.
export const enlaces = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/equipos', texto: 'Equipos' },
  { ruta: '/prestamos', texto: 'Préstamos' }, // vista extra (historial)
  { ruta: '/stack', texto: 'Stack' },
  { ruta: '/contacto', texto: 'Contacto' },
  { ruta: '/propuesta', texto: 'Propuesta' },
]
