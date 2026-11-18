import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import PrestamosProvider from './context/PrestamosProvider'
import NotificacionesProvider from './context/NotificacionesProvider'
import './styles/index.css'
import App from './App.jsx'

// Punto de entrada: monta <App /> dentro del div#root de index.html.
// BrowserRouter habilita la navegación entre vistas sin recargar la página.
// NotificacionesProvider muestra los avisos (toasts) en cualquier vista.
// PrestamosProvider comparte el estado global con todas las vistas.
// MotionConfig reducedMotion="user": si el sistema pide menos movimiento,
// Framer Motion quita los desplazamientos de las animaciones.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <NotificacionesProvider>
          <PrestamosProvider>
            <App />
          </PrestamosProvider>
        </NotificacionesProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
)
