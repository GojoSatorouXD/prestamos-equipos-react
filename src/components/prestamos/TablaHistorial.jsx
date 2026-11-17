import { COLUMNAS_HISTORIAL } from '../../utils/historial'
import { estadoPrestamo } from '../../utils/prestamos'
import './TablaHistorial.css'

/**
 * Tabla del historial de préstamos.
 * Props:
 *  - prestamos: arreglo de préstamos (el más reciente primero)
 *
 * Dos map anidados: uno recorre los préstamos (filas) y otro
 * recorre COLUMNAS_HISTORIAL (celdas de cada fila).
 */
function TablaHistorial({ prestamos }) {
  return (
    // La envoltura permite desplazar la tabla hacia los lados en celular
    <div className="tabla-envoltura" tabIndex={0} role="region" aria-label="Historial de préstamos">
      <table className="tabla-historial">
        <thead>
          <tr>
            {COLUMNAS_HISTORIAL.map((columna) => (
              <th key={columna.titulo} scope="col">
                {columna.titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {prestamos.map((prestamo) => {
            const activo = estadoPrestamo(prestamo) === 'Activo'
            return (
              <tr key={prestamo.id} className={activo ? 'fila-activa' : ''}>
                {COLUMNAS_HISTORIAL.map((columna) => {
                  const texto = columna.valor(prestamo)
                  // La columna Estado se muestra como etiqueta de color
                  if (columna.titulo === 'Estado') {
                    return (
                      <td key={columna.titulo}>
                        <span className={activo ? 'estado-prestamo activo' : 'estado-prestamo devuelto'}>{texto}</span>
                      </td>
                    )
                  }
                  return <td key={columna.titulo}>{texto}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TablaHistorial
