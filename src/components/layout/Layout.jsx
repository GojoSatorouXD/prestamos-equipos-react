import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

/**
 * Estructura común de todas las vistas: Header arriba, Footer abajo
 * y en medio <Outlet />, donde react-router dibuja la página actual.
 */
function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout-principal">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
