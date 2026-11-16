import { createContext, useContext } from 'react'

// =========================================================
// Contexto global de la aplicación.
// Aquí solo se crea el contexto y el hook para leerlo.
// Los datos y las funciones los entrega <PrestamosProvider />
// (archivo PrestamosProvider.jsx).
// =========================================================

export const PrestamosContext = createContext(null)

/**
 * Hook propio para usar el contexto desde cualquier componente:
 *   const { equipos, cargando } = usePrestamos()
 *
 * Si se usa fuera del Provider lanza un error claro,
 * en vez de fallar más adelante con "undefined".
 */
export function usePrestamos() {
  const contexto = useContext(PrestamosContext)
  if (contexto === null) {
    throw new Error('usePrestamos debe usarse dentro de <PrestamosProvider>')
  }
  return contexto
}
