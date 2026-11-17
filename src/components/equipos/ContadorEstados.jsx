import { palabraSegunCantidad } from '../../utils/texto'
import './ContadorEstados.css'

/**
 * Resumen del inventario total por estado.
 * Props:
 *  - conteo: objeto { Disponible, Prestado, 'En mantenimiento' }
 *  - total: cantidad total de equipos del inventario
 */
function ContadorEstados({ conteo, total }) {
  // Arreglo de objetos para dibujar las 3 cajitas con un map
  const items = [
    {
      texto: palabraSegunCantidad(conteo['Disponible'], 'disponible', 'disponibles'),
      valor: conteo['Disponible'],
      clase: 'contador-disponible',
    },
    {
      texto: palabraSegunCantidad(conteo['Prestado'], 'prestado', 'prestados'),
      valor: conteo['Prestado'],
      clase: 'contador-prestado',
    },
    { texto: 'en mantenimiento', valor: conteo['En mantenimiento'], clase: 'contador-mantenimiento' },
  ]

  return (
    <div className="contador" aria-label="Resumen del inventario">
      <p className="contador-total">
        Inventario total: <strong>{total}</strong> equipos
      </p>
      <ul className="contador-lista">
        {items.map((item) => (
          <li key={item.texto} className={`contador-item ${item.clase}`}>
            <strong>{item.valor}</strong> {item.texto}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ContadorEstados
