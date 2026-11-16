import TarjetaEquipo from './TarjetaEquipo'
import './ListaEquipos.css'

/**
 * Cuadrícula de tarjetas.
 * Props:
 *  - equipos: arreglo con los equipos de la página actual (máximo 10)
 *
 * Si el arreglo llega vacío muestra el aviso de "sin resultados".
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
      {equipos.map((equipo) => (
        <TarjetaEquipo key={equipo.id} equipo={equipo} />
      ))}
    </div>
  )
}

export default ListaEquipos
