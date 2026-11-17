import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Inicio from './pages/Inicio'
import Equipos from './pages/Equipos'
import Stack from './pages/Stack'
import Contacto from './pages/Contacto'
import Propuesta from './pages/Propuesta'
import Prestamos from './pages/Prestamos'
import NoEncontrado from './pages/NoEncontrado'

/**
 * Componente raíz: define las rutas de las 5 vistas obligatorias + Préstamos.
 * Todas van dentro de <Layout />, así comparten Header y Footer.
 */
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/equipos" element={<Equipos />} />
        <Route path="/stack" element={<Stack />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/propuesta" element={<Propuesta />} />
        {/* Vista extra: historial de préstamos */}
        <Route path="/prestamos" element={<Prestamos />} />
        {/* Cualquier otra ruta muestra la página 404 */}
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  )
}

export default App
