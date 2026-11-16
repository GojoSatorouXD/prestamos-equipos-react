import BadgeEstado from '../comunes/BadgeEstado'
import { usePrestamos } from '../../context/PrestamosContext'
import './TarjetaEquipo.css'

/**
 * Tarjeta de un equipo con los 5 atributos obligatorios:
 * imagen, nombre, categoría, marca y estado.
 * Props:
 *  - equipo: objeto con los datos del equipo
 *
 * El botón "Ver detalle" guarda el equipo en el contexto
 * (equipoSeleccionado); el sidebar lo leerá desde ahí.
 */
function TarjetaEquipo({ equipo }) {
  const { seleccionarEquipo } = usePrestamos()

  // Evento onClick: selecciona este equipo
  const manejarVerDetalle = () => seleccionarEquipo(equipo)

  return (
    <article className="tarjeta-equipo">
      <img
        className="tarjeta-equipo-imagen"
        src={equipo.imagen}
        alt={equipo.nombre}
        width="400"
        height="260"
        loading="lazy"
      />

      <div className="tarjeta-equipo-cuerpo">
        <BadgeEstado estado={equipo.estado} />
        <h2 className="tarjeta-equipo-nombre">{equipo.nombre}</h2>

        <dl className="tarjeta-equipo-datos">
          <div>
            <dt>Categoría</dt>
            <dd>{equipo.categoria}</dd>
          </div>
          <div>
            <dt>Marca</dt>
            <dd>{equipo.marca}</dd>
          </div>
        </dl>

        <button type="button" className="boton boton-secundario" onClick={manejarVerDetalle}>
          Ver detalle
        </button>
      </div>
    </article>
  )
}

export default TarjetaEquipo
