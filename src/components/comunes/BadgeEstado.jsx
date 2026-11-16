import './BadgeEstado.css'

// Objeto que relaciona cada estado con su clase CSS (y por lo tanto su color)
const CLASES_POR_ESTADO = {
  Disponible: 'badge-disponible',
  Prestado: 'badge-prestado',
  'En mantenimiento': 'badge-mantenimiento',
}

/**
 * Etiqueta de color con el estado del equipo.
 * Props:
 *  - estado: 'Disponible' | 'Prestado' | 'En mantenimiento'
 */
function BadgeEstado({ estado }) {
  const clase = CLASES_POR_ESTADO[estado] || ''
  return <span className={`badge ${clase}`}>{estado}</span>
}

export default BadgeEstado
