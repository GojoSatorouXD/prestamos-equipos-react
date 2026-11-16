import ItemTimeline from './ItemTimeline'
import './Timeline.css'

/**
 * Línea de tiempo de experiencias.
 * Props:
 *  - experiencias: arreglo de objetos (ver src/data/stack.js)
 *
 * Recorre el arreglo con map y crea un ItemTimeline por cada objeto.
 * Con el operador spread {...experiencia} se pasan todas las propiedades
 * del objeto como props (cargo, lugar, periodo, etc.).
 */
function Timeline({ experiencias }) {
  return (
    <ol className="timeline">
      {experiencias.map((experiencia) => (
        <ItemTimeline key={experiencia.cargo} {...experiencia} />
      ))}
    </ol>
  )
}

export default Timeline
