import NumeroAnimado from '../animaciones/NumeroAnimado'
import { palabraSegunCantidad } from '../../utils/texto'
import './ContadorEstados.css'

/**
 * Resumen del inventario total por estado, con contadores animados.
 * Props:
 *  - conteo: objeto { Disponible, Prestado, 'En mantenimiento' }
 *  - total: cantidad total de equipos del inventario
 */
function ContadorEstados({ conteo, total }) {
  // Arreglo de objetos para dibujar las 3 tarjetas con un map
  const items = [
    {
      clave: 'disponible',
      texto: palabraSegunCantidad(conteo['Disponible'], 'Disponible', 'Disponibles'),
      valor: conteo['Disponible'],
    },
    {
      clave: 'prestado',
      texto: palabraSegunCantidad(conteo['Prestado'], 'Prestado', 'Prestados'),
      valor: conteo['Prestado'],
    },
    { clave: 'mantenimiento', texto: 'En mantenimiento', valor: conteo['En mantenimiento'] },
  ]

  return (
    <section className="contador" aria-label="Resumen del inventario">
      <p className="contador-total">
        Inventario total: <strong>{total}</strong> equipos
      </p>
      <ul className="contador-lista">
        {items.map((item) => (
          <li key={item.clave} className={`contador-tarjeta contador-${item.clave}`}>
            <span className="contador-numero">
              <NumeroAnimado valor={item.valor} />
            </span>
            <span className="contador-texto">
              <span className="contador-punto" aria-hidden="true"></span>
              {item.texto}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ContadorEstados
