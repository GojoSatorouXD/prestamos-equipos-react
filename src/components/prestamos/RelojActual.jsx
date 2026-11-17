import { useEffect, useState } from 'react'

/**
 * Muestra la fecha y hora actuales, actualizándose cada segundo.
 * Sirve para que el técnico vea la hora que quedará registrada.
 *
 * Ciclo de vida:
 *  - al montar: se crea un intervalo (setInterval) que actualiza la hora
 *  - al desmontar: la limpieza lo detiene (clearInterval); si no, el
 *    intervalo seguiría corriendo aunque el formulario ya no exista
 */
function RelojActual() {
  const [ahora, setAhora] = useState(() => new Date())

  useEffect(() => {
    const intervalo = setInterval(() => setAhora(new Date()), 1000)
    return () => clearInterval(intervalo)
  }, [])

  const texto = ahora.toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return <time dateTime={ahora.toISOString()}>{texto}</time>
}

export default RelojActual
