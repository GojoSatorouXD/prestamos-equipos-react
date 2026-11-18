import NumeroAnimado from '../animaciones/NumeroAnimado'
import { palabraSegunCantidad } from '../../utils/texto'
import './ContadorEstados.css'

/**
 * Resumen del inventario total por estado, con contadores animados.
 * Cada tarjeta es un BOTÓN que filtra la lista por ese estado.
 *
 * Props:
 *  - conteo: objeto { Disponible, Prestado, 'En mantenimiento' }
 *  - total: cantidad total de equipos del inventario
 *  - estadoActivo: estado por el que se está filtrando ('' = ninguno)
 *  - onSeleccionarEstado: función que recibe el estado de la tarjeta pulsada
 */
function ContadorEstados({ conteo, total, estadoActivo, onSeleccionarEstado }) {
  // Arreglo de objetos para dibujar las 3 tarjetas con un map
  const items = [
    {
      estado: 'Disponible',
      clave: 'disponible',
      texto: palabraSegunCantidad(conteo['Disponible'], 'Disponible', 'Disponibles'),
    },
    {
      estado: 'Prestado',
      clave: 'prestado',
      texto: palabraSegunCantidad(conteo['Prestado'], 'Prestado', 'Prestados'),
    },
    { estado: 'En mantenimiento', clave: 'mantenimiento', texto: 'En mantenimiento' },
  ]

  return (
    <section className="contador" aria-label="Resumen del inventario">
      <p className="contador-total">
        Inventario total: <strong>{total}</strong> equipos
        <span className="contador-ayuda"> · Toca un estado para filtrar</span>
      </p>
      <ul className="contador-lista">
        {items.map((item) => {
          const activo = estadoActivo === item.estado
          return (
            <li key={item.clave}>
              {/* aria-pressed: el lector de pantalla anuncia si el filtro está activo.
                  Un segundo clic en la tarjeta activa quita el filtro. */}
              <button
                type="button"
                className={`contador-tarjeta contador-${item.clave}${activo ? ' activo' : ''}`}
                aria-pressed={activo}
                title={activo ? 'Quitar el filtro de estado' : `Mostrar solo: ${item.estado}`}
                onClick={() => onSeleccionarEstado(item.estado)}
              >
                <span className="contador-numero">
                  <NumeroAnimado valor={conteo[item.estado]} />
                </span>
                <span className="contador-texto">
                  <span className="contador-punto" aria-hidden="true"></span>
                  {item.texto}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ContadorEstados
