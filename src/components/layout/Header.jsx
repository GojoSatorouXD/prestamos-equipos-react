import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { enlaces } from '../../data/navegacion'
import './Header.css'

/**
 * Encabezado fijo en la parte superior de todas las vistas.
 * Muestra el nombre del sitio y el Navbar.
 * (En el paso 10 se agrega aquí el botón de tema claro/oscuro.)
 */
function Header() {
  return (
    <header className="header">
      <div className="contenedor header-contenido">
        <Link to="/" className="header-logo">
          <span aria-hidden="true">💻</span> PrestaTech
        </Link>
        <Navbar enlaces={enlaces} />
      </div>
    </header>
  )
}

export default Header
