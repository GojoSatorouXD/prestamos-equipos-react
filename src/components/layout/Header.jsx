import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import BotonTema from './BotonTema'
import { enlaces } from '../../data/navegacion'
import './Header.css'

/**
 * Encabezado fijo en la parte superior de todas las vistas.
 * Muestra el nombre del sitio, el Navbar y el botón de tema.
 */
function Header() {
  return (
    <header className="header">
      <div className="contenedor header-contenido">
        <Link to="/" className="header-logo">
          <span aria-hidden="true">💻</span>
          <span>
            Presta<strong>Tech</strong>
          </span>
        </Link>
        <div className="header-acciones">
          <Navbar enlaces={enlaces} />
          <BotonTema />
        </div>
      </div>
    </header>
  )
}

export default Header
