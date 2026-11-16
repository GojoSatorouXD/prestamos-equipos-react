import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import PrestamosProvider from './context/PrestamosProvider'
import './styles/index.css'
import App from './App.jsx'

// Punto de entrada: monta <App /> dentro del div#root de index.html.
// BrowserRouter habilita la navegación entre vistas sin recargar la página.
// PrestamosProvider comparte el estado global con todas las vistas.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PrestamosProvider>
        <App />
      </PrestamosProvider>
    </BrowserRouter>
  </StrictMode>,
)
