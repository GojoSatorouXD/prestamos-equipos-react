import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

/**
 * Barra de navegación hacia las 5 vistas.
 * Props:
 *  - enlaces: arreglo de objetos { ruta, texto }
 *
 * En móvil el menú se oculta y se abre con un botón (☰).
 * El estado "abierto" se maneja con useState.
 */
function Navbar({ enlaces }) {
  const [abierto, setAbierto] = useState(false)

  // Evento onClick del botón: invierte el valor de "abierto"
  const alternarMenu = () => setAbierto(!abierto)

  // Al elegir una opción en móvil, cerramos el menú
  const cerrarMenu = () => setAbierto(false)

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <button
        type="button"
        className="navbar-boton"
        onClick={alternarMenu}
        aria-expanded={abierto}
        aria-controls="navbar-lista"
      >
        {abierto ? '✕' : '☰'}
        <span className="solo-lector">Menú</span>
      </button>

      <ul id="navbar-lista" className={abierto ? 'navbar-lista abierta' : 'navbar-lista'}>
        {/* Recorremos el arreglo con map para crear un <li> por enlace */}
        {enlaces.map((enlace) => (
          <li key={enlace.ruta}>
            {/* NavLink agrega la clase "active" a la vista actual.
                "end" evita que "/" quede activo en todas las rutas. */}
            <NavLink to={enlace.ruta} end={enlace.ruta === '/'} onClick={cerrarMenu}>
              {enlace.texto}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
