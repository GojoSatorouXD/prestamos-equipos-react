import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'

/**
 * Estructura común de todas las vistas: Header arriba, Footer abajo
 * y en medio la página actual.
 *
 * Transición entre vistas (Framer Motion):
 *  - useOutlet() devuelve la página de la ruta actual (lo mismo que <Outlet />).
 *  - key={pathname}: al cambiar de ruta React ve un elemento NUEVO.
 *  - AnimatePresence mode="wait": primero anima la salida de la vista
 *    anterior (exit) y después la entrada de la nueva (initial -> animate).
 */
function Layout() {
  const ubicacion = useLocation()
  const vista = useOutlet()

  // Al terminar la salida, la nueva vista empieza arriba de la página
  const subirAlInicio = () => window.scrollTo({ top: 0 })

  return (
    <div className="layout">
      <Header />
      <main className="layout-principal">
        <AnimatePresence mode="wait" onExitComplete={subirAlInicio}>
          <motion.div
            key={ubicacion.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {vista}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
