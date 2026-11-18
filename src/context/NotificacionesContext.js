import { createContext, useContext } from 'react'

// =========================================================
// Contexto de notificaciones (toasts).
// Cualquier componente puede mostrar un aviso flotante con:
//   const { notificar } = useNotificaciones()
//   notificar({ tipo: 'exito', titulo: 'Préstamo registrado', mensaje: '…' })
// Los avisos los dibuja <NotificacionesProvider />.
// =========================================================

export const NotificacionesContext = createContext(null)

export function useNotificaciones() {
  const contexto = useContext(NotificacionesContext)
  if (contexto === null) {
    throw new Error('useNotificaciones debe usarse dentro de <NotificacionesProvider>')
  }
  return contexto
}
