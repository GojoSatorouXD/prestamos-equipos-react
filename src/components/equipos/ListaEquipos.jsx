import { motion } from 'framer-motion'
import TarjetaEquipo from './TarjetaEquipo'
import './ListaEquipos.css'

/**
 * Cuadrícula de tarjetas.
 * Props:
 *  - equipos: arreglo con los equipos de la página actual (máximo 10)
 *
 * Si el arreglo llega vacío muestra el aviso de "sin resultados".
 *
 * Cada tarjeta entra con una animación escalonada (Framer Motion): la
 * tarjeta número i espera i × 0.04 s. Al cambiar de página o de filtros
 * llegan tarjetas con otro key, así que la animación se repite.
 */
function ListaEquipos({ equipos }) {
  if (equipos.length === 0) {
    return (
      <div className="lista-vacia" role="status">
        <p className="lista-vacia-titulo">No hay equipos que coincidan con los filtros.</p>
        <p>Prueba con otra categoría o estado, o usa "Limpiar filtros".</p>
      </div>
    )
  }

  return (
    <div className="lista-equipos">
      {/* map convierte cada objeto del arreglo en una tarjeta.
          key ayuda a React a identificar cada elemento de la lista. */}
      {equipos.map((equipo, indice) => (
        <motion.div
          key={equipo.id}
          className="lista-equipos-item"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: indice * 0.04, ease: 'easeOut' }}
        >
          <TarjetaEquipo equipo={equipo} />
        </motion.div>
      ))}
    </div>
  )
}

export default ListaEquipos
