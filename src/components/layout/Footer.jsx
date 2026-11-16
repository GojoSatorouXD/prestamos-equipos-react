import { Link } from 'react-router-dom'
import { enlaces } from '../../data/navegacion'
import { perfil } from '../../data/perfil'
import './Footer.css'

/**
 * Pie de página reutilizable con información de resumen:
 * qué es el sitio, enlaces a las vistas y redes sociales.
 * (En el paso 2 se agrega el resumen de equipos por estado.)
 */
function Footer() {
  // Año actual calculado con un objeto Date
  const anio = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="contenedor footer-columnas">
        <div>
          <h2 className="footer-titulo">PrestaTech</h2>
          <p>{perfil.resumen}</p>
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
          <ul className="footer-lista">
            {perfil.redes.map((red) => (
              <li key={red.nombre}>
                <a href={red.url} target="_blank" rel="noreferrer">
                  {red.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="footer-copy">
        © {anio} {perfil.nombre} · Proyecto final Interfaces en React · UNIAJC
      </p>
    </footer>
  )
}

export default Footer
