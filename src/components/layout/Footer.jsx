import { Link } from 'react-router-dom'
import { enlaces } from '../../data/navegacion'
import { perfil } from '../../data/perfil'
import { usePrestamos } from '../../context/PrestamosContext'
import RedesSociales from '../comunes/RedesSociales'
import './Footer.css'

/**
 * Pie de página reutilizable con información de resumen:
 * qué es el sitio, estado del inventario, enlaces a las vistas y redes.
 */
function Footer() {
  // Datos globales leídos con useContext (a través del hook usePrestamos)
  const { equipos, conteo, cargando, error } = usePrestamos()

  // Año actual calculado con un objeto Date
  const anio = new Date().getFullYear()

  // Texto del resumen del inventario según el estado de la carga
  let resumenInventario = `Inventario: ${equipos.length} equipos · ${conteo['Disponible']} disponibles · ${conteo['Prestado']} prestados`
  if (cargando) resumenInventario = 'Cargando inventario…'
  if (error) resumenInventario = 'Inventario no disponible en este momento'

  return (
    <footer className="footer">
      <div className="contenedor footer-columnas">
        <div>
          <h2 className="footer-titulo">PrestaTech</h2>
          <p>{perfil.resumen}</p>
          <p className="footer-inventario">{resumenInventario}</p>
        </div>

        <div>
          <h2 className="footer-titulo">Vistas</h2>
          <ul className="footer-lista">
            {enlaces.map((enlace) => (
              <li key={enlace.ruta}>
                <Link to={enlace.ruta}>{enlace.texto}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer-titulo">Redes</h2>
          {/* Mismo componente que en Inicio: se reutiliza con props */}
          <RedesSociales redes={perfil.redes} />
        </div>
      </div>

      <p className="footer-copy">
        © {anio} {perfil.nombre} · Proyecto final Interfaces en React · UNIAJC
      </p>
    </footer>
  )
}

export default Footer
