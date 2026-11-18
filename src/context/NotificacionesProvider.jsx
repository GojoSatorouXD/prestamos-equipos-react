import { useCallback, useMemo, useState } from 'react'
import { NotificacionesContext } from './NotificacionesContext'
import Notificaciones from '../components/comunes/Notificaciones'

// Máximo de avisos en pantalla a la vez (los más viejos se van)
const MAXIMO_VISIBLES = 4

/**
 * Proveedor de notificaciones (toasts).
 * Guarda en un arreglo los avisos visibles y entrega la función notificar().
 */
function NotificacionesProvider({ children }) {
  const [avisos, setAvisos] = useState([])

  /**
   * Agrega un aviso.
   * @param {{ tipo?: 'exito'|'aviso'|'error', titulo: string, mensaje?: string }} datos
   */
  const notificar = useCallback(({ tipo = 'exito', titulo, mensaje = '' }) => {
    // Identificador único: hora actual + número aleatorio
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`
    setAvisos((anteriores) => [...anteriores, { id, tipo, titulo, mensaje }].slice(-MAXIMO_VISIBLES))
  }, [])

  // Quita un aviso por su id (botón ✕ o cuando se acaba su tiempo)
  const cerrar = useCallback((id) => {
    setAvisos((anteriores) => anteriores.filter((aviso) => aviso.id !== id))
  }, [])

  // useMemo: el objeto del contexto no cambia entre renders, así los
  // componentes que solo usan notificar() no se vuelven a dibujar
  const valor = useMemo(() => ({ notificar }), [notificar])

  return (
    <NotificacionesContext.Provider value={valor}>
      {children}
      <Notificaciones avisos={avisos} onCerrar={cerrar} />
    </NotificacionesContext.Provider>
  )
}

export default NotificacionesProvider
